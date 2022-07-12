import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RiEmotionSadFill } from 'react-icons/ri';
import AuthContext from '../../context/AuthContext';
import Friend from './Friend';
import styles from './FriendList.module.scss';

export default function FriendList() {
    const { loggedUser } = useContext<any>(AuthContext);
    const [friendsData, setFriendsData] = useState<any>([]);

    useEffect(() => {
        const getFriendsData = async () => {
            if (loggedUser) {
                const userFriends: any = [];
                const friends: any = await axios.get(
                    `https://snow-net.herokuapp.com/api/users/${loggedUser?._id}/friends`
                );
                friends.data.map((id: string) => {
                    const fetchFriendData = async () => {
                        const data = await axios.get(
                            `https://snow-net.herokuapp.com/api/users/${id}`
                        );
                        userFriends.push(data.data);
                        setFriendsData([...userFriends]);
                    };
                    fetchFriendData();
                });
            }
        };
        getFriendsData();
    }, [loggedUser]);

    useEffect(() => console.log(friendsData), [friendsData]);

    return (
        <div className={styles.friendListContainer}>
            <div className={styles.border} />
            <div className={styles.friendGrid}>
                <h2>Friends</h2>
                <div className={styles.friends}>
                    {friendsData ? (
                        friendsData.map(
                            (
                                { _id, name, lastname, profilePic, status, username }: any,
                                index: number
                            ) => (
                                <Friend
                                    id={_id}
                                    name={name}
                                    lastname={lastname}
                                    image={profilePic}
                                    status={status}
                                    key={index}
                                    username={username}
                                />
                            )
                        )
                    ) : (
                        <div className={styles.noFriends}>
                            <span>
                                <RiEmotionSadFill />
                            </span>
                            <p>{"You don't have friends yet"}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
