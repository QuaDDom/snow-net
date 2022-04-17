import React from 'react'
import { AiOutlinePushpin } from 'react-icons/ai';
import { MdBlock, MdOutlineReport } from 'react-icons/md';
import { RiDeleteBin5Line, RiEditLine, RiUserFollowLine, RiVolumeMuteLine } from 'react-icons/ri';
import styles from './PostDots.module.scss';

interface Props{
    userId: string,
    isOpen: boolean,
    loggedUserId: string,
    handleModal: ()=> void,
    deletePost: () => Promise<void>,
    handleEdit: ()=> void,
    setIsOpen: any,
    username: string,
    postId: string,
    postRef: React.MutableRefObject<HTMLDivElement>
}

export default function PostDotsOptions({
                                        isOpen, 
                                        userId, 
                                        loggedUserId, 
                                        handleModal,
                                        handleEdit, 
                                        setIsOpen, 
                                        username,
                                        postId,
                                        postRef
                                        }: Props
                                        ) {
    
    const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);
    const handlePin = async ()=> {

    }
    return (
        <>
                    {
                    isOpen && userId === loggedUserId && 
                    <>
                    <div className={styles.options} style={{
                        position: 'absolute',
                        top: postRef.current.offsetTop + 50,
                        right: postRef.current.offsetLeft - 35
                    }}>
                        <div className={`${styles.option} ${styles.delete}`} onClick={handleModal}>
                            <span><RiDeleteBin5Line/></span>
                            <p>Delete post</p>
                        </div>
                        <div className={styles.option} onClick={handleEdit}>
                            <span><RiEditLine/></span>
                            <p>Edit post</p>
                        </div>
                        <div className={styles.option} onClick={handlePin}>
                            <span><AiOutlinePushpin/></span>
                            <p>Pin this post</p>
                        </div>
                    </div>
                    </>
                }
                {
                    isOpen && userId !== loggedUserId && 
                    <div className={styles.options} style={{
                        position: 'absolute',
                        top: postRef.current.offsetTop + 50,
                        right: postRef.current.offsetLeft - 50}}>
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
        </>
    )
}
