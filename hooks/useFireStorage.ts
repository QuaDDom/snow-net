import React, { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../config/firebase.config";

export const useFireStorage = (user: any)=>{
    const [file, setFile] = useState<any>(null),
          [error, setError] = useState(''),
          [progress, setProgress] = useState(0),
          [uploadError, setUploadError] = useState(null),
          [url, setUrl] = useState(''),
          [isLoading, setIsLoading] = useState(false);
    
    const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

    const handleChange = (e: any)=>{
        let selectedFile = e.target.files[0];

        if(selectedFile && imageTypes.includes(selectedFile.type)){
            setFile(selectedFile);
        } else{
            setFile(null);
            setError('Please select an image file! [png, jpg, jpeg]');
        }
    }

    const handleSubmit = (e: any)=>{
        e.preventDefault();
        setIsLoading(true);
        const storageRef = projectStorage.ref(file.name); 
        const collectionRef = projectFirestore.collection('images');

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
                createdAt,
                user: {
                    username: user.username,
                    profilePic: user.profilePic,
                    name: `${user.name} ${user.lastname}`
                }
            })
            setUrl(url);
            setIsLoading(false);
            setFile(null);
        });
    }


    return {
        handleChange,
        handleSubmit,
        progress,
        url,
        error,
        file,
        setFile,
        isLoading
    }

}