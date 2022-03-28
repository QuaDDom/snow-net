import React from 'react'
import PendingList from '../../components/RequestPanel/PendingList'
import Sidebar from '../../components/RequestPanel/Sidebar'
import styles from '../../styles/group_requests.module.scss';

export default function RequestPanel() {
  return (
    <div className={styles.requestPanel}>
        <Sidebar/>
        <PendingList/>
    </div>
  )
}
