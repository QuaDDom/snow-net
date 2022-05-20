import React from 'react'
import styles from './EditProfileModal.module.scss';

export default function EditProfileModal() {
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <h4 className={styles.title}>Edit User Profile</h4>
            <div className="info">
                <div className="profilePhotos">
                    <div className="banner"></div>
                    <div className="pfp"></div>
                </div>
                <div className="text">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.save}>Save</button>
                <button className={styles.cancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
