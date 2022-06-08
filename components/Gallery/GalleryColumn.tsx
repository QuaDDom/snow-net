import React, { MutableRefObject, useRef, useState } from 'react';
import { useContext } from 'react';
import { MdInsertPhoto, MdFileUpload } from 'react-icons/md';
import AuthContext from '../../context/AuthContext';
import { useFireStorage } from '../../hooks/useFireStorage';
import ImagePreview from './ImagePreview';
import ProgressBar from './ProgressBar';
import styles from './GalleryColumn.module.scss';
import Input from '../Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { gallerySchema } from '../../validations/GalleryTitleValidation';

export default function GalleryColumn() {
    const [title, setTitle] = useState('');
    const { loggedUser } = useContext<any>(AuthContext);

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(gallerySchema),
        reValidateMode: 'onChange',
        mode: 'onChange'
    });

    const {
        handleChange,
        file,
        handleSubmit,
        error,
        url,
        progress,
        isLoading,
        setFile
    } = useFireStorage(loggedUser, title);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div className={styles.galleryColumnContainer}>
            <div className={styles.uploadForm}>
                <form onSubmit={handleSubmit}>
                    <h3>Upload Image</h3>
                    <input
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                        name="file"
                        id="file"
                    />
                    <label className={styles.label} htmlFor="file">
                        <span>
                            <MdInsertPhoto />
                        </span>
                        Choose a photo
                    </label>
                    {error && (
                        <div className={styles.error}>
                            <span>{error}</span>
                        </div>
                    )}
                    {file && (
                        <div className={styles.inputContainer}>
                            <Input
                                type="text"
                                label="Image Title"
                                name="title"
                                size={{
                                    width: '75%',
                                    height: 55,
                                    fontSize: 16
                                }}
                                value={title}
                                inputRef={register}
                                handleChange={handleTitleChange}
                                error={error}
                            />
                        </div>
                    )}
                    {file && (
                        <div className={styles.imagePreview}>
                            <ImagePreview file={file} setFile={setFile} />
                        </div>
                    )}
                    <button
                        className={`${styles.button} ${file && title && styles.active}`}
                        type="submit">
                        <span>
                            <MdFileUpload />
                        </span>
                        Upload
                    </button>
                    {isLoading && <ProgressBar url={url} progress={progress} />}
                </form>
            </div>
        </div>
    );
}
