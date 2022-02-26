import React, { useState } from 'react'
import styles from './PostDots.module.scss';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiUserFollowLine, RiVolumeMuteLine, RiDeleteBin5Line, RiEditLine } from 'react-icons/ri';
import { MdBlock, MdOutlineReport } from 'react-icons/md';
import { AiOutlinePushpin } from 'react-icons/ai';
import axios from 'axios';

interface Props{
    username: string,
    loggedUserId: string,
    userId: string,
    postId: string,
    fetchData: () => Promise<void>
}

export default function PostDots({username, userId, loggedUserId, postId, fetchData}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

    const deletePost = async ()=>{
        console.log(userId, loggedUserId)
        await axios.delete(`http://localhost:5000/api/posts/${postId}`, { data:{userId: loggedUserId} });
        fetchData();
    }

    return (
        <div className={styles.postDotsContainer}>
            <span onClick={handleClick} className={styles.dots}><HiDotsHorizontal/></span>
            {
                isOpen && userId === loggedUserId && 
                <div className={styles.options}>
                    <div className={`${styles.option} ${styles.delete}`} onClick={deletePost}>
                        <span><RiDeleteBin5Line/></span>
                        <p>Delete post</p>
                    </div>
                    <div className={styles.option}>
                        <span><RiEditLine/></span>
                        <p>Edit post</p>
                    </div>
                    <div className={styles.option}>
                        <span><AiOutlinePushpin/></span>
                        <p>Pin this post</p>
                    </div>
                </div>
            }
            {
                isOpen && userId !== loggedUserId && 
                <div className={styles.options}>
                    <div className={styles.option}>
                        <span><RiUserFollowLine/></span>
                        <p>Follow @{username}</p>
                    </div>
                    <div className={styles.option}>
                        <span><RiVolumeMuteLine/></span>
                        <p>Mute @{username}</p>
                    </div>
                    <div className={styles.option}>
                        <span><MdBlock/></span>
                        <p>Block @{username}</p>
                    </div>
                    <div className={styles.option}>
                        <span><MdOutlineReport/></span>
                        <p>Report this post</p>
                    </div>
                </div>
            }
        </div>
    )
}
