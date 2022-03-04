import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { postList } from '../../db/post_list';
import { usePosts } from '../../hooks/usePosts';
import Post from './Post';
import styles from './PostList.module.scss';
import Repost from './Repost';
import ToPost from './ToPost';

interface Post{
  _id: string,
  userId: string,
  text: string,
  image: string,
  likes: [],
  createdAt: any,
  reposted: boolean,
  repostedPost: any,
  repostedBy: any,
  poll: any
}

export default function PostList() {
  const { posts, fetchData } = usePosts({type: "all"});
  const { loggedUser } = useContext<any>(AuthContext);

  return (
      <div className={styles.postListContainer}>
        <div>
          <ToPost userData={loggedUser} fetchData={fetchData}/>
          <div className={styles.postsContainer}>
            {
              posts && 
              posts.map(({_id, text, image, userId, likes, createdAt, reposted, repostedPost, repostedBy, poll}: Post)=>(
                <>
                {
                  reposted ?
                  <Repost 
                  _id={_id} 
                  text={text} 
                  image={image} 
                  key={_id} 
                  userId={userId} 
                  likes={likes}
                  fetchData={fetchData}
                  loggedUser={loggedUser}
                  createdAt={createdAt}
                  repostedPost={repostedPost}
                  repostedBy={repostedBy}
                  poll={poll}
                  /> :
                  <Post 
                  _id={_id} 
                  text={text} 
                  image={image}
                  key={_id} 
                  userId={userId} 
                  likes={likes}
                  fetchData={fetchData}
                  loggedUser={loggedUser}
                  createdAt={createdAt}
                  repostedBy={repostedBy}
                  poll={poll}
                  />
                }
                </>
              ))
            }
          </div>
        </div>
      </div>
  );
}
