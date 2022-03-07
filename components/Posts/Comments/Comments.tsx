import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import styles from './Comments.module.scss';

interface Props{
  loggedUser: any,
  postId: string,
  getComments: () => Promise<void>,
  comments: any
}

export default function Comments({loggedUser, postId, getComments, comments}: Props) {

  return (
    <div className={styles.commentsContainer}>
      <AddComment userData={loggedUser} fetchData={getComments} postId={postId}/>
      <div className={styles.comments}>
        {
            comments && comments.map(({image, text, userId, createdAt, likes}: any, index: number)=> (
              <Comment 
              image={image} 
              text={text} 
              userId={userId} 
              loggedUser={loggedUser} 
              createdAt={createdAt}
              likes={likes}
              key={index}
              />
            )
          )
        }
      </div>
    </div>
  )
}
