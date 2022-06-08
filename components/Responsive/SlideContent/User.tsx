import React from 'react';
import styles from './User.module.scss';
import Image from 'next/image';

interface Props {
    profilePic: string;
    name: string;
    username: string;
}

export default function User({ profilePic, name, username }: Props) {
    return (
        <div className={styles.userContent}>
            <img src={profilePic || 'noProfile.png'} alt={username} />
            <div className={styles.text}>
                <h5>{name}</h5>
                <p>@{username}</p>
            </div>
            <button>Follow</button>
        </div>
    );
}
