import { useEffect, useRef } from 'react';

type UtterancesConfigKey = 'issue-term' | 'theme' | 'label';

export interface UtterancesProps {
  repo: string;
  config?: { [k in UtterancesConfigKey]?: string };
}

function createScript({ repo, config = {} }: UtterancesProps) {
  const scriptEl = document.createElement('script');
  scriptEl.async = true;
  Object.entries({
    src: 'https://utteranc.es/client.js',
    repo,
    crossorigin: 'anonymous',
    ...config,
  }).forEach(([key, value]) => {
    scriptEl.setAttribute(key, value);
  });
  return scriptEl;
}

export default function Utterances({ repo, config }: UtterancesProps) {
  const wrapperRef = useRef<HTMLDivElement>();
  const loadCounter = useRef<number>(0);

  useEffect(() => {
    const currentWrapper = wrapperRef.current;

    const scriptEl = createScript({ repo, config });
    loadCounter.current += 1;
    scriptEl.onload = () => {
      loadCounter.current -= 1;
      if (loadCounter.current > 0) {
        return;
      }
      // remove earlier loaded instances
      while (currentWrapper.children.length > 1) {
        currentWrapper.removeChild(currentWrapper.firstChild);
      }
    };
    currentWrapper.appendChild(scriptEl);
  }, [repo, config]);

  return <div className="utterances-wrapper" ref={wrapperRef}></div>;
}
