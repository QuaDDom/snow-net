import Router from 'next/router';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useGetUser } from '../../hooks/useGetUser';
import OpenImage from '../OpenImage';
import styles from './Post.module.scss';
import PostOptions from './PostOptions';
import PostDots from '../Posts/PostDots';
import { format, register } from 'timeago.js';
import ConfirmDelete from '../Posts/ConfirmDelete';
import axios from 'axios';
import { BiRepost } from 'react-icons/bi';
import Comments from './Comments/Comments';
import PostDotsOptions from './PostDotsOptions';
import LoadingPost from './Loader/LoadingPost';
import { HiBadgeCheck } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from '../Markdown/Markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    _id: string;
    hour?: {
        number: string;
        type: string;
    };
    text: string;
    image: string;
    userId: string;
    likes: any;
    fetchData: () => Promise<void>;
    loggedUser: any;
    createdAt: any;
    repostedBy: any;
    poll?: [string];
    pinned: boolean;
    group: any;
    repostedPost: boolean;
}

interface User {
    email: string;
    username: string;
    name: string;
    lastname: string;
    profilePic: string;
    bio: string;
    coverPic: string;
    verifiedBadge: boolean;
}

export default function Post({
    _id,
    image,
    text,
    userId,
    likes,
    fetchData,
    loggedUser,
    createdAt,
    repostedPost,
    repostedBy,
    group
}: Props) {
    const [openImage, setOpenImage] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [postUser, setPostUser] = useState<any>(null);
    const [post, setPost] = useState<any>(null);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<any>(null);
    const [optionsPosition, setOptionsPosition] = useState<any>(null);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [textState, setTextState] = useState(text);
    const [reportModal, setReportModal] = useState(false);

    const postRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const getComments = async () => {
        if (post) {
            const commentsData = await axios.get(
                `https://snow-net.herokuapp.com/api/posts/comments/${post._id}`
            );
            setComments([...commentsData.data]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const postData = await axios.get(
                `https://snow-net.herokuapp.com/api/posts/${repostedPost}`
            );
            if (postData.data?.userId) {
                const userPost = await axios.get(
                    `https://snow-net.herokuapp.com/api/users/${postData.data.userId}`
                );
                setPostUser(userPost.data);
            }
            setPost(postData.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        getComments();
    }, [post]);

    const user: User = useGetUser(userId);

    const handleClick = () => setOpenImage(true);
    const handleModal = () => (modalOpen ? setModalOpen(false) : setModalOpen(true));
    const handleEditModal = () => (editModal ? setEditModal(false) : setEditModal(true));
    const handleReportModal = () => (reportModal ? setReportModal(false) : setReportModal(true));

    const handleImageClick = () => {
        if (!group) {
            Router.push('/user/' + user.username);
        } else {
            Router.push('/groups/' + group._id);
        }
    };

    const deletePost = async () => {
        await axios.delete(`https://snow-net.herokuapp.com/api/posts/${_id}`, {
            data: { userId: loggedUser._id }
        });
        fetchData();
    };

    return (
        <>
            <div>
                {optionsOpen && (
                    <PostDotsOptions
                        username={user.username}
                        userId={userId}
                        loggedUserId={loggedUser?._id}
                        postId={_id}
                        deletePost={deletePost}
                        handleModal={handleModal}
                        handleEdit={handleEditModal}
                        isOpen={optionsOpen}
                        setIsOpen={setOptionsOpen}
                        postRef={postRef}
                        reposted={true}
                        handleReportModal={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                )}
                {modalOpen && <ConfirmDelete deletePost={deletePost} setModalOpen={setModalOpen} />}
                {user && postUser && loggedUser && post ? (
                    <div className={styles.postContainer} ref={postRef}>
                        <p
                            className={styles.reposted}
                            onClick={() => Router.push('/user/' + user.username)}>
                            <span>
                                <BiRepost />
                            </span>{' '}
                            {user.name + ' ' + user.lastname} Reposted
                        </p>
                        <div className={styles.user}>
                            <img
                                src={postUser.profilePic || 'noProfile.png'}
                                alt={postUser.name}
                                onClick={handleImageClick}
                            />
                            <div className={styles.bothColumn}>
                                <h5
                                    className={
                                        postUser.name || `${styles.skeleton} ${styles.skeletonText}`
                                    }>
                                    {`${postUser.name} ${postUser.lastname}`}
                                    {postUser.verifiedBadge && (
                                        <span className={styles.verified}>
                                            <HiBadgeCheck />
                                        </span>
                                    )}
                                </h5>
                                <p
                                    className={
                                        postUser.username ||
                                        `${styles.skeleton} ${styles.skeletonText}`
                                    }>
                                    {postUser.username && `@${postUser.username}`}
                                </p>
                                <p>·</p>
                                <p className={styles.createdAt}>
                                    {format(post.createdAt, 'my-locale')}
                                </p>
                            </div>
                            <PostDots
                                username={user.username}
                                userId={userId}
                                loggedUserId={loggedUser?._id}
                                postId={_id}
                                fetchData={fetchData}
                                deletePost={deletePost}
                                handleModal={handleModal}
                                handleEdit={handleEditModal}
                                handleReport={handleReportModal}
                                isOpen={optionsOpen}
                                setIsOpen={setOptionsOpen}
                            />
                        </div>
                        <div className={styles.post}>
                            {text && (
                                <p className={styles.text}>
                                    {
                                        <ReactMarkdown
                                            children={textState}
                                            remarkPlugins={[[remarkGfm]]}
                                            components={{
                                                code({
                                                    node,
                                                    inline,
                                                    className,
                                                    children,
                                                    ...props
                                                }) {
                                                    const match = /language-(\w+)/.exec(
                                                        className || ''
                                                    );
                                                    return !inline && match ? (
                                                        <SyntaxHighlighter
                                                            children={String(textState)
                                                                .replace(/\n$/, '')
                                                                .replace('~~~', '')
                                                                .replace('~~~', '')
                                                                .replace(match[1], '')
                                                                .replace('```', '')
                                                                .replace('```', '')}
                                                            style={dracula}
                                                            language={match[1]}
                                                        />
                                                    ) : (
                                                        <Markdown node={node} children={children} />
                                                    );
                                                }
                                            }}
                                        />
                                    }
                                </p>
                            )}
                            {image && (
                                <div className={styles.imageContainer}>
                                    <img src={image} width="100%" onClick={handleClick} />
                                </div>
                            )}
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
                        {showComments && post && (
                            <Comments
                                loggedUser={loggedUser}
                                postId={post._id}
                                comments={comments}
                                getComments={getComments}
                            />
                        )}
                    </div>
                ) : (
                    <LoadingPost />
                )}
                {openImage && (
                    <OpenImage img={image} openImage={openImage} setOpenImage={setOpenImage} />
                )}
            </div>
        </>
    );
}
