import React, { useState } from 'react'
import { useEffect } from 'react';
import styles from './ImagePreview.module.scss';

interface Props{
    file: any
}

export default function ImagePreview({file}: Props) {
    const [preview, setPreview] = useState<string>('');

    useEffect(()=>{
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setPreview(reader.result as string)
            };
            reader.readAsDataURL(file);
        }
    },[file])

    return (
        <div className={styles.imagePreviewContainer}>
            {file && <img src={preview} alt="Image Preview" />}
        </div>
    )
}
