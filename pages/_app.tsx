import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Layout from 'components/commons/Layout';
import Provider from 'components/commons/Provider';
import 'styles/globals.css';
import 'public/fonts/pretendard/font.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
        <Toaster
          containerStyle={{ fontSize: '16px', fontWeight: '600' }}
          toastOptions={{
            style: {
              padding: '10px 13px',
              color: '#242424',
              borderRadius: '999px',
            },
          }}
        />
      </Layout>
    </Provider>
  );
}
