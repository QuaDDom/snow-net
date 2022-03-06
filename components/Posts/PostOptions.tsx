import React, { useState } from 'react';
import styles from './PostOptions.module.scss';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { BiRepost, BiComment } from 'react-icons/bi';
import axios from 'axios';

interface Props{
   userId: string,
   likes: any,
   _id: string,
   fetchData: () => Promise<void>,
   loggedUser: any,
   image: string,
   text: string,
   createdAt: any,
   repostedBy: any,
   setShowComments: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PostOptions({userId, likes, _id,
    fetchData, loggedUser, text, image, repostedBy, setShowComments}: Props) {

   const handleLike = async ()=>{
      await axios.put(`http://localhost:5000/api/posts/${_id}/like`, {userId: loggedUser._id});
      fetchData();
   }   

   const handleRepost = async ()=>{
      try{
         await axios.post('http://localhost:5000/api/posts/repost', {
            userId: loggedUser._id,
            text,
            image,
            reposted: true,
            repostedPost: _id,
            likes,
            repostedBy,
            postId: _id
         }); 
         fetchData();
      } catch(err){
         console.log(err);
      }
   }

   return (
         <div className={styles.postOptionsContainer}>
         <div className={styles.comments}>
               <span onClick={()=> setShowComments(true)}><BiComment/></span>
               <p>0</p>
         </div>
            <div className={styles.repost} onClick={handleRepost}>
               <span className={repostedBy.includes(loggedUser._id) && styles.reposted}><BiRepost/></span>
               <p className={repostedBy.includes(loggedUser._id) && styles.reposted}>{repostedBy.length}</p>
            </div>
            <div className={styles.likes}>
               {likes.includes(loggedUser._id)
               ? <span className={styles.isLiked}><HiHeart onClick={handleLike}/></span> 
               : <span><HiOutlineHeart onClick={handleLike}/></span>}
               <p className={`${likes.includes(loggedUser._id) && styles.liked}`}>{likes.length}</p>
            </div>
         </div>
   );
}
