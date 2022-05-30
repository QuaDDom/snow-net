import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { useTouch } from '../../hooks/useTouch';
import styles from './TopBar.module.scss';
import UserProfile from './UserProfile';
import Image from 'next/image';


interface Props{
  touch: string
}

export default function TopBar({touch}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedUser } = useContext<any>(AuthContext);
  
  const handleOpen = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

  return (
    <div className={styles.topBarContainer}>
        <div className={styles.icons}>
            <div className={styles.snow}>
                <Image src='snow-logo.svg' alt="snow" className={styles.logo} />
            </div>
            <h3>SNOW</h3>
            <div className={styles.user}>
                {loggedUser && <Image 
                src={loggedUser.profilePic} 
                alt={loggedUser.username}
                onClick={handleOpen}
                className={styles.profile}
                />}
                <UserProfile loggedUser={loggedUser} touch={touch}/>
            </div>
        </div>
    </div>
  )
}

