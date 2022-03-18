import type { NextPage } from 'next'
import Head from 'next/head';
import FriendList from '../components/FriendList';
import Layout from '../components/Layout'
import PostList from '../components/Posts/PostList';
import Suggestions from '../components/Suggestions';
import { AuthProvider } from '../context/AuthContext';
import styles from '../styles/home.module.scss';
import { useMediaQuery } from 'react-responsive';

const Home: NextPage = () => {
  const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
  return (
    <>
    <Layout title="Snow">
      <div className={styles.homeContainer}>
        <AuthProvider>
          {isResponsive && <FriendList/>}
          <PostList/>
          {isResponsive && <Suggestions/>}
        </AuthProvider>
      </div>
    </Layout>
    </>
  )
}

export default Home
