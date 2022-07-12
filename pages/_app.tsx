import '../styles/globals.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import type { AppProps } from 'next/app';
import Loader from '../components/Loader';
import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RouteLoader from '../components/RouteLoader';
import Progress from '../components/Progress/Progress';
import { useRouteLoading } from '../hooks/useRouteLoading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
        }
    }
}

function MyApp({ Component, pageProps }: AppProps) {
    const [isLoading, setIsLoading] = useState(true);
    const setIsAnimating = useRouteLoading((s) => s.setIsAnimating);
    const isAnimating = useRouteLoading((s) => s.isAnimating);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    }, []);

    const router = useRouter();

    useEffect(() => {
        const handleStart = () => {
            setIsAnimating(true);
        };
        const handleStop = () => {
            setIsAnimating(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
        };
    }, [router]);

    return (
        <>
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
            <Loader isLoading={isLoading} />
            <Progress isAnimating={isAnimating} />
            {isLoading || <Component {...pageProps} />}
        </>
    );
}

export default MyApp;
