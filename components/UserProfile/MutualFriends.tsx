import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styles from './MutualFriends.module.scss';
import Image from 'next/image';

const friendTest = [
    {
        profilePic: "https://64.media.tumblr.com/bf6d23a043cdaed72255a1b2618d6f68/5acc2aa945774f0b-0e/s540x810/df05b83f7d5a36d5b56173c1ce3fcbdb877048e3.png",
        name: "Quaddom Developer"
    },
    {
        profilePic: "https://64.media.tumblr.com/bf6d23a043cdaed72255a1b2618d6f68/5acc2aa945774f0b-0e/s540x810/df05b83f7d5a36d5b56173c1ce3fcbdb877048e3.png",
        name: "Quaddom Developer"
    }
]

export default function MutualFriends({friends}: any) {
    const [friendsData, setFriendsData] = useState<any>([]);

    useEffect(()=>{
        const getFriendsData = async ()=>{
            friends.map(async (id: string)=>{
                const data = await axios.get(`http://localhost:5000/api/users/${id}`);
                setFriendsData([...friendsData, data.data])
            })
        }
        getFriendsData();
    },[friends])

    return (
        <div className={styles.friends}>
            <h4>Friends</h4>
            <p></p>
            <div className={styles.grid}>
                {
                    friendsData.map(({profilePic, name, username, _id}: any, index:number)=>(
                        <div className={styles.friend} onClick={()=> Router.push(`${username}`, undefined, {shallow: true})} key={_id}>
                            <Image src={profilePic}/>
                            <h6>{name}</h6>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
