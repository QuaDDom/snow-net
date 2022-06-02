import Link from 'next/link'
import React from 'react'
import styles from '../../styles/verified_pending.module.scss'
import Image from 'next/image';


export default function Pending() {
  return (
    <div className={styles.pendingContainer}>
    <div className={styles.bg}/>
    <div className={styles.content}>
      <div className={styles.pendingImg}>
        <img src="pending.svg"/>
      </div>
      <p>We have sent you a verification by mail! Click the link to finish the registration</p>
      <button><Link href="https://mail.google.com/mail/u/0/#inbox">Go to Gmail</Link></button>
    </div>
  </div>
  )
}
