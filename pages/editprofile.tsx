import React from 'react';
import Layout from '../components/Layout';
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
