import React, { useState } from 'react';
import styles from './PostOptions.module.scss';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { BiRepost, BiComment } from 'react-icons/bi';
import axios from 'axios';

interface Props{
   userId: string,
   likes: [],
   _id: string,
   fetchData: () => Promise<void>
}

export default function PostOptions({userId, likes, _id, fetchData}: Props) {
   const [isLiked, setIsLiked] = useState(false);

   const handleLike = async ()=>{
      await axios.put(`http://localhost:5000/api/posts/${_id}/like`, {userId});
      isLiked ? setIsLiked(false) : setIsLiked(true);
      fetchData();
   }   

   return (
         <div className={styles.postOptionsContainer}>
         <div className={styles.comments}>
               <span><BiComment/></span>
               <p>0</p>
         </div>
            <div className={styles.repost}>
               <span><BiRepost/></span>
               <p>0</p>
            </div>
            <div className={styles.likes}>
               {isLiked 
               ? <span className={styles.isLiked}><HiHeart onClick={handleLike}/></span> 
               : <span><HiOutlineHeart onClick={handleLike}/></span>}
               <p className={`${isLiked && styles.liked}`}>{likes.length}</p>
            </div>
         </div>
   );
}
