import React from 'react'
import { MdOutlineSort } from 'react-icons/md';
import { TiThSmall } from 'react-icons/ti';
import styles from './PendingList.module.scss';
import PendingRequest from './PendingRequest';

export default function PendingList() {
  return (
    <div className={styles.pendingListContainer}>
        <div className={styles.select}>
            <div className={styles.optionSelect}>
                <div className={styles.icon}>
                    <MdOutlineSort/>
                </div>
                <div className={styles.selectText}>
                    <h4>Posts</h4>
                    <p>{20} Posts</p>
                </div>
            </div>
            <div className={styles.optionSelect}>
                <div className={styles.icon}>
                    <TiThSmall/>
                </div>
                <div className={styles.selectText}>
                    <h4>All</h4>
                    <p>{36} Posts</p>
                </div>
            </div>
        </div>
        <div className={styles.pendingPosts}>
            <PendingRequest/>
        </div>
    </div>
  )
}
