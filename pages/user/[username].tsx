import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';
import { AuthProvider } from '../../context/AuthContext';
import UserProfileComponent from '../../components/UserProfile/UserProfileComponent';

interface Props {
    user: any;
    posts: any;
}

export default function UserProfile({ user, posts }: Props) {
    const [userData, setUserData] = useState<any>({ user, posts });
    const router = useRouter();
    const username = router.query.username;

    return (
        <Layout title={`@${username} - Snow`}>
            <AuthProvider>
                <UserProfileComponent userData={userData} username={username} />
            </AuthProvider>
        </Layout>
    );
}

export async function getServerSideProps(context: any) {
    const posts = await axios.get(
        `https://snow-net.herokuapp.com/api/posts/profile/${context.query.username}`
    );
    const user = await axios.get(
        `https://snow-net.herokuapp.com/api/users/profile/${context.query.username}`
    );
    return {
        props: { posts, user }
    };
}
