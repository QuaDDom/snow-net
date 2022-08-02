import React, { useState } from 'react';
import styles from './PostOptions.module.scss';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { BiRepost, BiComment } from 'react-icons/bi';
import axios from 'axios';
import { useEffect } from 'react';
import LikeCounter from './Options/LikeCounter';
import RepostCounter from './Options/RepostCounter';
import Pusher from 'pusher-js';

interface Props {
    userId: string;
    likes: any;
    _id: string;
    fetchData: () => Promise<void>;
    loggedUser: any;
    image: string;
    text: string;
    createdAt: any;
    repostedBy: any;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
    showComments: boolean;
    comments: any;
}

export default function PostOptions({
    userId,
    likes,
    _id,
    fetchData,
    loggedUser,
    text,
    image,
    repostedBy,
    setShowComments,
    showComments,
    comments
}: Props) {
    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(likes.length);
    const [isReposted, setIsReposted] = useState(false);
    const [totalReposts, setTotalReposts] = useState(repostedBy.length);

    const handleLike = async () => {
        isLiked ? setIsLiked(false) : setIsLiked(true);
        await axios.put(`https://snow-net.herokuapp.com/api/posts/${_id}/like`, {
            userId: loggedUser._id
        });
    };

    useEffect(() => {
        likes.includes(loggedUser._id) && setIsLiked(true);
        repostedBy.includes(loggedUser._id) && setIsReposted(true);
    }, []);

    const handleRepost = async () => {
        try {
            isReposted ? setIsReposted(false) : setIsReposted(true);
            isReposted ? setTotalReposts(totalReposts - 1) : setTotalReposts(totalReposts + 1);
            const newRepostedBy = [...repostedBy];
            await axios.post('https://snow-net.herokuapp.com/api/posts/repost', {
                userId: loggedUser._id,
                text,
                image,
                reposted: true,
                repostedPost: _id,
                likes,
                repostedBy: newRepostedBy,
                postId: _id
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenComments = () =>
        showComments ? setShowComments(false) : setShowComments(true);

    return (
        <div className={styles.postOptionsContainer}>
            <div className={styles.comments}>
                <span onClick={handleOpenComments}>
                    <BiComment />
                </span>
                <p>{comments && comments.length}</p>
            </div>
            <RepostCounter
                handleRepost={handleRepost}
                totalReposts={totalReposts}
                isReposted={isReposted}
            />
            <LikeCounter
                handleLike={handleLike}
                totalLikes={totalLikes}
                isLiked={isLiked}
                _id={_id}
            />
        </div>
    );
}
