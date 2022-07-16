import React, { useEffect, useState } from 'react';
import styles from './OpenImage.module.scss';

interface Props {
    img?: string;
    openImage: boolean;
    setOpenImage: any;
}

export default function OpenImage({ img, openImage, setOpenImage }: Props) {
    const [isClose, setIsClose] = useState(false);

    useEffect(() => {
        document.body.addEventListener('keydown', (e: any) => {
            if (e.keyCode === 27) {
                setIsClose(true);
            }
        });
    });

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
