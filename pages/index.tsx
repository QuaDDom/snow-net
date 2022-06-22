import type { NextPage } from 'next'
import Head from 'next/head';
import FriendList from '../components/Friends/FriendList';
import Layout from '../components/Layout'
import PostList from '../components/Posts/PostList';
import Suggestions from '../components/Suggestions/Suggestions';
import { AuthProvider } from '../context/AuthContext';
import styles from '../styles/home.module.scss';
import { useMediaQuery } from 'react-responsive';
import OptionsBar from '../components/Options/OptionsBar';
import SlideFriends from '../components/Responsive/SlideFriends';
import ResposiveToPost from '../components/Responsive/Posts/ResposiveToPost';

const Home = () => {
  const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
  return (
    <>
    <Layout title="Snow">
      <div className={styles.homeContainer}>
        <AuthProvider>
          {isResponsive &&
          <div className={styles.bar}>
            <FriendList/>
            <OptionsBar/>
          </div> 
          }
          <PostList/>
          {isResponsive && <Suggestions/>}
          {!isResponsive && <ResposiveToPost/>}
        </AuthProvider>
      </div>
    </Layout>
    </>
  )
}

export default Home
