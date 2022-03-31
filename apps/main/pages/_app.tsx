import { AppProps } from 'next/app';
import '@self/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
