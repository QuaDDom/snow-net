import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { HiMinusSm } from 'react-icons/hi';
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import styles from './GroupCard.module.scss';

interface Props {
    title: string;
    description: string;
    groupPic: string;
    groupCover: string;
    groupPrivate: any;
    members: [string];
    _id: string;
    userId: string;
}

const noPic =
    'https://source.boringavatars.com/marble/120/?colors=5FC9F3,2E79BA,1E549F,081F37,247881,43919B,30AADD,00FFC6,F7E2E2,61A4BC,5B7DB1,1A132F,201A1A40,20270082,207A0BC0,20FA58B6,B20600,FF5F00';

export default function GroupCard({
    title,
    description,
    groupPic,
    groupCover,
    groupPrivate,
    members,
    _id,
    userId
}: Props) {
    const [isJoined, setIsJoined] = useState(false);
    const [isHoverJoined, setIsHoverJoined] = useState(false);

    const handleJoin = async () => {
        try {
            await axios.put(`https://snow-net.herokuapp.com/api/groups/join/${_id}`, {
                userId: userId
            });
            isJoined ? setIsJoined(false) : setIsJoined(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleHoverButton = () =>
        isHoverJoined ? setIsHoverJoined(false) : setIsHoverJoined(true);

    useEffect(() => {
        setIsJoined(members.includes(userId) ? true : false);
    }, []);

    return (
        <div className={styles.groupCardContainer} onClick={() => Router.push('/groups/' + _id)}>
            <div className={styles.coverImg}>
                <img src={groupCover || 'noGroupPic.jpg'} alt={title} />
            </div>
            <div className={styles.content}>
                <div className={styles.groupPic}>
                    <img src={groupPic || noPic} alt={title} />
                </div>
                <div className={styles.principal}>
                    <h4>{title}</h4>
                    <div className={styles.sub}>
                        <p>{members.length} Members</p>
                        <p>·</p>
                        {groupPrivate ? (
                            <p className={styles.type}>
                                <span>
                                    <RiGitRepositoryPrivateLine />
                                </span>{' '}
                                Private
                            </p>
                        ) : (
                            <p className={styles.type}>
                                <span>
                                    <MdPublic />
                                </span>{' '}
                                Public
                            </p>
                        )}
                    </div>
                </div>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quasi.
                </p>
                <div className={styles.buttonContainer}>
                    {!isJoined ? (
                        <button className={`${styles.button} ${styles.join}`}>Join</button>
                    ) : (
                        <button
                            className={`${styles.button} ${styles.joined}`}
                            onMouseEnter={handleHoverButton}
                            onMouseLeave={handleHoverButton}>
                            {isHoverJoined ? (
                                <>
                                    Leave{' '}
                                    <span>
                                        <HiMinusSm />
                                    </span>
                                </>
                            ) : (
                                'Joined'
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
