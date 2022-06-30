import Router from 'next/router';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoLanguage, IoSettingsOutline } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import styles from './UserProfile.module.scss';

interface Props {
    loggedUser: any;
    touch: string;
}

export default function UserProfile({ loggedUser, touch }: Props) {
    return (
        <>
            <div className={`${styles.darkbg} ${touch === 'left' ? styles.open : styles.close}`} />
            <div
                className={`${styles.userProfileContainer} ${
                    touch === 'left' ? styles.open : styles.close
                }`}>
                {loggedUser && (
                    <>
                        <div className={styles.userInfo}>
                            <div className={styles.info}>
                                <img src={loggedUser.profilePic} alt={loggedUser.username} />
                                <h4>
                                    {loggedUser.name} {loggedUser.lastname}
                                </h4>
                                <p>@{loggedUser.username}</p>
                            </div>
                            <div className={styles.followers}>
                                <p>
                                    <span>{loggedUser.friendReqs.length}</span> Followers
                                </p>
                                <p>
                                    <span>{loggedUser.friendReqsSend.length}</span> Followings
                                </p>
                            </div>
                        </div>
                        <div className={styles.options}>
                            <button onClick={() => Router.push('/')}>
                                <span>
                                    <CgProfile />
                                </span>{' '}
                                Profile
                            </button>
                            {/* <button onClick={() => Router.push('/')}>
                                <span>
                                    <IoLanguage />
                                </span>{' '}
                                Language
                            </button> */}
                            <button onClick={() => Router.push('/settings')}>
                                <span>
                                    <IoSettingsOutline />
                                </span>{' '}
                                Settings
                            </button>
                            <button onClick={() => Router.push('/')}>
                                <span>
                                    <MdDarkMode />
                                </span>{' '}
                                Theme
                            </button>
                            <button onClick={() => Router.push('/')}>
                                <span>
                                    <RiLogoutBoxLine />
                                </span>{' '}
                                Log out
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
