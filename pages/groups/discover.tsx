import React, { useState } from 'react';
import SearchGroups from '../../components/Groups/SearchGroups';
import { PopularGroups, FriendsGroups } from '../../components/Groups/SlideGroups';
import Layout from '../../components/Layout';
import { AuthProvider } from '../../context/AuthContext';
import styles from '../../styles/groupdiscover.module.scss';

export default function DiscoverGroups() {
    return (
        <Layout title="Discover Groups - Snow">
            <div className={styles.discoverContainer}>
                <AuthProvider>
                    <SearchGroups />
                    <PopularGroups />
                    <FriendsGroups />
                </AuthProvider>
            </div>
        </Layout>
    );
}
