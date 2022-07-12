import axios from 'axios';
import React, { MutableRefObject, useRef, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineGif } from 'react-icons/ai';
import { BiHappy, BiImageAlt, BiPoll } from 'react-icons/bi';
import { projectFirestore, projectStorage, timestamp } from '../../../config/firebase.config';
import { useDragDrop } from '../../../hooks/useDragDrop';
import { imageResizer } from '../../assets/imageResizer';
import styles from './NewPostModal.module.scss';

interface Props {
    loggedUser: any;
    fetchData: () => Promise<void>;
    group?: object;
}

export default function NewPostModal({ loggedUser, fetchData, group }: Props) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (group) {
            const post = async () => {
                if (gif) {
                    const post = async () => {
                        await axios.post('https://snow-net.herokuapp.com/api/posts', {
                            userId: loggedUser._id,
                            text,
                            image: gif,
                            isGroupPost: true,
                            groupData: group
                        });

                        setGif('');
                    };
                    post();
                } else if (file) {
                    const resizedImage: any = await imageResizer(file);
                    resizedImage;
                    const storageRef = projectStorage.ref(`SnowImg-${uuidv4()}`);
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
                                    username: loggedUser.username,
                                    name: `${loggedUser.name} ${loggedUser.lastname}`
                                }
                            });

                            const post = async () => {
                                await axios.post('https://snow-net.herokuapp.com/api/posts', {
                                    userId: loggedUser._id,
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
                            await axios.post('https://snow-net.herokuapp.com/api/posts', {
                                userId: loggedUser._id,
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
        } else if (file) {
            const resizedImage: any = await imageResizer(file);
            resizedImage;
            const storageRef = projectStorage.ref(`SnowImg-${uuidv4()}`);
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
                            username: loggedUser.username,
                            name: `${loggedUser.name} ${loggedUser.lastname}`
                        }
                    });

                    const post = async () => {
                        await axios.post('https://snow-net.herokuapp.com/api/posts', {
                            userId: loggedUser._id,
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
                await axios.post('https://snow-net.herokuapp.com/api/posts', {
                    userId: loggedUser._id,
                    text,
                    image: gif
                });
                setText('');
                setGif('');
                fetchData();
            };
            post();
        } else if (poll) {
            const post = async () => {
                await axios.post('https://snow-net.herokuapp.com/api/posts', {
                    userId: loggedUser._id,
                    text,
                    poll
                });
                setText('');
                fetchData();
            };
            post();
        } else {
            const post = async () => {
                const postData = await axios.post('https://snow-net.herokuapp.com/api/posts', {
                    userId: loggedUser._id,
                    text
                });
                setText('');
                fetchData();
            };
            post();
        }
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

    return (
        <div className={styles.newPostModal}>
            <div className={styles.bar}>
                <button className={styles.back}>
                    <AiOutlineArrowLeft />
                </button>
                <button className={styles.post}>Post</button>
            </div>
            <div className={styles.modal}>
                <div className={styles.space}>
                    <div className={styles.user}>
                        <img src={loggedUser.profilePic} alt={loggedUser.username} />
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder={`What's happening ${loggedUser.name}?`} />
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.buttons}>
                        <p onClick={() => {}} className={styles.button}>
                            <BiHappy />
                        </p>
                        <p onClick={() => {}} className={styles.button}>
                            <AiOutlineGif />
                        </p>
                        <input type="file" name="file" id="file" onChange={() => {}} />
                        <label htmlFor="file" className={styles.button}>
                            <BiImageAlt />
                        </label>
                        <p onClick={() => {}} className={styles.button}>
                            <BiPoll />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
