import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function _document() {
  return (
      <Html>
          <Head>
              <meta charSet="utf-8" className="next-head"/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
          </Head>
          <body>
              <Main/>
              <NextScript/>
          </body>
          
      </Html>
  );
}
