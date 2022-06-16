import React, { useEffect, useState } from 'react';
import styles from './ChatInfo.module.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';

interface Props {
    img: string;
    name: string;
    lastname: string;
    setCurrentChat: any;
}

export default function ChatInfo({ img, name, lastname, setCurrentChat }: Props) {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

    const handleClick = () => (optionsOpen ? setOptionsOpen(false) : setOptionsOpen(true));

    return (
        <div className={styles.chatInfoContainer}>
            {!isResponsive && (
                <button onClick={() => setCurrentChat('')} className={styles.back}>
                    <AiOutlineArrowLeft />
                </button>
            )}
            <div className={styles.personInfo}>
                <img src={img || 'noProfile.png'} alt={name} />
                <p>{`${name} ${lastname}`}</p>
            </div>
            <div className={styles.conf}>
                <p>
                    <AiOutlineSearch />
                </p>
                <p onClick={handleClick}>
                    <BiDotsVerticalRounded />
                </p>
            </div>
            <div className={`${styles.option} ${optionsOpen && styles.open}`}>
                <button>Mute</button>
                <button>Delete Chat</button>
            </div>
        </div>
    );
}
