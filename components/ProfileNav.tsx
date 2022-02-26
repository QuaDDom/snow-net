import { profileData } from '../db/profile_data';
import React, { useState } from 'react';
import Profile from './Profile';
import styles from './ProfileNav.module.scss';

interface Props{
    userData: any
}

export default function ProfileNav({userData}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);
  return (
      <div className={styles.profileNav}>
          <div className={styles.imageProfile} onClick={handleClick}>
             { userData && <img src={userData.profilePic || './noProfile.png'} alt={userData.username} />}
          </div>
          <Profile isOpen={isOpen} userData={userData}/>
      </div>
  );
}
