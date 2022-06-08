import React, { useState } from 'react';
import styles from './OpenImage.module.scss';
import Image from 'next/image';

interface Props {
    img?: string;
    openImage: boolean;
    setOpenImage: any;
}

export default function OpenImage({ img, openImage, setOpenImage }: Props) {
    const [isClose, setIsClose] = useState(false);
    const handleClick = () => {
        setTimeout(() => setOpenImage(false), 550);
        setIsClose(true);
    };
    return (
        <div
            className={`${styles.openImageContainer} ${isClose && styles.close}`}
            onClick={handleClick}>
            <img src={img || ''} width="100%" className={`${isClose && styles.close}`} />
        </div>
    );
}
