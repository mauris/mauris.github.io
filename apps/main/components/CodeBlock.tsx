import { PropsWithChildren } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './CodeBlock.module.scss';

export default function CodeBlock(originalProps: PropsWithChildren<JSX.IntrinsicElements['code']>) {
  console.log(originalProps);
  const { className, children, ...props } = originalProps;
  const match = /language-(\w+)/.exec(className || '');
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
