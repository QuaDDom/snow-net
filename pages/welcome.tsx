import React from 'react';
import styles from '../styles/welcome.module.scss';
import Router from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';
import SnowFAQ from '../components/Welcome/SnowFAQ';

export default function Welcome() {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const handlePush = (route: string) => Router.push(route);

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
                <title>Snow - Welcome</title>
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
            <div className={styles.welcomeContainer}>
                <div className={styles.containerAll}>
                    <div className={styles.leftSide}>
                        <img src="/wavesbg.svg" alt="" className={styles.bg} />
                        {isResponsive && (
                            <div className={styles.snow}>
                                <img src="/snow-logo.svg" />
                                <h1>SNOW</h1>
                            </div>
                        )}
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.snowLogo}>
                            <SnowFAQ />
                        </div>
                        <h2>
                            Welcome to Snow! <br /> A new social network
                        </h2>
                        <h3>Join Snow</h3>
                        <div className={styles.buttons}>
                            <button
                                className={styles.register}
                                onClick={() => handlePush('/register')}>
                                Register
                            </button>
                            <p>Do you already have an account?</p>
                            <button className={styles.login} onClick={() => handlePush('/login')}>
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
