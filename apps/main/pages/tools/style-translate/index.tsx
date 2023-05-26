import prettify from '@emotion/css-prettifier';
import { serializeStyles } from '@emotion/serialize';
import SiteLayout from '@self/components/SiteLayout';
import Link from 'next/link';
import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
const { tokenize } = require('@csstools/tokenizer');
const prettier = require('prettier');
const plugins = [require('prettier/parser-babel')];

function convertObjectStringToCssString(objStr: string) {
  let value = {};
  try {
    value = eval(`const css = (v) => v; (${objStr})`);
  } catch (e) {
    throw e;
  }
  const serialized = serializeStyles([value]);
  return prettify(serialized.styles);
}

const isCustomProperty = (property: string) => property.charCodeAt(1) === 45;
const replacePropertyName = (property: string) =>
  property.replaceAll(/\-([a-z])/g, (test: string, firstGroup: string) => {
    return firstGroup.toUpperCase();
  });

function iteratorConsumer(iterator: Generator<any, void, unknown>, func) {
  let value, done;
  while (({ value, done } = iterator.next()) && !done) {
    const result = func(value);
    if (!result) {
      break;
    }
  }
}

function retrieveValueFromIterator(iterator, stack) {
  let accumulatedValue = '';
  let endMarker = ';';
  iteratorConsumer(iterator, (token) => {
    if (token.type === 1 && token.code === ';'.charCodeAt(0)) {
      return false;
    }
    if (token.type === 1 && token.code === '{'.charCodeAt(0)) {
      endMarker = '{';
      return false;
    }
    if (token.type === 1 && token.code === '}'.charCodeAt(0)) {
      endMarker = '}';
      return false;
    }
    accumulatedValue = `${accumulatedValue}${token.lead}${token.data}${token.tail}`;
    return true;
  });
  return {
    value: accumulatedValue.trim(),
    endMarker,
  };
}

function retrievePropertyFromIterator(firstToken, iterator, stack) {
  let scopedProperty = false;
  if (firstToken.data === '&' || firstToken.data === ':') {
    scopedProperty = true;
  }
  let accumulatedProperty = `${firstToken.lead}${firstToken.data}${firstToken.tail}`;

  iteratorConsumer(iterator, (token) => {
    if (!scopedProperty && token.type === 1 && token.code === ':'.charCodeAt(0)) {
      // reached ':'
      const { value: potentialValue, endMarker } = retrieveValueFromIterator(iterator, stack);
      if (endMarker === '{') {
        accumulatedProperty = `${accumulatedProperty}:${potentialValue}`;
        scopedProperty = true;
      } else {
        accumulatedProperty = isCustomProperty(accumulatedProperty)
          ? accumulatedProperty
          : replacePropertyName(accumulatedProperty);
        stack[stack.length - 1][accumulatedProperty] = potentialValue;
        if (endMarker === '}') {
          if (stack.length > 1) {
            stack.pop();
          } else {
            throw new Error("Too many closing brace '}' found.");
          }
        }
      }
      return false;
    }
    if (token.type === 1 && token.code === '{'.charCodeAt(0)) {
      // reached '{'
      scopedProperty = true;
      return false;
    }
    if (token.type === 1 && token.code === ';'.charCodeAt(0)) {
      return false;
    }
    if (token.type === 3) {
      // whitespace
      accumulatedProperty = `${accumulatedProperty}${token.data}`;
      return true;
    }
    accumulatedProperty = `${accumulatedProperty}${token.lead}${token.data}${token.tail}`;
    return true;
  });

  if (scopedProperty) {
    const newScope = {};
    stack[stack.length - 1][accumulatedProperty] = newScope;
    stack.push(newScope);
  }
  return accumulatedProperty;
}

function* cssTokenize(cssStr: string) {
  for (const token of tokenize(cssStr)) {
    yield token;
  }
}

