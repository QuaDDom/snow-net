import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';
import { usePosts } from '../../hooks/usePosts';
import { AuthProvider } from '../../context/AuthContext';
import UserProfileComponent from '../../components/UserProfile/UserProfileComponent';
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';

interface Props {
    user: any;
    posts: any;
}

export default function UserProfile({ user, posts }: Props) {
    const [userData, setUserData] = useState<any>({ user, posts });
    const router = useRouter();
    const username = router.query.username;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const posts = await axios.get(
                    `https://snow-net.herokuapp.com/api/posts/profile/${username}`
                );
                const user = await axios.get(
                    `https://snow-net.herokuapp.com/api/users/profile/${username}`
                );
                setUserData({ user: user.data, posts: posts.data });
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserData();
    }, [username]);

    return (
        <>
            <Head>
                <meta name="og:title" content={`Visit @${username} - Snow`} />
                <meta name="og:url" content={'https://snowcy.com/user/' + username} />
                <meta name="og:site_name" content="Snow" />
                <meta name="og:description" content="Meet new people in Snow!" />
                <meta
                    name="keywords"
                    content="Social, Network, Snow, Social Network, User Profile"
                />
                <meta property="og:image" content={user.profilePic} />
                <meta property="og:image:width" content="500" />
                <meta property="og:image:height" content="500" />
            </Head>
            <Layout title={`@${username} - Snow`}>
                <AuthProvider>
                    <UserProfileComponent userData={userData} username={username} />
                </AuthProvider>
            </Layout>
        </>
    );
}

async function getServerSideProps(context: any) {
    const posts = await axios.get(
        `https://snow-net.herokuapp.com/api/posts/profile/${context.query.username}`
    );

    const user = await axios.get(
        `https://snow-net.herokuapp.com/api/users/profile/${context.query.username}`
    );

    return {
        props: { user: user.data, posts: posts.data }
    };
}
