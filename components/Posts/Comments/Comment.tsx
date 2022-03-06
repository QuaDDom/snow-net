import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react'
import { format } from 'timeago.js';
import { useGetUser } from '../../../hooks/useGetUser';
import styles from './Comment.module.scss';
import CommentDots from './CommentDots';

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
  poll: [string],
  pinned: boolean
}

export default function Comment({_id, image, text, userId, likes, fetchData,
  loggedUser, createdAt, repostedBy, poll, pinned}: Props) {
    const [openImage, setOpenImage] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const user: any = useGetUser(userId);

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
      <div className="commentContainer">
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
          </div>
          <CommentDots
          username={user.username}
          userId={userId}
          loggedUserId={loggedUser?._id}
          postId={_id}
          fetchData={fetchData}
          deletePost={deletePost}
          handleModal={handleModal}
          />
      </div>
    )
}