function parseCss(cssStr: string) {
  const resultObject = {};
  const stack = [resultObject];
  const cssIterator = cssTokenize(cssStr);
  for (const token of cssIterator) {
    if (token.type === 3 || token.type === 2) {
      continue;
    }
    if (token.type === 1 && token.code === 125) {
      if (stack.length > 1) {
        stack.pop();
      } else {
        throw new Error("Too many closing brace '}' found.");
      }
    } else {
      retrievePropertyFromIterator(token, cssIterator, stack);
    }
  }
  if (stack.length > 1) {
    throw new Error('One or more scopes left unclosed.');
  }
  return prettier
    .format(`css(${JSON.stringify(resultObject)})`, { parser: 'babel', plugins })
    .trim()
    .slice(4, -2); // remove 'css(...);' wrapping
}

function triggerChangeEvent(target: HTMLTextAreaElement, newValue: string, start: number, end: number) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
  nativeInputValueSetter.call(target, newValue);
  const event = new Event('input', { bubbles: true });
  target.dispatchEvent(event);
  target.selectionStart = start;
  target.selectionEnd = end;
}

function handleOpeningBraceEffect(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (!['{', '(', '['].includes(e.key)) {
    return;
  }
  e.preventDefault();
  const start = e.currentTarget.selectionStart;
  const end = e.currentTarget.selectionEnd;
  const braceMatches = { '{': '}', '(': ')', '[': ']' };
  const { value } = e.currentTarget;

  triggerChangeEvent(
    e.currentTarget,
    value.substring(0, start) + e.key + value.substring(start, end) + braceMatches[e.key] + value.substring(end),
    start + 1,
    end + 1,
  );
}

function handleTabEffect(e: React.KeyboardEvent<HTMLTextAreaElement>, indentStr: string) {
  if (e.key !== 'Tab') {
    return;
  }
  e.preventDefault();
  const start = e.currentTarget.selectionStart;
  const end = e.currentTarget.selectionEnd;
  const { value } = e.currentTarget;

  const numBefore = (value.substring(0, start).match(/\n/g) || []).length;
  const numAfter = (value.substring(end).match(/\n/g) || []).length;

  const lines = value.split(/\n/g);
  let indentCount = 0;
  let firstIndent = 0;
  const newLines = [
    ...lines.slice(0, numBefore),
    ...lines.slice(numBefore, lines.length - numAfter).map((line, idx) => {
      if (e.shiftKey) {
        if (line.startsWith(indentStr)) {
          if (idx === 0) {
            firstIndent -= indentStr.length;
          }
          indentCount -= indentStr.length;
          return line.substring(indentStr.length);
        }
        return line;
      }
      if (idx === 0) {
        firstIndent += indentStr.length;
      }
      indentCount += indentStr.length;
      return `${indentStr}${line}`;
    }),
    ...lines.slice(lines.length - numAfter),
  ];

  triggerChangeEvent(e.currentTarget, newLines.join('\n'), start + firstIndent, end + indentCount);
}

function handleEnterAutoIndent(e: React.KeyboardEvent<HTMLTextAreaElement>, indentStr: string) {
  if (e.key !== 'Enter') {
    return;
  }
  e.preventDefault();
  const start = e.currentTarget.selectionStart;
  const end = e.currentTarget.selectionEnd;
  const { value } = e.currentTarget;

  const addIndent = value.substring(start - 1, start) === '{';
  const positionOfStartLine = value.substring(0, start).lastIndexOf('\n');
  const startLineIndent = (value.substring(positionOfStartLine + 1, start).match(/^\s+/) || [''])[0];
  const isSelectBeforeClosingBrace = value.substring(end, end + 1) === '}';

  const newValue =
    value.substring(0, start) +
    `\n${startLineIndent}${addIndent ? indentStr : ''}` +
    (isSelectBeforeClosingBrace ? `\n${startLineIndent}` : '') +
    value.substring(end);
  const cursorPos = start + 1 + (addIndent ? indentStr.length : 0) + startLineIndent.length;
  triggerChangeEvent(e.currentTarget, newValue, cursorPos, cursorPos);
}

