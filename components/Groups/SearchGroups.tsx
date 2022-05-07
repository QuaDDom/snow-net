import React from 'react';
import { BiSearch } from 'react-icons/bi';
import styles from './SearchGroups.module.scss';

export default function SearchGroups() {
  return (
    <div className={styles.searchGroups}>
        <div className={styles.containerSearch}>
            <div className={styles.inputContainer}>
                <span className={styles.icon}><BiSearch/></span>
                <p>Search Groups...</p>
            </div>
        </div>
        <div className={styles.create}>
            <button>Create</button>
        </div>
    </div>
  )
}
