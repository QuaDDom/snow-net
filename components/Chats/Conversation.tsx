import axios from 'axios';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ChatInfo from '../ChatInfo';
import styles from './Conversation.module.scss';
import InputBar from './InputBar';
import Message from './Message';
import dateFormat, { masks } from 'dateformat';

const imgTest = 'https://preview.free3d.com/img/2017/12/2212613950170727846/c91eu4no-900.jpg';

interface Props {
    currentChat: any;
    loggedUser: any;
    user: any;
    socket: React.MutableRefObject<any>;
    setCurrentChat: any;
}

export default function Conversation({
    currentChat,
    loggedUser,
    user,
    socket,
    setCurrentChat
}: Props) {
    const [allMessages, setAllMessages] = useState<any>(null);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const [gif, setGif] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const getAllMessages = async () => {
        try {
            if (currentChat) {
                const res = await axios.get(
                    `http://localhost:5000/api/messages/${currentChat._id}`
                );
                setAllMessages(res.data);
                allMessages;
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllMessages();
    }, [currentChat]);

    useEffect(() => {
        socket.current.on('getMessage', (data: any) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setAllMessages((prev: any) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }, [allMessages]);

    return (
        <div className={styles.conversationContainer}>
            <ChatInfo
                name={user.name}
                lastname={user.lastname}
                img={user.profilePic}
                setCurrentChat={setCurrentChat}
            />
            <div className={styles.conversation} ref={scrollRef}>
                {allMessages &&
                    allMessages.map(({ text, createdAt, sender, image }: any, index: number) => (
                        <Message
                            key={index}
                            text={text}
                            received={sender === loggedUser._id ? false : true}
                            createdAt={dateFormat(createdAt, 'HH:MM TT')}
                            image={image}
                        />
                    ))}
            </div>
            <InputBar
                loggedUser={loggedUser}
                receiverId={user._id}
                chatId={currentChat._id}
                getAllMessages={getAllMessages}
                socket={socket}
                setGif={setGif}
                gif={gif}
            />
        </div>
    );
}
