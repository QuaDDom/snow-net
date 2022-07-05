import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function _document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" className="next-head" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Mateo Leal" />
                <meta name="title" content="Snow Network" />
                <meta httpEquiv="content-language" content="en-us" />
                <meta
                    name="description"
                    content="Snow is a new modern social network! Sign in to connect with your friends and find groups and more."
                />
                <meta name="og:title" content="Snow" />
                <meta name="og:url" content="https://snowcy.com" />
                <meta name="og:site_name" content="Snow" />
                <meta
                    name="og:description"
                    content="Snow is a new modern social network! Sign in to connect with your friends and find groups and more."
                />
                <meta name="keywords" content="Social, Network, Snow, Social Network" />
                <meta property="og:image" content="https://i.imgur.com/RjNqmPi.png" />
                <meta property="og:image:width" content="500" />
                <meta property="og:image:height" content="500" />
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
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
