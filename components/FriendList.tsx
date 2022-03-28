import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Friend from './Friend';
import styles from './FriendList.module.scss';



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
  const { loggedUser } = useContext<any>(AuthContext);
  const [friendsData, setFriendsData] = useState<any>([]);

  useEffect(()=>{
    console.log(loggedUser)
    const getFriendsData = async ()=>{
      if(loggedUser){
        const friends: any = await axios.get(`http://localhost:5000/api/users/${loggedUser?._id}/friends`)
        friends.data.map(async (id: string)=>{
            const data = await axios.get(`http://localhost:5000/api/users/${id}`);
            setFriendsData([...friendsData, data.data]);
        })
      }
    }
    getFriendsData();
  },[loggedUser])

  return (
      <div className={styles.friendListContainer}>
        <div className={styles.border}/>
        <div className={styles.friendGrid}>
        <h2>Friends</h2>
            {
              friendsData.map(({_id, name, lastname, profilePic, status}: any, index: number)=>(
                <Friend 
                id={_id} 
                name={name} 
                lastname={lastname} 
                image={profilePic}
                status={status}
                key={index}
                />
              ))
            }
        </div>
      </div>
  );
}
