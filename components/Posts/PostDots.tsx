import React, { useState } from 'react';
import styles from './PostDots.module.scss';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiUserFollowLine, RiVolumeMuteLine, RiDeleteBin5Line, RiEditLine } from 'react-icons/ri';
import { MdBlock, MdOutlineReport } from 'react-icons/md';
import { AiOutlinePushpin } from 'react-icons/ai';
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete';
import { useRef } from 'react';
import { MutableRefObject } from 'react';

interface Props {
    username: string;
    loggedUserId: string;
    userId: string;
    postId: string;
    fetchData: () => Promise<void>;
    handleModal: () => void;
    deletePost: () => Promise<void>;
    handleEdit: () => void;
    handleReport: () => void;
    isOpen: boolean;
    setIsOpen: any;
}

export default function PostDots({
    username,
    userId,
    loggedUserId,
    handleModal,
    postId,
    fetchData,
    handleEdit,
    handleReport,
    isOpen,
    setIsOpen
}: Props) {
    const handleClick = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    };

    const handlePin = async () => {
        try {
            await axios.put(`http://localhost:5000/api/posts/pin/${postId}`);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={styles.postDotsContainer}>
                <span onClick={handleClick} className={styles.dots}>
                    <HiDotsHorizontal />
                </span>
            </div>
        </>
    );
}
function setPickerOpen(arg0: boolean): void {
    throw new Error('Function not implemented.');
}
