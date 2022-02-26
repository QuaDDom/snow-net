import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useGiphy } from '../hooks/useGiphy';
import styles from './GIFSearcher.module.scss';
import { BiSearch } from 'react-icons/bi';

interface Gif{
  url: string,
  title: string,
  images: any
}

export default function GIFSearcher() {

  const {giphy, handleSubmit, handleChange, search, isLoading} = useGiphy();
  console.log(isLoading)
  return (
      <div className={styles.gifContainer}>
          <div className={styles.inputContainer}>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Search a gif...' 
                onChange={handleChange}
                value={search}
                 />
                <button><BiSearch/></button>
            </form>
          </div>
            <div className={styles.gifsContainer}>
            { isLoading
             ? <div className={styles.loaderContainer}>
                  <div className={styles.loader}>  
                    <span></span>
                  </div>
               </div>
             : <div className={styles.grid}>
                {
                giphy && giphy.length >= 1 && giphy.map(({url, title, images}: Gif)=>(
                  <div className={styles.gif} key={url + title}>
                    <img src={images.fixed_height.url} alt={title} />
                  </div>
                ))
                }
                {
                  giphy && giphy.length <= 0 && 
                  <div className={styles.error}>
                    <p>No gifs found</p>
                  </div>
                }
              </div>
              }
            </div>
      </div>
  );
}
