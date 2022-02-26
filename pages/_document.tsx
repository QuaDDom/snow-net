import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function _document() {
  return (
      <Html>
          <Head>
              <meta charSet="utf-8" className="next-head"/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </Head>
          <body>
              <Main/>
              <NextScript/>
          </body>
      </Html>
  );
}
