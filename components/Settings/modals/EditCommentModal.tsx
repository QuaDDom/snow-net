import React from 'react'
import styles from './Modals.module.scss'

export default function DeleteCommentModal() {
  return (
    <div className={styles.modalContainer}>
    {/* <div className={"closeOverlay"} onClick={()=> setIsOpen(false)}/> */}
    <div className={`${styles.modal} ${styles.cover}`}>
        <h4 className={styles.title}>Delete Comment?</h4>
        <p>The comment will be deleted, and this cannot be undone, are you sure you want to delete this comment?</p>
        <div className={styles.buttons}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.delete}>Delete</button>
        </div>
    </div>
</div>
  )
}
