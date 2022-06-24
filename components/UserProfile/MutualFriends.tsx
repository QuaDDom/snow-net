import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './MutualFriends.module.scss';

const friendTest = [
    {
        profilePic:
            'https://64.media.tumblr.com/bf6d23a043cdaed72255a1b2618d6f68/5acc2aa945774f0b-0e/s540x810/df05b83f7d5a36d5b56173c1ce3fcbdb877048e3.png',
        name: 'Quaddom Developer'
    },
    {
        profilePic:
            'https://64.media.tumblr.com/bf6d23a043cdaed72255a1b2618d6f68/5acc2aa945774f0b-0e/s540x810/df05b83f7d5a36d5b56173c1ce3fcbdb877048e3.png',
        name: 'Quaddom Developer'
    }
];

export default function MutualFriends({ friends }: any) {
    const [friendsData, setFriendsData] = useState<any>([]);

    useEffect(() => {
        const getFriendsData = async () => {
            const userFriends: any = [];
            friends.map(async (id: string) => {
                const fetchFriendData = async () => {
                    const data = await axios.get(`https://snow-net.herokuapp.com/api/users/${id}`);
                    userFriends.push(data.data);
                    setFriendsData([...userFriends]);
                };
                fetchFriendData();
            });
        };
        getFriendsData();
    }, [friends]);

    return (
        <div className={styles.friends}>
            <h4>Friends</h4>
            <p></p>
            <div className={styles.grid}>
                {friendsData.map(({ profilePic, name, username, _id }: any, index: number) => (
                    <div
                        className={styles.friend}
                        onClick={() => Router.push(`${username}`, undefined, { shallow: true })}
                        key={_id}>
                        <img src={profilePic} />
                        <h6>{name}</h6>
                    </div>
                ))}
            </div>
        </div>
    );
}
