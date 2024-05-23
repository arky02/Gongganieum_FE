import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='kr'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          strategy='beforeInteractive'
          type='text/javascript'
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_CLIENT_ID}&submodules=geocoder&callback=initMap`}
        ></Script>
      </body>
    </Html>
  );
}
