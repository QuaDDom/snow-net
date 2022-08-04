import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styles from './LikeCounter.module.scss';

interface Props {
    handleLike: () => void;
    isLiked: boolean;
    totalLikes: number;
    _id: string;
}

export default function LikeCounter({ handleLike, isLiked, totalLikes, _id }: Props) {
    const [likes, setLikes] = useState(totalLikes);
    const [animationLikes, setAnimationLikes] = useState('initial');
    const [isUserLiked, setIsUserLiked] = useState(true);

    Pusher.logToConsole = true;

    // const pusher = new Pusher('33ae193fbdb955a596de', {
    //     cluster: 'us2',
    //     forceTLS: false
    // });

    // let socketId;

    // // retrieve the socket ID on successful connection
    // pusher.connection.bind('connected', function () {
    //     socketId = pusher.connection.socket_id;
    // });

    // let channel = pusher.subscribe('post-events');
    // channel.bind('postAction', function (data: any) {
    //     if (isUserLiked) return;
    //     if (data.action === 'Like' && data.postId === _id) {
    //         setLikes(likes + 1);
    //     }
    //     if (data.action === 'Dislike' && data.postId === _id) {
    //         setLikes(likes - 1);
    //     }
    // });

    // useEffect(() => {
    //     setTimeout(() => setAnimationLikes('goUp'), 0);

    //     setTimeout(() => setAnimationLikes('waitDown'), 100);

    //     setTimeout(() => setAnimationLikes('initial'), 200);
    // }, [likes]);

    const handleLikes = () => {
        setIsUserLiked(true);
        // 2. Like the post
        setTimeout(() => setLikes(!isLiked ? likes + 1 : likes - 1), 300);

        setTimeout(() => setAnimationLikes('goUp'), 0);
        // 3. New number waits down
        setTimeout(() => setAnimationLikes('waitDown'), 100);
        // 4. New number stays in the middle
        setTimeout(() => setAnimationLikes('initial'), 200);

        // Call main like function
        handleLike();
    };

    return (
        <div className={styles.likes} onClick={handleLikes}>
            {isLiked ? (
                <span className={styles.isLiked}>
                    <HiHeart />
                </span>
            ) : (
                <span>
                    <HiOutlineHeart />
                </span>
            )}
            <div className={styles.likesContainer}>
                <p className={`${isLiked && styles.liked} ${styles[animationLikes]}`}>{likes}</p>
            </div>
        </div>
    );
}
