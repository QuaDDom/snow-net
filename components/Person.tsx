import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaUserCheck, FaUserClock, FaUserPlus } from 'react-icons/fa';
import { RiMailSendLine, RiUserAddLine } from 'react-icons/ri';
import styles from './Person.module.scss';
import Image from 'next/image';
import ContentLoader from 'react-content-loader';

interface Props {
    id: number;
    image: string;
    name: string;
    lastname: string;
    username: string;
    loggedUser: any;
    friendReqs: any;
}

export default function Person({
    id,
    image,
    name,
    lastname,
    username,
    loggedUser,
    friendReqs
}: Props) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const handleClick = () => Router.push(`/user/${username}`);

    const handleFollow = async () => {
        try {
            if (!isFollowed) {
                await axios.put(`http://localhost:5000/api/users/${id}/follow`, {
                    userId: loggedUser._id
                });
                setIsFollowed(true);
            } else {
                await axios.put(`http://localhost:5000/api/users/${id}/unfollow`, {
                    userId: loggedUser._id
                });
                setIsFollowed(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (friendReqs.includes(loggedUser?._id)) {
            setIsFollowed(true);
        }
        if (loggedUser?.friends.includes(id)) {
            setIsFriend(true);
        }
    }, [loggedUser]);

    return (
        <>
            {image && username ? (
                <div className={styles.personContainer}>
                    <div className={styles.content}>
                        <div className={styles.image}>
                            <img src={image || 'noProfile.png'} alt={name} onClick={handleClick} />
                            <div className={styles.status} />
                        </div>
                        <div className={styles.info}>
                            <h4 className={styles.friendName}>{`${name} ${lastname}`}</h4>
                            <p>@{username}</p>
                        </div>
                        <button onClick={handleFollow}>
                            {!isFollowed ? (
                                <FaUserPlus />
                            ) : isFriend ? (
                                <FaUserCheck style={{ color: '#60d660' }} />
                            ) : (
                                <FaUserClock style={{ color: '#FFD93D' }} />
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.personContainer}>
                    <ContentLoader
                        viewBox="0 0 380 70"
                        speed={2}
                        width={300}
                        height={80}
                        backgroundColor={'#424a51'}
                        foregroundColor={'#77839a'}>
                        <rect x="98" y="14" rx="3" ry="3" width="88" height="7" />
                        <rect x="194" y="14" rx="3" ry="3" width="52" height="7" />
                        <rect x="98" y="35" rx="3" ry="3" width="100" height="6" />
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                        <rect x="20" y="88" rx="3" ry="3" width="178" height="6" />
                        <circle cx="55" cy="30" r="30" />
                    </ContentLoader>
                </div>
            )}
        </>
    );
}
