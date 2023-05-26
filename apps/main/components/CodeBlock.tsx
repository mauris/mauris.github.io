import { PropsWithChildren } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from './CodeBlock.module.scss';

export default function CodeBlock(originalProps: PropsWithChildren<JSX.IntrinsicElements['code']>) {
  const { className, children, style, ref, ...props } = originalProps;
  const match = className ? /language-(\w+)/.exec(className) : null;
  return match ? (
    <div className={styles.codeBlock}>
      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
