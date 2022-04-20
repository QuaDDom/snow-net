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
import { useMediaQuery } from 'react-responsive';

export default function all() {
    const {data, isLoading} = useFirestore('images');
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const [query, setQuery] = useState('');

    const keys = ["title"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value)
    }
    
    const search = ()=>{
        return(
            data.filter(
                (image: any)=> 
                    image.title.includes(query) ||
                    image.title.toLowerCase().includes(query) ||
                    image.title.toUpperCase().includes(query) 
            ) 
        )
    }

    return (
        <Layout title="Gallery - Snow">
            <div className={styles.galleryContainer}>
                <AuthProvider>
                {isResponsive && <GalleryColumn/>}
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <span><AiOutlineSearch/></span>
                        <input type="text" placeholder='Search images' value={query} onChange={handleChange}/>
                    </div>
                </div>
                    { isLoading ? <Loader/> : <div className={styles.masonry}>
                        {!query ? data.map((col: any)=>(
                                <GalleryImage img={col.url} key={col.id} user={col.user}/>
                        )) : search().map((col: any)=>(
                            <GalleryImage img={col.url} key={col.id} user={col.user}/>
                    ))}
                    </div>}
                </AuthProvider>
            </div>
        </Layout>
    )
}
