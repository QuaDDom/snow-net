import React, { useState } from 'react'
import Layout from '../../components/Layout';
import styles from '../../styles/gallery_all.module.scss';
import { useEffect } from 'react';
import GalleryImage from '../../components/Gallery/GalleryImage';
import { AiOutlineSearch } from 'react-icons/ai';
import GalleryColumn from '../../components/Gallery/GalleryColumn';
import { AuthProvider } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Loader from '../../components/Gallery/Loader';

export default function all() {

    const {data, isLoading} = useFirestore('images');
    console.log(data);
    return (
        <Layout title="Gallery - Snow">
            <div className={styles.galleryContainer}>
                <AuthProvider>
                <GalleryColumn/>
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <span><AiOutlineSearch/></span>
                        <input type="text" placeholder='Search images'/>
                    </div>
                </div>
                    { isLoading ? <Loader/> : <div className={styles.masonry}>
                        {data.map((col: any)=>(
                                <GalleryImage img={col.url} key={col.id} user={col.user}/>
                        ))}
                    </div>}
                </AuthProvider>
            </div>
        </Layout>
    )
}
