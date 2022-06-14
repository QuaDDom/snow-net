import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineGif, AiOutlineSend } from 'react-icons/ai';
import { BiHappy, BiImageAlt } from 'react-icons/bi';
import styles from '../../styles/messages.module.scss';
import EmojiPicker from '../Pickers/EmojiPicker';
import { projectStorage, projectFirestore, timestamp } from '../../config/firebase.config';
import GIFSearcher from '../Pickers/GIFSearcher';
import ImagePreview from '../Gallery/ImagePreview';

interface Props {
    loggedUser: any;
    chatId: any;
    getAllMessages: () => Promise<void>;
    socket: React.MutableRefObject<any>;
    receiverId: any;
    setGif: React.Dispatch<React.SetStateAction<string>>;
    gif: string;
}

export default function InputBar({
    loggedUser,
    chatId,
    getAllMessages,
    socket,
    receiverId,
    setGif,
    gif
}: Props) {
    const [gifOpen, setGifOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleFileChange = (e: any) => {
        let selectedFile = e.target.files[0];

        if (selectedFile && imageTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            setFile(null);
            setError('Please select an image file! [png, jpg, jpeg]');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.length <= 0) return;
        setIsLoading(true);
        if (file) {
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection('chatImages');

            storageRef.put(file).on(
                'state_changed',
                (snap: any) => {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                    setProgress(percentage);
                },
                (err: any) => {
                    setUploadError(err);
                    console.log(err);
                },
                async () => {
                    const url = await storageRef.getDownloadURL();
                    const createdAt = timestamp();
                    collectionRef.add({
                        url,
                        createdAt,
                        user: {
                            username: loggedUser.username,
                            profilePic: loggedUser.profilePic,
                            name: `${loggedUser.name} ${loggedUser.lastname}`
                        }
                    });

                    const sendMessage = async () => {
                        await axios.post('http://localhost:5000/api/messages', {
                            sender: loggedUser._id,
                            text: message,
                            chatId: chatId,
                            image: url
                        });

                        socket.current.emit('sendMessage', {
                            senderId: loggedUser._id,
                            receiverId,
                            text: message,
                            image: url
                        });
                    };

                    sendMessage();
                    setUrl(url);
                    setIsLoading(false);
                    setFile(null);
                    getAllMessages();
                    setMessage('');
                }
            );
        } else if (gif) {
            const messageToFetch = {
                sender: loggedUser._id,
                text: message,
                chatId: chatId,
                image: gif
            };

            socket.current.emit('sendMessage', {
                senderId: loggedUser._id,
                receiverId,
                text: message,
                image: gif
            });

            await axios.post('http://localhost:5000/api/messages', messageToFetch);
            getAllMessages();
            setGif('');
            setMessage('');
        } else {
            const messageToFetch = {
                sender: loggedUser._id,
                text: message,
                chatId: chatId
            };

            socket.current.emit('sendMessage', {
                senderId: loggedUser._id,
                receiverId,
                text: message
            });

            await axios.post('http://localhost:5000/api/messages', messageToFetch);
            getAllMessages();
            setMessage('');
        }
    };

    const handleGifButton = () => (gifOpen ? setGifOpen(false) : setGifOpen(true));
    const handleEmojiPickerButton = () => (pickerOpen ? setPickerOpen(false) : setPickerOpen(true));

    return (
        <div className={styles.messages}>
            <div className={styles.msgInput}>
                <div className={styles.inputContainer}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className={styles.messageInput}
                            value={message}
                            onChange={handleChange}
                        />
                        {/* <button type='submit'><p><AiOutlineSend/></p></button> */}
                    </form>
                </div>
                <div className={styles.options}>
                    <div className={`${styles.currentImage} ${gif || file ? styles.open : ''}`}>
                        <div className={styles.imagePreview}>
                            {file && <ImagePreview file={file} />}
                            {gif && <ImagePreview gif={gif} />}
                        </div>
                    </div>
                    <div className={`${styles.emojiPicker} ${pickerOpen && styles.open}`}>
                        <EmojiPicker
                            setMessage={setMessage}
                            message={message}
                            setPickerOpen={setPickerOpen}
                            pickerOpen={pickerOpen}
                            isTop={false}
                        />
                    </div>
                    <div className={`${styles.gifSearch} ${gifOpen && styles.open}`}>
                        <GIFSearcher
                            setGif={setGif}
                            setGifOpen={setGifOpen}
                            gifOpen={gifOpen}
                            isTop={false}
                        />
                    </div>
                    <p onClick={handleEmojiPickerButton} className={styles.button}>
                        <BiHappy />
                    </p>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className={styles.inputFile}
                        onChange={handleFileChange}
                    />
                    <label className={styles.button} htmlFor="file">
                        <BiImageAlt />
                    </label>
                    <p onClick={handleGifButton} className={styles.button}>
                        <AiOutlineGif />
                    </p>
                </div>
            </div>
        </div>
    );
}
