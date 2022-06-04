import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaUserCheck, FaUserClock, FaUserPlus } from 'react-icons/fa';
import { RiMailSendLine, RiUserAddLine } from 'react-icons/ri';
import styles from './Person.module.scss'
import Image from 'next/image';

interface Props{
    id: number,
    image: string,
    name: string,
    lastname: string,
    username: string,
    loggedUser: any,
    friendReqs: any
}

export default function Person({id, image, name, lastname, username, loggedUser, friendReqs}: Props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isFriend, setIsFriend] = useState(false)
  const handleClick = ()=> Router.push(`/user/${username}`)

  const handleFollow = async ()=>{
    try{
        if(!isFollowed){
            await axios.put(`http://localhost:5000/api/users/${id}/follow`, {
                userId: loggedUser._id
            });
            setIsFollowed(true);
        } else{
            await axios.put(`http://localhost:5000/api/users/${id}/unfollow`, {
                userId: loggedUser._id
            });
            setIsFollowed(false);
        }
    } catch(err){
        (err)
    }
}

  useEffect(()=>{
    if(friendReqs.includes(loggedUser?._id)){
      setIsFollowed(true);
    }
    if(loggedUser?.friends.includes(id)){
      setIsFriend(true)
    }
  },[loggedUser])

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
              <button onClick={handleFollow}>{!isFollowed
               ?
                <FaUserPlus/>
               : 
                isFriend 
                ? <FaUserCheck style={{color: '#60d660'}}/> 
                : <FaUserClock style={{color: '#FFD93D'}}/>}</button>
          </div>
      </div>
  );
}
