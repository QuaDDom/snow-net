import axios from 'axios';
import React, { MutableRefObject, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BiHappy, BiImageAlt } from 'react-icons/bi';
import EmojiPicker from './EmojiPicker';
import ImagePreview from './Gallery/ImagePreview';
import GIFSearcher from './GIFSearcher';
import styles from './ToPost.module.scss'
import { projectStorage, projectFirestore, timestamp } from "../config/firebase.config";
import { useDragDrop } from '../hooks/useDragDrop';


interface Props{
    userData: any,
    fetchData: () => Promise<void>
}

export default function ToPost({userData, fetchData}: Props) {
    const [text, setText] = useState('');
    const [gifOpen, setGifOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const { isOver } = useDragDrop({setFile, containerRef})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }

    const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

    const handleFileChange = (e: any)=>{
        let selectedFile = e.target.files[0];

        if(selectedFile && imageTypes.includes(selectedFile.type)){
            setFile(selectedFile);
        } else{
            setFile(null);
            setError('Please select an image file! [png, jpg, jpeg]');
        }
    }

    const handleGifButton = ()=> gifOpen ? setGifOpen(false) : setGifOpen(true);
    const handleEmojiPickerButton = ()=> pickerOpen ? setPickerOpen(false) : setPickerOpen(true);
    
    const onSubmit = (e: any)=>{
        e.preventDefault();
        setIsLoading(true);
        if(file){            
            const storageRef = projectStorage.ref(file.name); 
            const collectionRef = projectFirestore.collection('postImages');
            
            storageRef.put(file).on("state_changed", (snap: any)=>{
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            }, (err: any)=>{
                setUploadError(err);
                console.log(err);
            }, async ()=>{
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp();
                collectionRef.add({
                    url,
                    user: {
                        username: userData.username,
                        name: `${userData.name} ${userData.lastname}`
                    }
                })
                
                const post = async ()=>{
                    await axios.post('http://localhost:5000/api/posts', {
                        userId: userData._id,
                        text,
                        image: url
                    })
                    setText('');
                    fetchData();
                }
        
                post();
                setUrl(url);
                setIsLoading(false);
                setFile(null);
            });
        } else{
            const post = async ()=>{
                await axios.post('http://localhost:5000/api/posts', {
                    userId: userData._id,
                    text,
                })
                setText('');
                fetchData();
            }
            post();
        }

    }

    return (
        <>
        { userData && <div className={styles.publicContainer} style={file && {paddingBottom: "70px"}}>
            <div className={styles.inputContainer} style={ file && {padding: "30px 0"}}>
                <div className={styles.image}>
                    <img src={userData.profilePic || 'noProfile.png'} alt="profilepic" />
                </div>
                <div ref={containerRef} className={`${styles.input} ${isOver && styles.over || ''}`}>
                    <input 
                    type="text" 
                    name="public" 
                    placeholder={`What's happening ${userData.name}?`}
                    value={text}
                    onChange={handleChange}
                    />
                    <input 
                    type="file" 
                    name="inputFile" 
                    id="inputFile" 
                    className={styles.fileInput}
                    />
                </div>
            </div>
            { file && <div className={styles.imagePreview}>
                 <ImagePreview file={file}/>
            </div>}
            <div className={styles.options}>
                <div className={`${styles.emojiPicker} ${pickerOpen && styles.open}`}>
                    {pickerOpen && <EmojiPicker setMessage={setText} message={text}/>}
                </div>
                <div className={`${styles.gifSearch} ${gifOpen && styles.open}`}>
                    {gifOpen && <GIFSearcher/>}
                </div>
                <div className={styles.buttons}>
                    <p onClick={handleEmojiPickerButton} className={styles.button}><BiHappy/></p> 
                    <p onClick={handleGifButton} className={styles.button}><AiOutlineGif/></p> 
                    <input type="file" name="file" id="file" onChange={handleFileChange}/>
                    <label htmlFor="file" className={styles.button}><BiImageAlt/></label>
                </div>
                <button className={styles.post} onClick={onSubmit}>Post</button>
            </div>
        </div>}
        </>
    );
}
