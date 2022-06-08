import React, { useState } from 'react';
import styles from './PostOptions.module.scss';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { BiRepost, BiComment } from 'react-icons/bi';
import axios from 'axios';
import { useEffect } from 'react';

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
        isLiked ? setTotalLikes(totalLikes - 1) : setTotalLikes(totalLikes + 1);
        await axios.put(`http://localhost:5000/api/posts/${_id}/like`, { userId: loggedUser._id });
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
            await axios.post('http://localhost:5000/api/posts/repost', {
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
            <div className={styles.repost} onClick={handleRepost}>
                <span className={`${isReposted && styles.reposted}`}>
                    <BiRepost />
                </span>
                <p className={`${isReposted && styles.reposted}`}>{totalReposts}</p>
            </div>
            <div className={styles.likes} onClick={handleLike}>
                {isLiked ? (
                    <span className={styles.isLiked}>
                        <HiHeart />
                    </span>
                ) : (
                    <span>
                        <HiOutlineHeart />
                    </span>
                )}
                <p className={`${isLiked && styles.liked}`}>{totalLikes}</p>
            </div>
        </div>
    );
}
