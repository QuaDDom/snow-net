import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { useTouch } from '../../hooks/useTouch';
import styles from './TopBar.module.scss';
import UserProfile from './UserProfile';


export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedUser } = useContext<any>(AuthContext);
  
  const handleOpen = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

  return (
    <div className={styles.topBarContainer}>
        <div className={styles.icons}>
            <div className={styles.snow}>
                <img src='snow-logo.svg' alt="snow" className={styles.logo} />
            </div>
            <h3>SNOW</h3>
            <div className={styles.user}>
                {loggedUser && <img 
                src={loggedUser.profilePic} 
                alt={loggedUser.username}
                onClick={handleOpen}
                className={styles.profile}
                />}
                { isOpen && 
                  <UserProfile loggedUser={loggedUser}/>
                }
            </div>
        </div>
    </div>
  )
}

