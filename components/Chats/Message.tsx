import React, { useState } from 'react';
import OpenImage from '../OpenImage';
import styles from './Message.module.scss';

interface Props {
    text: string;
    received: boolean;
    createdAt: string;
    image: string | '' | undefined;
}

export default function Message({ text, received, createdAt, image }: Props) {
    const [imageOpen, setImageOpen] = useState(false);

    const handleClick = () => (imageOpen ? setImageOpen(false) : setImageOpen(true));

    return (
        <>
            {imageOpen && (
                <OpenImage img={image} openImage={imageOpen} setOpenImage={setImageOpen} />
            )}
            <div
                className={`${styles.messageContainer} ${
                    received ? styles.received : styles.sended
                }`}>
                {image ? (
                    <div className={styles.message}>
                        <img src={image} onClick={handleClick} />
                        {text && <p>{text}</p>}
                        <span>{createdAt}</span>
                    </div>
                ) : (
                    <div className={styles.text}>
                        {text}
                        <span>{createdAt}</span>
                    </div>
                )}
            </div>
        </>
    );
}
