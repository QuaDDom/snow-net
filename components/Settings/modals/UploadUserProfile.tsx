import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import ImagePreview from '../../Gallery/ImagePreview';
import styles from './Modals.module.scss';

interface Props{
    type?: string,
    value: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    userId: string,
    setText?: any
}

  
export default function UploadUserProfile({type, value, setIsOpen, title, userId, setText}: Props) {
    const [file, setFile] = useState<any>(null);
    const [preview, setPreview] = useState('')
    
    const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

    const updateProfile = ()=> {};

    useEffect(()=>{
      if(file){
          const reader = new FileReader();
          reader.onloadend = () =>{
              setPreview(reader.result as string)
          };
          reader.readAsDataURL(file);
      }
    },[file])

    const handleFileChange = (e: any)=>{
        let selectedFile = e.target.files[0];

        if(selectedFile && imageTypes.includes(selectedFile.type)){
            setFile(selectedFile);
        } else{
            setFile(null);
        }
    }
    return (
        <div className={styles.modalContainer}>
            {/* <div className={"closeOverlay"} onClick={()=> setIsOpen(false)}/> */}
            <div className={styles.modal}>
                <h4 className={styles.title}>{title}</h4>
                <div className={styles.uploadPhoto}>
                  <input type="file" onChange={handleFileChange}/>
                  <span><AiOutlineCamera/></span>
                  <div className={styles.imagePreview}>
                    {preview &&  <img src={preview} alt="" />}
                  </div>
                </div>
                <div className={styles.buttons}>
                <button className={styles.save} onClick={updateProfile}>Save</button>
                <button className={styles.cancel} onClick={()=> setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
