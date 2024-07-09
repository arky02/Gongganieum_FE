import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='kr'>
      <Head />
      <body>
        <Main />
        <div id='modal-root' />
        <div id='image-preview-root' />
        <NextScript />
      </body>
    </Html>
  );
}
