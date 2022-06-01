
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoLanguage, IoSettingsOutline } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { profileData } from '../db/profile_data';
import styles from './Profile.module.scss';


interface Props{
  isOpen: boolean,
  userData: any
}

export default function Profile({isOpen, userData}: Props) {

  const logOut = ()=>{
    localStorage.removeItem('userLog');
    Router.push('/login');
  }

  return (
    <div className={`${styles.profileContainer} ${isOpen && styles.open}`}>
        {userData && <div className={styles.options}>
            <div className={styles.profile} onClick={()=> Router.push(`/user/${userData.username}`)}>
              <img src={userData.profilePic || 'noProfile.png'} alt="" />
              <div>
                <h5>{`${userData.name} ${userData.lastname}`}</h5>
                <p>@{userData.username}</p>
              </div>
              <div/>
            </div>
            <div className={styles.option} onClick={()=> Router.push(`/user/${userData.username}`)}>
                <div className={styles.icon}><CgProfile/></div>
                  <p className={styles.settings}>Profile</p>
                <div/>
            </div>
            <div className={styles.option}>
                <div className={styles.icon}><IoLanguage/></div>
                <p>Lenguage</p>
                <div/>
            </div>
            <div className={styles.option} onClick={()=> Router.push('/settings')}>
                <div className={styles.icon}><IoSettingsOutline/></div>
                  <p className={styles.settings}>Settings</p>
                <div/>
            </div>
            <div className={styles.option}>
                <div className={styles.icon}><MdDarkMode/></div>
                <p>Theme</p>
                <div/>
            </div>
            <div className={styles.option} onClick={logOut}>
                <div className={styles.icon}><RiLogoutBoxLine/></div>
                <p>Log out</p>
                <div/>
            </div>
        </div>}
    </div>
  );
}
