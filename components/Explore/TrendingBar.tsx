import React from 'react'
import styles from './TrendingBar.module.scss';
import TrendingHash from './TrendingHash';

export default function TrendingBar() {
  return (
    <div className={styles.trendingBarContainer}>
        <div className={styles.trendingNow}>
            <h4>Trending</h4>
            <TrendingHash hashName="Splitgate" topic="Gaming" totalPosts='300'/> 
            <TrendingHash hashName="TheFatRat" topic="Music" totalPosts='1200'/> 
            <TrendingHash hashName="MrPaolinsky" topic="Stream" totalPosts='150'/> 
            <TrendingHash hashName="Money" topic="Economy" totalPosts='150'/> 
            <TrendingHash hashName="Horner" topic="Sports" totalPosts='250'/> 
            <TrendingHash hashName="NewFerrari" topic="Sports" totalPosts='471'/> 
            <TrendingHash hashName="Leonardo" topic="Sports" totalPosts='820'/> 
            <TrendingHash hashName="ZeldaBOTW2" topic="Gaming" totalPosts='137'/> 
        </div>
    </div>
  )
}
