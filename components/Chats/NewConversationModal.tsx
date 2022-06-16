import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import styles from './NewConversationModal.module.scss';

interface Props {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    loggedUser: any;
    getChats: () => Promise<void>;
}

export default function NewConversationModal({ setIsModalOpen, loggedUser, getChats }: Props) {
    const [allUsers, setAllUsers] = useState<any>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const users = await axios.get('http://localhost:5000/api/users/get/all');
            setAllUsers([...users.data]);
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleClick = async (id: number) => {
        await axios.post('http://localhost:5000/api/chats', {
            senderId: loggedUser._id,
            receiverId: id
        });
        getChats();
        setIsModalOpen(false);
    };

    const keys = ['name', 'lastname', 'username'];

    const search = () => {
        return allUsers.filter((user: any) =>
            keys.some(key =>
                user._id !== loggedUser._id
                    ? user[key].includes(query !== loggedUser && query) ||
                      user[key].toLowerCase().includes(query !== loggedUser && query) ||
                      user[key].toUpperCase().includes(query !== loggedUser && query)
                    : null
            )
        );
    };

    return (
        <div className={styles.newConversationContainer}>
            <div className={styles.modal}>
                <button className={styles.close} onClick={() => setIsModalOpen(false)}>
                    <CgClose />
                </button>
                <h3>New Conversation</h3>
                <div className={styles.inputSearch}>
                    <span>
                        <AiOutlineSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search People"
                        value={query}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.people}>
                    {allUsers &&
                        search().map(({ profilePic, name, lastname, username, _id }: any) => (
                            <div className={styles.user} onClick={() => handleClick(_id)} key={_id}>
                                <div className={styles.content}>
                                    <div className={styles.image}>
                                        <img src={profilePic || 'noProfile.png'} alt={name} />
                                        <div className={styles.status} />
                                    </div>
                                    <div className={styles.info}>
                                        <h4
                                            className={
                                                styles.friendName
                                            }>{`${name} ${lastname}`}</h4>
                                        <p>@{username}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
