import prettify from '@emotion/css-prettifier';
import { serializeStyles } from '@emotion/serialize';
import SiteLayout from '@self/components/SiteLayout';
import Link from 'next/link';
import { useState, useRef } from 'react';
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
  iteratorConsumer(iterator, (value) => {
    if (value.type === 1 && value.code === ';'.charCodeAt(0)) {
      return false;
    }
    if (value.type === 1 && value.code === '}'.charCodeAt(0)) {
      if (stack.length > 1) {
        stack.pop();
      } else {
        throw new Error("Too many closing brace '}' found.");
      }
      return false;
    }
    accumulatedValue = `${accumulatedValue}${value.lead ? value.lead : ''}${value.data}${value.tail ? value.tail : ''}`;
    return true;
  });
  return accumulatedValue.trim();
}

function retrievePropertyFromIterator(firstToken, iterator, stack) {
  let scopedProperty = false;
  if (firstToken.data === '&' || firstToken.data === ':') {
    scopedProperty = true;
  }
  let accumulatedProperty = firstToken.data;
  iteratorConsumer(iterator, (token) => {
    if (!scopedProperty && token.type === 1 && token.code === 58) {
      // reached ':'
      return false;
    }
    if (token.type === 1 && token.code === 123) {
      // reached '{'
      scopedProperty = true;
      return false;
    }
    if (token.type === 3) {
      // whitespace
      return true;
    }
    accumulatedProperty = `${accumulatedProperty}${token.data}`;
    return true;
  });

  if (scopedProperty) {
    const newScope = {};
    stack[stack.length - 1][accumulatedProperty] = newScope;
    stack.push(newScope);
  } else {
    accumulatedProperty = isCustomProperty(accumulatedProperty)
      ? accumulatedProperty
      : replacePropertyName(accumulatedProperty);
    stack[stack.length - 1][accumulatedProperty] = retrieveValueFromIterator(iterator, stack);
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

function handleOpeningBraceEffect(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (!['{', '(', '['].includes(e.key)) {
    return;
  }
  e.preventDefault();
  const start = e.currentTarget.selectionStart;
  const end = e.currentTarget.selectionEnd;
  const braceMatches = { '{': '}', '(': ')', '[': ']' };
  const { value } = e.currentTarget;

  e.currentTarget.value =
    value.substring(0, start) + e.key + value.substring(start, end) + braceMatches[e.key] + value.substring(end);

  // put caret at right position again
  e.currentTarget.selectionStart = start + 1;
  e.currentTarget.selectionEnd = end + 1;
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
  e.currentTarget.value = newLines.join('\n');
  e.currentTarget.selectionStart = start + firstIndent;
  e.currentTarget.selectionEnd = end + indentCount;
}

function handleEnterAutoIndent(e: React.KeyboardEvent<HTMLTextAreaElement>, indentStr: string) {
  if (e.key !== 'Enter') {
    return;
  }
  const start = e.currentTarget.selectionStart;
  const end = e.currentTarget.selectionEnd;
  const { value } = e.currentTarget;
  if (value.substring(start - 1, start) !== '{') {
    return;
  }
  e.preventDefault();
  const isSelectBeforeClosingBrace = value.substring(end, end + 1) === '}';

  e.currentTarget.value =
    value.substring(0, start) + `\n${indentStr}` + (isSelectBeforeClosingBrace ? '\n' : '') + value.substring(end);
  e.currentTarget.selectionStart = start + 1 + indentStr.length;
  e.currentTarget.selectionEnd = start + 1 + indentStr.length;
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

  const handleObjectToString = () => {
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
  };

  const handleStringToObject = () => {
    try {
      const objectOutput = parseCss(stringStylesRef.current.value);
      objectStylesRef.current.value = objectOutput;
    } catch (e) {
      setInfo(String(e));
      return;
    }
    setInfo('');
  };

  return (
    <div className="pb-4">
      <p>This tool translates between CSS-in-JS string styles and object styles. More for convenience than accuracy.</p>
      <div className="flex flex-wrap items-center space-x-4">
        <div className="flex-1">
          <h2 className="mb-2">String Styles</h2>
          <textarea
            ref={stringStylesRef}
            className="w-full h-[calc(60vh)] min-h-[400px] font-mono rounded-lg p-2 resize-none"
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
            className="w-full h-[calc(60vh)] min-h-[400px] font-mono rounded-lg p-2 resize-none"
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
          <Link href="https://github.com/csstools/tokenizer" target="_blank">
            @csstools/tokenizer
          </Link>
        </span>
        ,{' '}
        <span className="font-mono text-sm p-1">
          <Link href="https://github.com/emotion-js/emotion" target="_blank">
            emotion
          </Link>
        </span>
        ,{' '}
        <span className="font-mono text-sm p-1">
          <Link href="https://prettier.io/" target="_blank">
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
