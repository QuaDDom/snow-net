import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import styles from './TopBar.module.scss';


export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedUser } = useContext<any>(AuthContext);
  return (
    <div className={styles.topBarContainer}>
        <div className={styles.icons}>
            <div className={styles.snow}>
                <img src='snow-logo.svg' alt="snow" />
            </div>
            <h3>SNOW</h3>
            <div className={styles.user}>
                {loggedUser && <img src={loggedUser.profilePic} alt={loggedUser.username} />}
            </div>
        </div>
    </div>
  )
}
