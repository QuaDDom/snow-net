import type { NextPage } from 'next';
import Head from 'next/head';
import FriendList from '../components/Friends/FriendList';
import Layout from '../components/Layout';
import PostList from '../components/Posts/PostList';
import Suggestions from '../components/Suggestions/Suggestions';
import { AuthProvider } from '../context/AuthContext';
import styles from '../styles/home.module.scss';
import { useMediaQuery } from 'react-responsive';
import OptionsBar from '../components/Options/OptionsBar';
import SlideFriends from '../components/Responsive/SlideFriends';
import ResposiveToPost from '../components/Responsive/Posts/ResposiveToPost';

const Home = () => {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    return (
        <>
            <Layout title="Snow">
                <>
                    <Head>
                        <meta charSet="utf-8" className="next-head" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="author" content="Mateo Leal" />
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
                    <div className={styles.homeContainer}>
                        <AuthProvider>
                            {isResponsive && (
                                <div className={styles.bar}>
                                    <FriendList />
                                    <OptionsBar />
                                </div>
                            )}
                            <PostList />
                            {isResponsive && <Suggestions />}
                            {!isResponsive && <ResposiveToPost />}
                        </AuthProvider>
                    </div>
                </>
            </Layout>
        </>
    );
};

export default Home;
