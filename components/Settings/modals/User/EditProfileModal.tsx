import React, { useState } from 'react'
import styles from './EditProfileModal.module.scss';

interface Props{
    userData: any,
    setEditProfile: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function EditProfileModal({ userData, setEditProfile }: Props) {
    const [name, setName] = useState(userData?.user.name);
    const [lastname, setLastname] = useState(userData?.user.lastname);
    const [username, setUsername] = useState('@'+userData?.user.username)
    const [bio, setBio] = useState(userData?.user.bio)

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h4 className={styles.title}>Edit User Profile</h4>
                <div className={styles.info}>
                    <div className={styles.profilePhotos}>
                        <div className={styles.banner}>
                            <img src={userData?.user.coverPic || 'noCover.jpg'} alt={userData.user.username} />
                        </div>
                        <div className={styles.pfp}>
                            <img src={userData?.user.profilePic} alt={userData.user.username} />
                        </div>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.inputs}>
                            <input type="text" value={name}/>
                            <input type="text" value={lastname}/>
                            <input type="text" value={username}/>
                        </div>
                        <textarea name="" id="" value={bio} placeholder="Bio"></textarea>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={()=> setEditProfile(false)}>Cancel</button>
                    <button className={styles.save}>Save</button>
                </div>
            </div>
        </div>
    )
}
