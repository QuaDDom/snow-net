import axios from 'axios';
import React, { MutableRefObject, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BiHappy, BiImageAlt, BiPoll } from 'react-icons/bi';
import EmojiPicker from '../Pickers/EmojiPicker';
import ImagePreview from '../Gallery/ImagePreview';
import GIFSearcher from '../Pickers/GIFSearcher';
import styles from './ToPost.module.scss';
import { projectStorage, projectFirestore, timestamp } from '../../config/firebase.config';
import { useDragDrop } from '../../hooks/useDragDrop';
import Router from 'next/router';
import CreatePoll from './CreatePoll';
import ProgressBar from '../Gallery/ProgressBar';
import { imageResizer } from '../assets/imageResizer';

import TextareaAutosize from 'react-textarea-autosize';
import { Oval } from 'react-loader-spinner';

interface Props {
    userData: any;
    fetchData: () => Promise<void>;
    group?: object;
}

export default function ToPost({ userData, fetchData, group }: Props) {
    const [text, setText] = useState('');
    const [gifOpen, setGifOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gif, setGif] = useState('');
    const [pollOpen, setPollOpen] = useState(false);
    const [poll, setPoll] = useState<any>([]);
    const [hashtags, setHashtags] = useState([]);
    const containerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
    const { isOver } = useDragDrop({ setFile, containerRef });
    const [blobImage, setBlobImage] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    const handlePollButton = () => (pollOpen ? setPollOpen(false) : setPollOpen(true));

    const onSubmit = async (e: any) => {
        if (isLoading) return;
        setIsLoading(true);
        e.preventDefault();
        if (!text.trim()) return;
        if (group) {
            const post = async () => {
                if (gif) {
                    const post = async () => {
                        await axios.post('http://localhost:5000/api/posts', {
                            userId: userData._id,
                            text,
                            image: gif,
                            isGroupPost: true,
                            groupData: group
                        });

                        setGif('');
                    };
                    post();
                    setIsLoading(false);
                } else if (file) {
                    const resizedImage: any = await imageResizer(file);
                    resizedImage;
                    const storageRef = projectStorage.ref(file.name);
                    const collectionRef = projectFirestore.collection('postImages');

                    storageRef.put(resizedImage).on(
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
                                await axios.post('http://localhost:5000/api/posts', {
                                    userId: userData._id,
                                    text,
                                    image: url,
                                    isGroupPost: true,
                                    groupData: group
                                });
                                setText('');
                                fetchData();
                            };

                            post();
                            setUrl(url);
                            setIsLoading(false);
                            setFile(null);
                        }
                    );
                } else {
                    try {
                        const post = async () => {
                            await axios.post('http://localhost:5000/api/posts', {
                                userId: userData._id,
                                text,
                                isGroupPost: true,
                                groupData: group
                            });
                        };
                        post();
                    } catch (err) {
                        console.log(err);
                    }
                }
                setText('');
                fetchData();
            };
            post();
            setIsLoading(false);
        } else if (file) {
            const resizedImage: any = await imageResizer(file);
            resizedImage;
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection('postImages');

            storageRef.put(resizedImage).on(
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
                        await axios.post('http://localhost:5000/api/posts', {
                            userId: userData._id,
                            text,
                            image: url
                        });
                        setText('');
                        fetchData();
                    };

                    post();
                    setUrl(url);
                    setIsLoading(false);
                    setFile(null);
                }
            );
        } else if (gif) {
            const post = async () => {
                await axios.post('http://localhost:5000/api/posts', {
                    userId: userData._id,
                    text,
                    image: gif
                });
                setText('');
                setGif('');
                fetchData();
                setIsLoading(false);
            };
            post();
        } else if (poll) {
            const post = async () => {
                await axios.post('http://localhost:5000/api/posts', {
                    userId: userData._id,
                    text,
                    poll
                });
                setText('');
                fetchData();
            };
            post();
            setPoll(null);
            setPollOpen(false);
            setIsLoading(false);
        } else {
            const post = async () => {
                const postData = await axios.post('http://localhost:5000/api/posts', {
                    userId: userData._id,
                    text
                });
                setText('');
                fetchData();
            };
            post();
            setTimeout(() => setIsLoading(false), 200);
        }
    };

    return (
        <>
            {userData && (
                <div
                    className={styles.publicContainer}
                    style={file || gif || pollOpen ? { paddingBottom: '70px' } : {}}>
                    <div
                        className={styles.inputContainer}
                        style={file || gif || pollOpen ? { padding: '30px 0' } : {}}>
                        <div className={styles.image}>
                            <img
                                src={userData.profilePic || 'noProfile.png'}
                                alt="profilepic"
                                onClick={() => Router.push(`/user/${userData.username}`)}
                                layout="fill"
                            />
                        </div>
                        <div
                            ref={containerRef}
                            className={`${styles.input} ${(isOver && styles.over) || ''}`}>
                            <TextareaAutosize
                                name="public"
                                placeholder={`${
                                    pollOpen
                                        ? 'Ask a question'
                                        : "What's happening " + userData.name + '?'
                                }`}
                                value={text}
                                onChange={handleChange}
                                autoComplete="off"
                                minRows={1}
                                maxRows={3}
                            />
                            <input
                                type="file"
                                name="inputFile"
                                id="inputFile"
                                className={styles.fileInput}
                            />
                        </div>
                    </div>
                    {file && (
                        <div className={styles.imagePreview}>
                            <ImagePreview file={file} setFile={setFile} />
                        </div>
                    )}
                    {gif && (
                        <div className={styles.imagePreview}>
                            <ImagePreview gif={gif} setFile={setGif} />
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
                            <p onClick={handlePollButton} className={styles.button}>
                                <BiPoll />
                            </p>
                        </div>
                        <button
                            className={`${styles.post} ${!text.trim() && styles.notAllowed}`}
                            onClick={onSubmit}
                            style={isLoading ? { pointerEvents: 'none' } : {}}>
                            {!isLoading ? (
                                'Post'
                            ) : (
                                <div className={styles.loader}>
                                    <Oval
                                        ariaLabel="loading-profile"
                                        height={28}
                                        width={28}
                                        strokeWidth={15}
                                        strokeWidthSecondary={5}
                                        color="black"
                                        secondaryColor="none"
                                    />
                                </div>
                            )}
                        </button>
                    </div>
                    <div className={styles.createPoll}>
                        <CreatePoll setPoll={setPoll} pollOpen={pollOpen} poll={poll} />
                    </div>
                    {isLoading && <ProgressBar progress={progress} />}
                </div>
            )}
        </>
    );
}
