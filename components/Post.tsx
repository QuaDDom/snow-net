import Router from 'next/router';
import React, { useState } from 'react';
import { useGetUser } from '../hooks/useGetUser';
import OpenImage from './OpenImage';
import styles from './Post.module.scss';
import PostOptions from './PostOptions';
import PostDots from './Posts/PostDots';
import { format } from 'timeago.js';

interface Props{
  _id: string
  hour?: {
    number: string,
    type: string
  },
  text: string,
  image: string,
  userId: string,
  likes: [],
  fetchData: () => Promise<void>,
  loggedUser: any,
  createdAt: any
}

interface User{
  email: string,
  username: string,
  name: string,
  lastname: string,
  profilePic: string,
}

export default function Post({_id, image, text, userId, likes, fetchData, loggedUser, createdAt}: Props) {
  const [openImage, setOpenImage] = useState(false);
  const user: User = useGetUser(userId);

  const handleClick = ()=> setOpenImage(true);

  const handleImageClick = ()=>{
    Router.push('user/' + user.username);
  }

  return (
    <>
    {user && loggedUser &&  <div className={styles.postContainer}>
        <div className={styles.user}>
          <img src={user.profilePic || 'noProfile.png'} alt={user.name} onClick={handleImageClick}/>
          <div className={styles.bothColumn}>
            <h5>{`${user.name} ${user.lastname}`}</h5>
            <p>{`@${user.username}`}</p>
            <p>·</p>
            <p className={styles.createdAt}>{format(createdAt)}</p>
          </div>
          <PostDots
           username={user.username}
           userId={userId}
           loggedUserId={loggedUser?._id}
           postId={_id}
           fetchData={fetchData}
          />
        </div>
        <div className={styles.post}>
          { text && <p className={styles.text}>{text}</p> }
          { image && <div className={styles.imageContainer}>
            <img src={image} width="100%" onClick={handleClick}/>
          </div>}
        </div>
        <PostOptions userId={userId} likes={likes} _id={_id} fetchData={fetchData}/>
      </div>
      }
      {openImage && <OpenImage 
              img={image} 
              openImage={openImage}
              setOpenImage={setOpenImage}
      />}
    </>
  );
}
