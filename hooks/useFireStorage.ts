import React, { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../config/firebase.config';
import { imageResizer } from '../components/assets/imageResizer';

export const useFireStorage = (user: any, title?: string) => {
    const [file, setFile] = useState<any>(null),
        [error, setError] = useState(''),
        [progress, setProgress] = useState(0),
        [uploadError, setUploadError] = useState(null),
        [url, setUrl] = useState(''),
        [isLoading, setIsLoading] = useState(false);

    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleChange = (e: any) => {
        let selectedFile = e.target.files[0];

        if (selectedFile && imageTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            setFile(null);
            setError('Please select an image file! [png, jpg, jpeg]');
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) return;
        setIsLoading(true);
        const resizedImage: any = await imageResizer(file, 720, 900);
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

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
                    createdAt,
                    user: {
                        username: user.username,
                        profilePic: user.profilePic,
                        name: `${user.name} ${user.lastname}`
                    },
                    likes: 0,
                    title: title
                });
                setUrl(url);
                setIsLoading(false);
                setFile(null);
            }
        );
    };

    return {
        handleChange,
        handleSubmit,
        progress,
        url,
        error,
        file,
        setFile,
        isLoading
    };
};
