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
import NewUpdateFeatureList from '../components/Updates/NewUpdateFeatureList';
import NewUpdateModal from '../components/Updates/NewUpdateModal';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const Home = () => {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const [newUpdateModal, setNewUpdateModal] = useState<any>('closed');

    useEffect(() => {
        const token = localStorage.getItem('updateModal');
        const isOpen = token && JSON.parse(token);

        if (isOpen === 'open') {
            setNewUpdateModal('open');
        } else {
            setNewUpdateModal('closed');
        }
    }, []);

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
                <meta name="og:url" content="https://snowcy.com/user/" />
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
            <Layout title="Snow">
                {newUpdateModal === 'open' && (
                    <NewUpdateModal
                        features={[
                            {
                                title: 'Realtime',
                                description:
                                    'Now the likes and reposts are totally realtime and it is possible to visualize their change instantly'
                            },
                            {
                                title: 'Online Status',
                                description:
                                    'Now you can see if a user is online! A green circle will appear indicating the status'
                            },
                            {
                                title: 'Verified Users',
                                description:
                                    'Verified badges added! Now you can find public figures easily'
                            },
                            {
                                title: 'Bug fixes',
                                description:
                                    'Emoji picker scrollbar, performance, UI/UX general errors'
                            }
                        ]}
                        setOpen={setNewUpdateModal}
                    />
                )}
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
