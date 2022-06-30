import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';
import { usePosts } from '../../hooks/usePosts';
import { AuthProvider } from '../../context/AuthContext';
import UserProfileComponent from '../../components/UserProfile/UserProfileComponent';
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';

export default function UserProfile() {
    const [userData, setUserData] = useState<any>(null);
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

    userData && userData;
    return (
        <>
            <Layout title={`@${username} - Snow`}>
                <AuthProvider>
                    <UserProfileComponent userData={userData} username={username} />
                </AuthProvider>
            </Layout>
        </>
    );
}
