import React from 'react'
import { AiOutlinePushpin } from 'react-icons/ai';
import { MdBlock, MdOutlineReport } from 'react-icons/md';
import { RiDeleteBin5Line, RiEditLine, RiUserFollowLine, RiVolumeMuteLine } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import styles from './PostDots.module.scss';
import Router from 'next/router';

interface Props{
    userId: string,
    isOpen: boolean,
    loggedUserId: string,
    handleModal: ()=> void,
    deletePost: () => Promise<void>,
    handleEdit: ()=> void,
    handleReportModal: ()=> void,
    setIsOpen: any,
    username: string,
    postId: string,
    postRef: React.MutableRefObject<HTMLDivElement>,
    reposted?: boolean
}

export default function PostDotsOptions({isOpen, userId, loggedUserId, 
                                        handleModal,handleEdit, setIsOpen, 
                                        username, postId, postRef, reposted, handleReportModal
                                        }: Props
                                        ) {
                                            
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);
    const handlePin = async ()=> {

    }

    console.log(reposted)

    return (
        <>
            {
            isOpen && userId === loggedUserId && 
            <>
            <div className={`${styles.options} ${reposted && styles.reposted}`} style={isResponsive ? {
                position: 'absolute',
                top: postRef.current.offsetTop + (!reposted ? 50 : 80),
                right: postRef.current.offsetLeft - 30
            } : {}}>
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
            <div className={styles.options} style={isResponsive ? {
                position: 'absolute',
                top: postRef.current.offsetTop + 50,
                right: postRef.current.offsetLeft - 30
            } : {}}>
                <div className={styles.option} onClick={()=> Router.push('/user/' + username)}>
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
                <div className={styles.option} onClick={handleReportModal}>
                    <span><MdOutlineReport/></span>
                    <p>Report this post</p>
                </div>
            </div>
        }
        </>
    )
}
