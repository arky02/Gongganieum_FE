import type { AppProps } from 'next/app';
import Layout from 'components/commons/Layout';
import Provider from 'components/commons/Provider';
import 'styles/globals.css';
import 'public/fonts/pretendard/font.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
