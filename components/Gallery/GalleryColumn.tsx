import React, { MutableRefObject, useRef } from 'react'
import { useContext } from 'react';
import { MdInsertPhoto, MdFileUpload } from 'react-icons/md';
import AuthContext from '../../context/AuthContext';
import { useFireStorage } from '../../hooks/useFireStorage'
import ImagePreview from './ImagePreview';
import ProgressBar from './ProgressBar';
import styles from './GalleryColumn.module.scss'

export default function GalleryColumn() {
    const { loggedUser } = useContext<any>(AuthContext);

    const {handleChange, file, handleSubmit, error, url, progress, isLoading, setFile} = 
          useFireStorage(loggedUser);

    return (
        <div className={styles.galleryColumnContainer}>
            <div className={styles.uploadForm}>
                <form onSubmit={handleSubmit}>
                    <h3>Upload Image</h3>
                    <input type="file" onChange={handleChange} accept="image/*" name="file" id="file"/>
                    <label htmlFor="file"><span><MdInsertPhoto/></span>Choose a photo</label>
                    {error &&  <div className={styles.error}>
                        <span>{error}</span>
                    </div>}
                    {file && <div className="file">
                        <span>{file.name}</span>
                    </div>}
                    <div className={styles.imagePreview}>
                        <ImagePreview file={file}/>
                    </div>
                    <button type="submit"><span><MdFileUpload/></span>Upload</button>
                    { isLoading &&
                      <ProgressBar url={url} progress={progress}/>
                    }
                </form>
            </div>
        </div>
    )
}
