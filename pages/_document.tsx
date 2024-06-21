import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='kr'>
      <Head />
      <body>
        <Main />
        <div id='modal-root' />
        <NextScript />
      </body>
    </Html>
  );
}
