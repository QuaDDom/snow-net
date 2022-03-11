import React from 'react'
import styles from './TrendingHash.module.scss';
import { FiHash } from 'react-icons/fi';

interface Props{
    hashName: string,
    topic: string, 
    totalPosts: string
}

export default function TrendingHash({hashName, topic, totalPosts}: Props) {
  return (
    <div className={styles.trendingHashContainer}>
        <div className={styles.hash}>
            <FiHash/>
        </div>
        <div className={styles.info}>
            <p>Trending in {topic}</p>
            <h5>{hashName}</h5>
            <p>{totalPosts} Posts</p>
        </div>
    </div>
  )
}
