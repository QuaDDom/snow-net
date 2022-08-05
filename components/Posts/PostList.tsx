import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AuthContext from '../../context/AuthContext';
import { postList } from '../../db/post_list';
import { usePosts } from '../../hooks/usePosts';
import Post from './Post';
import styles from './PostList.module.scss';
import Repost from './Repost';
import ToPost from './ToPost';
import InfiniteScroll from 'react-infinite-scroll-component';
import SlideFriends from '../Responsive/SlideFriends';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';
import Router from 'next/router';
import { io } from 'socket.io-client';

interface Post {
    _id: string;
    userId: string;
    text: string;
    image: string;
    likes: [];
    createdAt: any;
    reposted: boolean;
    repostedPost: any;
    repostedBy: any;
    poll: any;
    pinned: boolean;
    groupData: any;
}

export default function PostList() {
    const { posts, fetchData, loader, setOffset, offset, isLimit } = usePosts({ type: 'all' });
    const { loggedUser, setLoggedUser } = useContext<any>(AuthContext);
    const [randomUsersData, setRandomUsersData] = useState<any>([]);
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

    const socket = useRef<any>(null);

    useEffect(() => {
        socket.current = io('ws://localhost:8080');
        loggedUser && socket.current.emit('addUser', loggedUser._id);
    }, [loggedUser]);

    useEffect(() => {
        const getRandomUsers = async () => {
            const data = await axios.get('https://snow-net.herokuapp.com/api/users/get/all/7/8');
            setRandomUsersData([...data.data]);
        };
        getRandomUsers();
    }, []);

    return (
        <>
            <div className={styles.postListContainer}>
                <InfiniteScroll
                    dataLength={posts.length}
                    hasMore={!isLimit}
                    next={() => setOffset(offset + 15)}
                    loader={loader}
                    style={{ overflow: 'visible', flexDirection: 'column' }}>
                    <div>
                        {isResponsive && <ToPost userData={loggedUser} fetchData={fetchData} />}
                        {!isResponsive && <SlideFriends users={randomUsersData} />}
                        <div className={styles.postsContainer}>
                            {posts &&
                                posts.map(
                                    (
                                        {
                                            _id,
                                            text,
                                            image,
                                            userId,
                                            likes,
                                            createdAt,
                                            reposted,
                                            repostedPost,
                                            repostedBy,
                                            poll,
                                            pinned,
                                            groupData
                                        }: Post,
                                        index: number
                                    ) => (
                                        <>
                                            {reposted ? (
                                                <Repost
                                                    _id={_id}
                                                    text={text}
                                                    image={image}
                                                    key={_id + index}
                                                    userId={userId}
                                                    likes={likes}
                                                    fetchData={fetchData}
                                                    loggedUser={loggedUser}
                                                    createdAt={createdAt}
                                                    poll={poll}
                                                    pinned={pinned}
                                                    group={groupData}
                                                    repostedPost={repostedPost}
                                                    repostedBy={repostedBy}
                                                />
                                            ) : (
                                                <Post
                                                    _id={_id}
                                                    text={text}
                                                    image={image}
                                                    key={_id + index}
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
                                            )}
                                        </>
                                    )
                                )}
                            {loader && !isLimit && (
                                <SpinnerCircular
                                    enabled={true}
                                    size={50}
                                    color="#6dffff"
                                    secondaryColor="#2b3b4b50"
                                    thickness={150}
                                    speed={100}
                                />
                            )}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
}
