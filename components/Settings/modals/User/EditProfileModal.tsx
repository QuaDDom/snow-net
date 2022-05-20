import React, { useState } from 'react'
import styles from './EditProfileModal.module.scss';

interface Props{
    userData: any
}

export default function EditProfileModal({ userData }: Props) {
    const [name, setName] = useState('');
    const [lastaname, setLastname] = useState('');

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h4 className={styles.title}>Edit User Profile</h4>
                <div className={styles.info}>
                    <div className={styles.profilePhotos}>
                        <div className={styles.banner}>
                            <img src={userData?.user.coverPic} alt={userData.user.username} />
                        </div>
                        <div className={styles.pfp}>
                            <img src={userData?.user.profilePic} alt={userData.user.username} />
                        </div>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.inputs}>
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                        <textarea name="" id=""></textarea>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancel}>Cancel</button>
                    <button className={styles.save}>Save</button>
                </div>
            </div>
        </div>
    )
}
