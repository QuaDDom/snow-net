import Router from 'next/router';
import React, { useState } from 'react';
import { useGetUser } from '../../hooks/useGetUser';
import OpenImage from '../OpenImage';
import styles from './Post.module.scss';
import PostOptions from './PostOptions';
import PostDots from '../Posts/PostDots';
import { format } from 'timeago.js';
import ConfirmDelete from '../Posts/ConfirmDelete';
import axios from 'axios';
import Poll from './Poll';

interface Props{
  _id: string
  hour?: {
    number: string,
    type: string
  },
  text: string,
  image: string,
  userId: string,
  likes: any,
  fetchData: () => Promise<void>,
  loggedUser: any,
  createdAt: any,
  repostedBy: any,
  poll: [string]
}

interface User{
  email: string,
  username: string,
  name: string,
  lastname: string,
  profilePic: string,
}

export default function Post({_id, image, text, userId, likes, fetchData,
                              loggedUser, createdAt, repostedBy, poll}: Props) {
  const [openImage, setOpenImage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const user: User = useGetUser(userId);

  const handleClick = ()=> setOpenImage(true);
  const handleModal = ()=> modalOpen ? setModalOpen(false) : setModalOpen(true);

  const handleImageClick = ()=>{
    Router.push('user/' + user.username);
  }

  const deletePost = async ()=>{
      console.log(userId, loggedUser._id)
      await axios.delete(`http://localhost:5000/api/posts/${_id}`, { data:{userId: loggedUser._id} });
      fetchData();
  }

  return (
    <>
    {modalOpen && <ConfirmDelete deletePost={deletePost} setModalOpen={setModalOpen}/>}
    {user && loggedUser &&
      <div className={styles.postContainer}>
        <div className={styles.user}>
          <img src={user.profilePic || 'noProfile.png'} alt={user.name} onClick={handleImageClick}/>
          <div className={styles.bothColumn}>
            <h5 className={user.name || `${styles.skeleton} ${styles.skeletonText}`}>
              {`${user.name} ${user.lastname}`}
            </h5>
            <p className={user.username || `${styles.skeleton} ${styles.skeletonText}`}>
              {user.username && `@${user.username}`}
            </p>
            <p>·</p>
            <p className={styles.createdAt}>{format(createdAt)}</p>
          </div>
          <PostDots
           username={user.username}
           userId={userId}
           loggedUserId={loggedUser?._id}
           postId={_id}
           fetchData={fetchData}
           deletePost={deletePost}
           handleModal={handleModal}
          />
        </div>
        <div className={styles.post}>
          { text && <p className={styles.text}>{text}</p> }
          { image && <div className={styles.imageContainer}>
            <img src={image} width="100%" onClick={handleClick}/>
          </div>}
          {
            poll && <Poll poll={poll} loggedUser={loggedUser} _id={_id}/>
          }
        </div>
        <PostOptions 
        userId={userId} 
        likes={likes} 
        _id={_id} 
        fetchData={fetchData} 
        loggedUser={loggedUser}
        image={image}
        text={text}
        createdAt={createdAt}
        repostedBy={repostedBy}
        />
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
