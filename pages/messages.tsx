import React, { useState } from 'react';
import ChatInfo from '../components/ChatInfo';
import Layout from '../components/Layout';
import MessageList from '../components/Chats/MessageList';
import styles from '../styles/messages.module.scss';
import { AuthProvider } from '../context/AuthContext';
import MessagesComponent from '../components/Chats/MessagesComponent';


export default function messages() {
  
  return (
    <Layout title="Messages - Snow">
      <AuthProvider>
        <MessagesComponent/>
      </AuthProvider>
    </Layout>
  );
}
