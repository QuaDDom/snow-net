import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { HiOutlineHeart } from 'react-icons/hi';
import styles from './GalleryImage.module.scss';
import ImageModal from './ImageModal';
import Image from 'next/image';

interface Props {
    img: string;
    user: any;
}

export default function GalleryImage({ img, user }: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleUserClick = () => Router.push(`/user/${user.username}`);
    const handleClick = () => setModalOpen(true);

    return (
        <>
            {modalOpen && <ImageModal img={img} user={user} setModalOpen={setModalOpen} />}
            <div className={styles.galleryImageContainer} onClick={handleClick}>
                <div className={styles.containerImage}>
                    <img src={img} className={styles.image} />
                    <div className={styles.userInfo}>
                        <img src={user.profilePic} onClick={handleUserClick} />
                        <p>{user.name}</p>
                    </div>
                    <div className={styles.options}>
                        <a href={img}>
                            <BsDownload />
                        </a>
                        <span>
                            <HiOutlineHeart />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
