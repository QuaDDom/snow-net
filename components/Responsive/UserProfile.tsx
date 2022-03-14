import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { IoLanguage, IoSettingsOutline } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import styles from './UserProfile.module.scss';

export default function UserProfile() {
  return (
    <div className={styles.userProfileContainer}>
        <div className={styles.userInfo}>
            <div className={styles.info}>
                <img src="" alt="" />
                <h3></h3>
                <p></p>
            </div>
            <div className={styles.followers}>
                <p></p>
                <p></p>
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
