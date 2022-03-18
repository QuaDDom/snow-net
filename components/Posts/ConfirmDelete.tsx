import React from 'react'
import styles from './ConfirmDelete.module.scss';

interface Props{
    deletePost: () => Promise<void>,
    setModalOpen: any
}

export default function ConfirmDelete({deletePost, setModalOpen}: Props) {
  return (
    <div className={styles.content}>
        <div className={styles.confirmDeleteContainer}>
            <div className={styles.modal}>
                <h4>Delete Post?</h4>
                <p>The post will be deleted, and this cannot be undone, are you sure you want to delete this post?</p>
                <div className={styles.buttons}>
                    <button className={styles.delete} onClick={deletePost}>Delete</button>
                    <button className={styles.cancel} onClick={()=> setModalOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}