const handleSpecialKeys = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const indentStr = '  ';
  handleTabEffect(e, indentStr);
  handleOpeningBraceEffect(e);
  handleEnterAutoIndent(e, indentStr);
};

function EmotionStylesConverter() {
  const stringStylesRef = useRef<HTMLTextAreaElement>();
  const objectStylesRef = useRef<HTMLTextAreaElement>();
  const [info, setInfo] = useState<string>('');

  const [handleObjectToString] = useState(() =>
    debounce(() => {
      try {
        const strOutput = convertObjectStringToCssString(objectStylesRef.current.value);
        if (strOutput !== undefined) {
          stringStylesRef.current.value = strOutput;
        }
      } catch (e) {
        setInfo(String(e));
        return;
      }
      setInfo('');
    }, 500),
  );

  const [handleStringToObject] = useState(() =>
    debounce(() => {
      try {
        const objectOutput = parseCss(stringStylesRef.current.value);
        objectStylesRef.current.value = objectOutput;
      } catch (e) {
        setInfo(String(e));
        return;
      }
      setInfo('');
    }, 500),
  );

  const textAreaClasses = [
    'w-full h-[calc(60vh)] min-h-[400px]',
    'font-mono rounded-lg p-2 resize-none',
    'bg-slate-50 focus:bg-white dark:bg-neutral-800 dark:focus:bg-neutral-900',
    'focus:placeholder:text-gray-300 dark:focus:placeholder:text-gray-600',
    'outline outline-1 outline-gray-300 dark:outline-gray-600 focus-visible:outline-2 focus-visible:-outline-offset-1',
  ].join(' ');

  return (
    <div className="pb-4">
      <p>This tool translates between CSS-in-JS string styles and object styles. More for convenience than accuracy.</p>
      <div className="flex flex-wrap items-center space-x-4">
        <div className="flex-1">
          <h2 className="mb-2">String Styles</h2>
          <textarea
            ref={stringStylesRef}
            className={textAreaClasses}
            onChange={handleStringToObject}
            onKeyDown={handleSpecialKeys}
            spellCheck={false}
            placeholder={'color: #aa0000;\noutline-width: 1px;\n:hover {\n  color: #ff0000;\n}'}
          />
        </div>
        <div className="flex-1">
          <h2 className="mb-2">Object Styles</h2>
          <textarea
            ref={objectStylesRef}
            className={textAreaClasses}
            onChange={handleObjectToString}
            onKeyDown={handleSpecialKeys}
            spellCheck={false}
            placeholder={"{\n  color: '#aa0000',\n  outlineWidth: '1px',\n  ':hover': {\n    color: '#ff0000'\n  }\n}"}
          />
        </div>
      </div>
      <div>{info ? <pre className="border-solid border-0 border-l-4 p-2 pl-8 rounded-sm">{info}</pre> : null}</div>
      <div className="px-2 pt-4">
        Made possible thanks to{' '}
        <span className="font-mono text-sm p-1">
          <Link href="https://github.com/csstools/tokenizer" target="_blank" passHref>
            @csstools/tokenizer
          </Link>
        </span>
        ,{' '}
        <span className="font-mono text-sm p-1">
          <Link href="https://github.com/emotion-js/emotion" target="_blank" passHref>
            emotion
          </Link>
        </span>
        ,{' '}
        <span className="font-mono text-sm p-1">
          <Link href="https://prettier.io/" target="_blank" passHref>
            prettier
          </Link>
        </span>
        .
      </div>
    </div>
  );
}

interface StyleTranslateProps {}

export default function StyleTranslate({}: StyleTranslateProps) {
  return (
    <SiteLayout>
      <EmotionStylesConverter />
    </SiteLayout>
  );
}
