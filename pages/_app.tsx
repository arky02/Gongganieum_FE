import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import Layout from 'components/commons/Layout';
import Provider from 'components/commons/Provider';
import 'styles/globals.css';
import 'styles/styles.css';
import 'public/fonts/pretendard/font.css';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id='google_analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', { 
                    page_path: window.location.pathname,
                  });
              `,
        }}
      />
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
    </>
  );
}
