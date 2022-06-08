import axios from 'axios';
import React from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styles from './CommentOptions.module.scss';

interface Props {
    userId: string;
    likes: any;
    loggedUser: any;
    image: string;
    comments: any;
}

export default function CommentOptions({ loggedUser, comments, likes, userId }: Props) {
    const handleLike = async () => {
        //await axios.put(`http://localhost:5000/api/posts/like`, {userId: loggedUser._id});
    };

    return (
        <div className="commentsOptionsContainer">
            <div className={styles.likes}>
                {likes.includes(loggedUser._id) ? (
                    <span className={styles.isLiked}>
                        <HiHeart onClick={handleLike} />
                    </span>
                ) : (
                    <span>
                        <HiOutlineHeart onClick={handleLike} />
                    </span>
                )}
                <p className={`${likes.includes(loggedUser._id) && styles.liked}`}>
                    {likes.length}
                </p>
            </div>
            <div className={styles.comment}>
                <button>Reply</button>
            </div>
        </div>
    );
}
