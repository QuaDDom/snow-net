import React, { useContext, useEffect, useRef, useState } from 'react';
import MessageList from './MessageList';
import styles from '../../styles/messages.module.scss';
import { AiOutlineGif, AiOutlineSend } from 'react-icons/ai';
import { BiHappy } from 'react-icons/bi';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { io } from 'socket.io-client';

const initialBg =
    'https://images.pexels.com/photos/2519484/pexels-photo-2519484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

export default function MessagesComponent() {
    const [background, setBackground] = useState(initialBg);
    const [conversations, setConversations] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const socket = useRef<any>(null);
    const { loggedUser } = useContext<any>(AuthContext);

    useEffect(() => {
        socket.current = io('ws://localhost:8080');
    }, []);

    useEffect(() => {
        if (loggedUser?._id) {
            socket.current.emit('addUser', loggedUser._id);
            socket.current.on('getUsers', (users: any) => {
                users;
            });
        }
    }, [loggedUser?._id]);

    const getChats = async () => {
        try {
            if (loggedUser) {
                const res = await axios.get(
                    `https://snow-net.herokuapp.com/api/chats/${loggedUser._id}`
                );
                setConversations([...res.data]);
                res;
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getChats();
    }, [loggedUser?._id]);

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.containerImp}>
                <div
                    className={styles.background}
                    style={{
                        background: `url(${background})`,
                        backgroundSize: 'cover'
                    }}
                />
                <MessageList
                    conversations={conversations}
                    loggedUser={loggedUser}
                    setCurrentChat={setCurrentChat}
                    currentChat={currentChat}
                    socket={socket}
                    getChats={getChats}
                />
            </div>
        </div>
    );
}
