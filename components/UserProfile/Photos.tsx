import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdOutlineNoPhotography } from 'react-icons/md';
import styles from './Photos.module.scss';

const testPhotos = ['https://images.pexels.com/photos/45204/alm-friuli-snow-snowfall-45204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/45204/alm-friuli-snow-snowfall-45204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/45204/alm-friuli-snow-snowfall-45204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260,', 'https://images.pexels.com/photos/45204/alm-friuli-snow-snowfall-45204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','https://images.pexels.com/photos/45204/alm-friuli-snow-snowfall-45204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/45204/alm-friuli-snow-snowfall-45204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'];

interface Props{
  userData: any
}

export default function Photos({ userData }: Props) {
  const [dataImage, setDataImage] = useState([]);

  useEffect(()=>{
    if(userData.posts){
      setDataImage(userData.posts.filter((post: any) => post.image).reverse().slice(0,6));
    } else{
      setDataImage(userData.filter((post: any) => post.image).reverse().slice(0,6));
    }
    console.log(dataImage)
  },[userData])

  return (
    <div className={styles.photos}>
        <h4>Photos</h4>
        <div className={styles.grid}>
            {
               dataImage.map(({image}: any)=>(
                    <img src={image}/>
                ))
            }
        </div>
        {
          dataImage.length < 1 &&
          <div className={styles.noPhotos}>
            <span><MdOutlineNoPhotography/></span>
            <p>This profile has no photos yet</p>
          </div>
        }
    </div>
  )
}
