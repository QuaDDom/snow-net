import React from 'react';
import Layout from '../components/Layout';
import Suggestions from '../components/Suggestions';
import styles from '../styles/explore.module.scss';
import ExploreContainer from '../components/ExploreContainer';
import TrendingBar from '../components/Explore/TrendingBar';

export default function explore() {
  return (
      <Layout title="Explore - Snow">
        <div className={styles.content}>
          <TrendingBar/>
          <ExploreContainer/>
          <Suggestions/>
        </div>
      </Layout>
  );
}
