import Router from 'next/router';
import React from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import styles from './Friend.module.scss';
import Image from 'next/image';

interface Props {
  id: number,
  image: string,
  name: string,
  lastname: string,
  status: string,
  username: string
}

export default function Friend({id, image, name, lastname, status, username}: Props) {
  return (
      <div className={styles.friendContainer} onClick={()=> Router.push('/user/'+username)}>
         <div className={styles.content}>
              <div className={styles.image}>
                <img src={image || 'noProfile.png'} alt={name} layout="fill"/>
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
