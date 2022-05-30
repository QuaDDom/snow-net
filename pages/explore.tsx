import React from 'react';
import Layout from '../components/Layout';
import Suggestions from '../components/Suggestions';
import styles from '../styles/explore.module.scss';
import ExploreContainer from '../components/ExploreContainer';
import TrendingBar from '../components/Explore/TrendingBar';
import { useMediaQuery } from 'react-responsive';

export default function Explore() {

  const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

  return (
      <Layout title="Explore - Snow">
        <div className={styles.content}>
          { isResponsive && <TrendingBar/>}
          <ExploreContainer/>
          {isResponsive && <Suggestions/>}
          { !isResponsive && <TrendingBar/>}
        </div>
      </Layout>
  );
}
