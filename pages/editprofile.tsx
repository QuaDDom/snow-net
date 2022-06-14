import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/profile.module.scss';
import { profileData } from '../db/profile_data';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { AuthProvider } from '../context/AuthContext';
import EditProfile from '../components/UserProfile/EditProfile';

export default function profile() {
    return (
        <Layout title="Edit Profile - Snow">
            <AuthProvider>
                <EditProfile />
            </AuthProvider>
        </Layout>
    );
}
