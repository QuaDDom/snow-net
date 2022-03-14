import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { IoLanguage, IoSettingsOutline } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import styles from './UserProfile.module.scss';

interface Props{
    loggedUser: any
}

export default function UserProfile({loggedUser}: Props) {
  return (
    <div className={styles.userProfileContainer}>
        <div className={styles.userInfo}>
            <div className={styles.info}>
                <img src={loggedUser.profilePic} alt={loggedUser.username} />
                <h4>{loggedUser.name} {loggedUser.lastname}</h4>
                <p>@{loggedUser.username}</p>
            </div>
            <div className={styles.followers}>
                <p>{loggedUser.friendReqs.length} Followers</p>
                <p>{loggedUser.friendReqsSend.length} Followings</p>
            </div>
        </div>
        <div className={styles.options}>
            <button><span><CgProfile/></span> Profile</button>
            <button><span><IoLanguage/></span> Language</button>
            <button><span><IoSettingsOutline/></span> Settings</button>
            <button><span><MdDarkMode/></span> Theme</button>
            <button><span><RiLogoutBoxLine/></span> Log out</button>
        </div>
    </div>
  )
}
