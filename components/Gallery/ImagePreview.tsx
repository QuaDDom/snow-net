import React, { useState } from 'react';
import { useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import styles from './ImagePreview.module.scss';

interface Props {
    file?: any;
    gif?: string;
    setFile?: any;
}

export default function ImagePreview({ file, gif, setFile }: Props) {
    const [preview, setPreview] = useState<string>('');

    const handleClick = () => {
        setFile(null);
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    return (
        <div className={styles.imagePreviewContainer}>
            <div className={styles.closeContainer}>
                <button className={styles.close} onClick={handleClick}>
                    <CgClose />
                </button>
            </div>
            {file && <img src={preview} alt="Image Preview" />}
            {gif && <img src={gif} />}
        </div>
    );
}
