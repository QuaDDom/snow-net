import React from 'react'
import styles from './Message.module.scss';

interface Props{
    text: string,
    received: boolean,
    createdAt: string,
    image: string | '' | undefined
}

export default function Message({text, received, createdAt, image}: Props) {
  return (
    <div className={`${styles.messageContainer} ${received ? styles.received : styles.sended}`}>
        <div className={styles.text}>
          { image && <img src={image}></img>}
          {text} 
          <span>{createdAt}</span>
        </div>
    </div>
  )
}
