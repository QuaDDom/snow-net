import React, { useState } from 'react'
import styles from './EditProfileModal.module.scss';
import Image from 'next/image';

interface Props{
    userData: any,
    setEditProfile: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function EditProfileModal({ userData, setEditProfile }: Props) {
    const [name, setName] = useState(userData?.user.name);
    const [lastname, setLastname] = useState(userData?.user.lastname);
    const [username, setUsername] = useState('@'+userData?.user.username)
    const [bio, setBio] = useState(userData?.user.bio)

    const handleChange = (input: string, e: React.ChangeEvent<HTMLInputElement>)=>{
        switch(input){
            case 'name':
                setName(e.target.value)
                break;
            case 'lastname':
                setLastname(e.target.value)
                break;
            case 'username':
                setUsername(e.target.value)
                break;
        }
    }

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
                            <input type="text" value={name} onChange={(e:any)=> handleChange('name', e)}/>
                            <input type="text" value={lastname} onChange={(e:any)=> handleChange('lastname', e)}/>
                            <input type="text" value={username} onChange={(e:any)=> handleChange('username', e)}/>
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
