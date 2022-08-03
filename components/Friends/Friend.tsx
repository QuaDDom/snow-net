import Router from 'next/router';
import React from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import styles from './Friend.module.scss';

import ContentLoader from 'react-content-loader';

interface Props {
    id: number;
    image: string;
    name: string;
    lastname: string;
    status: string;
    username: string;
    isOnline: boolean;
}

export default function Friend({ id, image, name, lastname, status, username, isOnline }: Props) {
    console.log(isOnline);
    return (
        <>
            {image && name && lastname && id ? (
                <div
                    className={styles.friendContainer}
                    onClick={() => Router.push('/user/' + username)}>
                    <div className={styles.content}>
                        <div className={styles.image}>
                            <img src={image || 'noProfile.png'} alt={name} />
                            {isOnline && (
                                <div className={styles.online}>
                                    <div className={styles.status} />
                                </div>
                            )}
                        </div>
                        <div className={styles.info}>
                            <h4 className={styles.friendName}>{`${name} ${lastname}`}</h4>
                            <p>@{username}</p>
                        </div>
                        <button>
                            <RiMailSendLine />
                        </button>
                    </div>
                </div>
            ) : (
                <ContentLoader
                    viewBox="0 0 380 70"
                    speed={2}
                    width={400}
                    height={80}
                    backgroundColor={'#424a51'}
                    foregroundColor={'#77839a'}>
                    <rect x="68" y="14" rx="3" ry="3" width="88" height="7" />
                    <rect x="164" y="14" rx="3" ry="3" width="52" height="7" />
                    <rect x="68" y="35" rx="3" ry="3" width="100" height="6" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                    <rect x="20" y="88" rx="3" ry="3" width="178" height="6" />
                    <circle cx="35" cy="27" r="27" />
                </ContentLoader>
            )}
        </>
    );
}
