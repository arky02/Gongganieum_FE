import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='kr'>
      <Head>
        <link id='favicon' rel='icon' href='/icons/xs-logo.svg' />
        <script
          defer
          src='https://developers.kakao.com/sdk/js/kakao.min.js'
        ></script>
      </Head>
      <body>
        <Main />
        <div id='modal-root' />
        <div id='image-preview-root' />
        <NextScript />
      </body>
    </Html>
  );
}
