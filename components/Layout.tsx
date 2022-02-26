import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import styles from './Layout.module.scss';
import Head from 'next/head';
import Nav from './Nav';

interface Props{
  title?: string,
  children: React.ReactNode
}

export default function Layout({title, children}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.layout}>
        <AuthProvider>
          <Nav/>
          {children}
        </AuthProvider>
      </div>
    </>
  );
}
