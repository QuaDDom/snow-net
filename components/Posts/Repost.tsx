import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetUser } from '../../hooks/useGetUser';
import OpenImage from '../OpenImage';
import styles from './Post.module.scss';
import PostOptions from './PostOptions';
import PostDots from '../Posts/PostDots';
import { format } from 'timeago.js';
import ConfirmDelete from '../Posts/ConfirmDelete';
import axios from 'axios';
import { BiRepost } from 'react-icons/bi';
import Comments from './Comments/Comments';

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
  createdAt: any,
  repostedPost: string,
  repostedBy: any
  poll: [string]
}

interface User{
  email: string,
  username: string,
  name: string,
  lastname: string,
  profilePic: string,
}

export default function Post({_id, image, text, userId, likes, fetchData, loggedUser, createdAt, repostedPost,repostedBy}: Props) {
  const [openImage, setOpenImage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [postUser, setPostUser] = useState<any>(null);
  const [post, setPost] = useState<any>(null)
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any>(null);

  const getComments = async ()=>{
    if(post){
      const commentsData = await axios.get(`http://localhost:5000/api/posts/comments/${post._id}`)
      setComments([...commentsData.data]);
    }
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      const postData = await axios.get(`http://localhost:5000/api/posts/${repostedPost}`);
      const userPost = await axios.get(`http://localhost:5000/api/users/${postData.data.userId}`);
      setPost(postData.data);
      setPostUser(userPost.data);
    }
    fetchData();
  },[])

  useEffect(()=>{
    getComments();
  },[post])

  const user: User = useGetUser(userId);

  const handleClick = ()=> setOpenImage(true);
  const handleModal = ()=> modalOpen ? setModalOpen(false) : setModalOpen(true);

  const handleImageClick = ()=>{
    Router.push('user/' + postUser.username);
  }

  const deletePost = async ()=>{
      console.log(userId, loggedUser._id)
      await axios.delete(`http://localhost:5000/api/posts/${_id}`, { data:{userId: loggedUser._id} });
      fetchData();
  }

  return (
    <>
    {modalOpen && <ConfirmDelete deletePost={deletePost} setModalOpen={setModalOpen}/>}
    {user && postUser && loggedUser &&
      <div className={styles.postContainer}>
        <p className={styles.reposted}><span><BiRepost/></span> {user.name + ' ' + user.lastname} Reposted</p>
        <div className={styles.user}>
          <img src={postUser.profilePic || 'noProfile.png'} alt={postUser.name} onClick={handleImageClick}/>
          <div className={styles.bothColumn}>
            <h5 className={postUser.name || `${styles.skeleton} ${styles.skeletonText}`}>
              {`${postUser.name} ${postUser.lastname}`}
            </h5>
            <p className={postUser.username || `${styles.skeleton} ${styles.skeletonText}`}>
              {postUser.username && `@${postUser.username}`}
            </p>
            <p>·</p>
            <p className={styles.createdAt}>{format(post.createdAt)}</p>
          </div>
          <PostDots
           username={postUser.username}
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
        setShowComments={setShowComments}
        showComments={showComments}
        comments={comments}
        />
        {
          showComments && post &&  <Comments 
                          loggedUser={loggedUser}
                          postId={post._id}
                          comments={comments}
                          getComments={getComments}
                          />
        }
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
