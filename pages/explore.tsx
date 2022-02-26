import React from 'react';
import Layout from '../components/Layout';
import Trending from '../components/Trending';
import Suggestions from '../components/Suggestions';
import styles from '../styles/explore.module.scss';
import ExploreContainer from '../components/ExploreContainer';

export default function explore() {
  return (
      <Layout title="Explore - Snow">
        <div className={styles.content}>
          <Trending/>
          <ExploreContainer/>
          <Suggestions/>
        </div>
      </Layout>
  );
}
