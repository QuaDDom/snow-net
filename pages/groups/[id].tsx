import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GroupComponent from '../../components/Groups/GroupComponent';
import Layout from '../../components/Layout';
import { AuthProvider } from '../../context/AuthContext';

export default function Group() {
    const router = useRouter();
    const id = router.query.id;
    const [group, setGroup] = useState<any>(null);

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const res = await axios.get(`https://snow-net.herokuapp.com/api/groups/${id}`);
                setGroup(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGroupData();
    }, [id]);

    return (
        <>
            {group && (
                <Layout title={group.title + ' - Snow'}>
                    <Head>
                        <meta charSet="utf-8" className="next-head" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="author" content="Mateo Leal" />
                        <meta name="description" content="Find new groups in Snow!" />
                        <meta name="og:title" content={`Visit ${group.title} group - Snow`} />
                        <meta name="og:url" content={'https://snowcy.com/user/' + group.title} />
                        <meta name="og:site_name" content="Snow" />
                        <meta name="og:description" content="Find new groups in Snow!" />
                        <meta
                            name="keywords"
                            content="Social, Network, Snow, Social Network, User Profile"
                        />
                        <meta property="og:image" content={group && group.groupPic} />
                        <meta property="og:image:width" content="500" />
                        <meta property="og:image:height" content="500" />
                    </Head>
                    <AuthProvider>
                        <GroupComponent group={group} />
                    </AuthProvider>
                </Layout>
            )}
        </>
    );
}
