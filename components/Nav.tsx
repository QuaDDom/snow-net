import NavLink from 'next/link';
import Router from 'next/router';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import styles from './Nav.module.scss';
import ProfileNav from './ProfileNav';
import Image from 'next/image';

export default function Nav() {
  const { loggedUser } = useContext<any>(AuthContext);

  return (
    <>
        <div className={styles.navigation}>
            <div className={styles.logo} onClick={()=> Router.push('/')}>
                <Image 
                    src="/snow-logo.svg"
                    layout="fill"
                 />
                <p>SNOW</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink href="/">Home</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink href="/explore">Explore</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink href="/messages">Messages</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink href="/groups/discover">Groups</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink href="/gallery/all">Gallery</NavLink>
                    </li>
                </ul>
                <ul>
                    <ProfileNav userData={loggedUser}/>
                </ul>
            </nav>
        </div>
    </>
  );
}
