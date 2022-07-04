import NavLink from 'next/link';
import Router from 'next/router';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from './Nav.module.scss';
import ProfileNav from './ProfileNav';

export default function Nav() {
    const { loggedUser } = useContext<any>(AuthContext);

    return (
        <>
            <div className={styles.navigation}>
                <div className={styles.logo} onClick={() => Router.push('/')}>
                    <img src="/snow-logo.svg" />
                    <h1>SNOW</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink href="/">Home</NavLink>
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
                        <ProfileNav userData={loggedUser} />
                    </ul>
                </nav>
            </div>
        </>
    );
}
