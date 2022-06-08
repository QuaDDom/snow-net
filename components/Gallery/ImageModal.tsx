import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { HiOutlineHeart } from 'react-icons/hi';
import styles from './ImageModal.module.scss';
import { projectStorage } from '../../config/firebase.config';
import Image from 'next/image';

interface Props {
    img: string;
    user: any;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageModal({ img, user, setModalOpen }: Props) {
    const [downloadURL, setDownloadURL] = useState('');
    const handleClick = () => setModalOpen(false);

    useEffect(() => {
        if (img)
            projectStorage
                .refFromURL(img)
                .getDownloadURL()
                .then((url: string) => setDownloadURL(url));
    }, []);

    return (
        <div className={styles.imageModalContainer} onClick={handleClick}>
            <div className={styles.containerAll}>
                <div className={styles.userInfo}>
                    <img src={user.profilePic} className={styles.profilePic} />
                    <div>
                        <h4>{user.name}</h4>
                        <p>@{user.username}</p>
                    </div>
                </div>
                <img src={img + '?alt=media'} className={styles.image} />
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
    );
}
