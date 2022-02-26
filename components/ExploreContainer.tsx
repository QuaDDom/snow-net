import styles from '../styles/explore.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react'

export default function ExploreContainer() {
  return (
    <div className={styles.exploreContainer}>
        <div className={styles.searchInput}>
            <div className={styles.inputContainer}>
                <span><AiOutlineSearch/></span>
                <input type="text" placeholder='Search'/>
            </div>
        </div>
    </div>
  )
}
