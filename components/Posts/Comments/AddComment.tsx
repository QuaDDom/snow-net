import axios from 'axios';
import Router from 'next/router';
import React, { MutableRefObject, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BiHappy, BiImageAlt, BiPoll } from 'react-icons/bi';
import { projectFirestore, projectStorage, timestamp } from '../../../config/firebase.config';
import { useDragDrop } from '../../../hooks/useDragDrop';
import EmojiPicker from '../../EmojiPicker';
import ImagePreview from '../../Gallery/ImagePreview';
import GIFSearcher from '../../GIFSearcher';
import styles from './AddComment.module.scss';
import Image from 'next/image';

interface Props {
    userData: any;
    fetchData: () => Promise<void>;
    postId: string;
}

export default function AddComment({ userData, fetchData, postId }: Props) {
    const [text, setText] = useState('');
    const [gifOpen, setGifOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [file, setFile] = useState<any>();
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gif, setGif] = useState('');
    const [pollOpen, setPollOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const { isOver } = useDragDrop({ setFile, containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
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

    const handleGifButton = () => (gifOpen ? setGifOpen(false) : setGifOpen(true));
    const handleEmojiPickerButton = () => (pickerOpen ? setPickerOpen(false) : setPickerOpen(true));
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (!text.trim()) return;
        ('add');
        if (file) {
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection('postCommentsImage');

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
                        user: {
                            username: userData.username,
                            name: `${userData.name} ${userData.lastname}`
                        }
                    });

                    const post = async () => {
                        await axios.put(`http://localhost:5000/api/posts/comment/${postId}`, {
                            text: text.trim(),
                            userId: userData._id,
                            image: url,
                            createdAt
                        });
                    };

                    post();
                    setUrl(url);
                    setIsLoading(false);
                    fetchData();
                    setText('');
                    setFile(null);
                }
            );
        } else if (gif) {
            await axios.put(`http://localhost:5000/api/posts/comment/${postId}`, {
                text,
                userId: userData._id,
                createdAt: Date.now(),
                image: gif
            });
            setText('');
            setGif('');
            fetchData();
        } else {
            await axios.put(`http://localhost:5000/api/posts/comment/${postId}`, {
                text,
                userId: userData._id,
                createdAt: Date.now()
            });
            setText('');
            fetchData();
        }
    };

    return (
        <div
            className={styles.addCommentContainer}
            style={file || gif || pollOpen ? { paddingBottom: '70px' } : {}}>
            <div
                className={styles.inputContainer}
                style={file || gif || pollOpen ? { padding: '30px 0' } : {}}>
                <div className={styles.image}>
                    <img
                        src={userData.profilePic || 'noProfile.png'}
                        alt="profilepic"
                        onClick={() => Router.push(`/user/${userData.username}`)}
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div
                        ref={containerRef}
                        className={`${styles.input} ${(isOver && styles.over) || ''}`}>
                        <input
                            type="text"
                            name="public"
                            autoComplete="off"
                            placeholder={'Add a Comment'}
                            value={text}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onSubmit={onSubmit}
                        />
                        <input
                            type="file"
                            name="inputFile"
                            id="inputFile"
                            className={styles.fileInput}
                        />
                        <div className={styles.buttons}>
                            <p onClick={handleEmojiPickerButton} className={styles.button}>
                                <BiHappy />
                            </p>
                            <p onClick={handleGifButton} className={styles.button}>
                                <AiOutlineGif />
                            </p>
                            <input type="file" name="file" id="file" onChange={handleFileChange} />
                            <label htmlFor="file" className={styles.button}>
                                <BiImageAlt />
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            {file && (
                <div className={styles.imagePreview}>
                    <ImagePreview file={file} />
                </div>
            )}
            {gif && (
                <div className={styles.imagePreview}>
                    <ImagePreview gif={gif} />
                </div>
            )}
            <div className={styles.options}>
                <div className={`${styles.emojiPicker} ${pickerOpen && styles.open}`}>
                    <EmojiPicker
                        setMessage={setText}
                        message={text}
                        setPickerOpen={setPickerOpen}
                        pickerOpen={pickerOpen}
                        isTop={true}
                    />
                </div>
                <div className={`${styles.gifSearch} ${gifOpen && styles.open}`}>
                    <GIFSearcher
                        setGif={setGif}
                        setGifOpen={setGifOpen}
                        gifOpen={gifOpen}
                        isTop={true}
                    />
                </div>
            </div>
        </div>
    );
}
