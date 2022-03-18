import React, { useEffect, useState } from 'react';
import Friend from './Friend';
import styles from './FriendList.module.scss';

interface Friend{
  id: number,
  image: string,
  name: string,
  lastname: string,
  status: string
}

const friendList = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/4065156/pexels-photo-4065156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Jacob",
    lastname: "Space",
    status: "offline"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5544025/pexels-photo-5544025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Mateo",
    lastname: "Quadrelli",
    status: "online"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/4059426/pexels-photo-4059426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Josefina",
    lastname: "Peréz",
    status: "disturb"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/9889178/pexels-photo-9889178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Valentin",
    lastname: "Salomone",
    status: "online"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/10850674/pexels-photo-10850674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Joaquín",
    lastname: "Sanz",
    status: "idle"
  }
]

export default function FriendList() {

  return (
      <div className={styles.friendListContainer}>
        <div className={styles.border}/>
        <div className={styles.friendGrid}>
        <h2>Friends</h2>
            {
              friendList.map(({id, name, lastname, image, status}: Friend, index: number)=>(
                <Friend 
                id={id} 
                name={name} 
                lastname={lastname} 
                image={image}
                status={status}
                key={index}
                />
              ))
            }
        </div>
      </div>
  );
}
