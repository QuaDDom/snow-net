import Router from 'next/router';
import React from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import styles from './Person.module.scss'

interface Props{
    id: number,
    image: string,
    name: string,
    lastname: string,
    username: string
}

export default function Person({id, image, name, lastname, username}: Props) {

  const handleClick = ()=> Router.push(`/user/${username}`)

  return (
      <div className={styles.personContainer}>
         <div className={styles.content}>
              <div className={styles.image}>
                <img src={image || 'noProfile.png'} alt={name} onClick={handleClick}/>
                <div className={styles.status}/>
              </div>
              <div className={styles.info}>
                <h4 className={styles.friendName}>{`${name} ${lastname}`}</h4>
                <p>@{username}</p>
              </div>
              <button><RiMailSendLine/></button>
          </div>
      </div>
  );
}
