
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
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
            <div className={styles.profile}>
              <img src={userData.profilePic || 'noProfile.png'} alt="" />
              <p>{`${userData.name} ${userData.lastname}`}</p>
              <div/>
            </div>
            <div className={styles.option}>
                <div className={styles.icon}></div>
                <Link href="/editprofile">
                  <p className={styles.settings}>Profile</p>
                </Link>
                <div/>
            </div>
            <div className={styles.option}>
                <div className={styles.icon}></div>
                <p>Lenguage</p>
                <div/>
            </div>
            <div className={styles.option}>
                <div className={styles.icon}></div>
                <Link href="/settings">
                  <p className={styles.settings}>Settings</p>
                </Link>
                <div/>
            </div>
            <div className={styles.option}>
                <div className={styles.icon}></div>
                <p>Theme</p>
                <div/>
            </div>
            <div className={styles.option} onClick={logOut}>
                <div className={styles.icon}></div>
                <p>Log out</p>
                <div/>
            </div>
        </div>}
    </div>
  );
}
