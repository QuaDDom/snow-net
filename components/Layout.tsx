import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import styles from './Layout.module.scss';
import Head from 'next/head';
import Nav from './Nav';
import ResponsiveNav from './Responsive/ResponsiveNav';
import {useMediaQuery} from 'react-responsive';
import TopBar from './Responsive/TopBar';

interface Props{
  title?: string,
  children: React.ReactNode
}

export default function Layout({title, children}: Props) {
  const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.layout}>
        <AuthProvider>
          {!isResponsive && <TopBar/>}
          {isResponsive && <Nav/>}
          {children}
          {!isResponsive && <ResponsiveNav/>}
        </AuthProvider>
      </div>
    </>
  );
}
