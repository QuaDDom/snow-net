import React, { useEffect, useState } from 'react';
import styles from './ChatInfo.module.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

interface Props{
    img: string,
    name: string,
    lastname: string
}

export default function ChatInfo({img, name, lastname}: Props) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const handleClick = ()=> optionsOpen ? setOptionsOpen(false) : setOptionsOpen(true);


  return (
    <div className={styles.chatInfoContainer}>
          <div className={styles.personInfo}>
              <img src={img} alt={name} />
              <p>{`${name} ${lastname}`}</p>
          </div>
          <div className={styles.conf}>
            <p><AiOutlineSearch/></p> 
            <p onClick={handleClick}><BiDotsVerticalRounded/></p> 
          </div>
          <div className={`${styles.option} ${optionsOpen && styles.open}`}>
            <button>Mute</button>
            <button>Delete Chat</button>
          </div>
      </div>
  );
}
