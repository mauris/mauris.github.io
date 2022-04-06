import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '@self/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
