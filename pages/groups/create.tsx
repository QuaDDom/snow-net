import React from 'react';
import CreateGroup from '../../components/Groups/CreateGroup';
import Layout from '../../components/Layout';
import { AuthProvider } from '../../context/AuthContext';
import styles from '../../styles/creategroup.module.scss';

export default function Create() {
    return (
        <Layout title="Create Group - Snow">
            <AuthProvider>
                <CreateGroup />
            </AuthProvider>
        </Layout>
    );
}
