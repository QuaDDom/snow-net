import React from 'react';
import styles from './HoverUserProfile.module.scss';
import Image from 'next/image';

interface Props {
    name: string;
    username: string;
    bio: string;
    profilePic: string;
    bannerPic: string;
}

export default function HoverUserProfile({ name, username, bio, profilePic, bannerPic }: Props) {
    return (
        <div className={styles.userProfileModal}>
            <div className={styles.user}>
                <div className={styles.images}>
                    <div className={styles.banner}>
                        <img src={bannerPic || 'noCover.jpg'} alt="" className={styles.banner} />
                    </div>
                    <img src={profilePic} alt="" className={styles.profile} />
                </div>
                <div className={styles.info}>
                    <h4>{name}</h4>
                    <p className={styles.dot}>·</p>
                    <p>@{username}</p>
                </div>
                <div className={styles.bio}>
                    <p>{bio}</p>
                </div>
            </div>
        </div>
    );
}
