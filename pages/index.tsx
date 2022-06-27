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
            <Head>
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
            </Head>
            <Layout title="Snow">
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
            </Layout>
        </>
    );
};

export default Home;
