import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
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
  poll: any,
  pinned: boolean,
  groupData: any
}

export default function PostList() {
  const { posts, fetchData, loader } = usePosts({type: "all"});
  const { loggedUser } = useContext<any>(AuthContext);
  const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
  return (
    <>
      <div className={styles.postListContainer}>
        <div>
          {isResponsive && <ToPost userData={loggedUser} fetchData={fetchData}/>}
          <div className={styles.postsContainer}>
            {loader && 
            <div className={styles.loaderContainer}>
              <div className={styles.loader}>  
                <span></span>
              </div>
            </div>
            }
            {
              posts && 
              posts.map((
                {_id, text, image, userId, likes, createdAt,
                reposted, repostedPost, repostedBy, poll, pinned, groupData}: Post)=>(
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
                  pinned={pinned}
                  group={groupData}
                  />
                }
                </>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}
