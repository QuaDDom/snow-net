import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '../../hooks/useGetUser';
import OpenImage from '../OpenImage';
import styles from './Post.module.scss';
import PostOptions from './PostOptions';
import PostDots from '../Posts/PostDots';
import { format, register } from 'timeago.js';
import ConfirmDelete from '../Posts/ConfirmDelete';
import axios from 'axios';
import Poll from './Poll';
import { BsPinAngleFill } from 'react-icons/bs';
import Comments from './Comments/Comments';
import extract from 'mention-hashtag';
import HoverUserProfile from '../Hover/HoverUserProfile';
import EditModal from '../Settings/modals/EditModal';
import Report from '../Modals/Report';
import { MutableRefObject } from 'react';
import PostDotsOptions from './PostDotsOptions';
import { useMediaQuery } from 'react-responsive';
import DeleteCommentModal from '../Settings/modals/DeleteCommentModal';
import EditCommentModal from '../Settings/modals/EditCommentModal';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from '../Markdown/Markdown';
import ContentLoader from 'react-content-loader';
import LoadingPost from './Loader/LoadingPost';
import Pusher from 'pusher-js';

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
}

interface User {
    email: string;
    username: string;
    name: string;
    lastname: string;
    profilePic: string;
    bio: string;
    coverPic: string;
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
    repostedBy,
    poll,
    pinned,
    group
}: Props) {
    const [openImage, setOpenImage] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<any>(null);
    const [hashtags, setHashtags] = useState<any>([]);
    const [isHover, setIsHover] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [textState, setTextState] = useState(text);
    const [reportModal, setReportModal] = useState(false);
    const [optionsPosition, setOptionsPosition] = useState<any>(null);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [deleteComment, setDeleteComment] = useState(false);
    const [editComment, setEditComment] = useState(false);

    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const postRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    const handleHover = () => {
        setIsHover(true);
    };

    const handleOpenOptions = () => (optionsOpen ? setOptionsOpen(false) : setOptionsOpen(true));

    const getComments = async () => {
        const commentsData = await axios.get(
            `https://snow-net.herokuapp.com/api/posts/comments/${_id}`
        );
        setComments([...commentsData.data]);
    };
    const user: User = useGetUser(userId);

    useEffect(() => {
        getComments();
    }, []);

    useEffect(() => {
        setFullName(`${user.name} ${user.lastname}`);
    }, [user]);

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

    const localeFunc = (number: any, index: any, totalSec: any): any => {
        return [
            ['just now', 'right now'],
            ['%ss', 'in %s seconds'],
            ['1m', 'in 1 minute'],
            ['%sm', 'in %s minutes'],
            ['1h', 'in 1 hour'],
            ['%sh', 'in %s hours'],
            ['1d', 'in 1 day'],
            ['%sd', 'in %s days'],
            ['1w', 'in 1 week'],
            ['%sw', 'in %s weeks'],
            ['1m', 'in 1 month'],
            ['%sm', 'in %s months'],
            ['1y', 'in 1 year'],
            ['%sy', 'in %s years']
        ][index];
    };

    register('my-locale', localeFunc);

    return (
        <>
            {modalOpen && <ConfirmDelete deletePost={deletePost} setModalOpen={setModalOpen} />}
            {deleteComment && <DeleteCommentModal />}
            {editComment && <EditCommentModal />}
            {editModal && (
                <EditModal
                    setIsOpen={setEditModal}
                    value={text}
                    title="Edit Post"
                    userId={loggedUser._id}
                    postId={_id}
                    setText={setTextState}
                />
            )}
            {reportModal && <Report postId={_id} setModalOpen={setReportModal} />}
            {optionsOpen && (
                <PostDotsOptions
                    username={user.username}
                    userId={userId}
                    loggedUserId={loggedUser?._id}
                    postId={_id}
                    deletePost={deletePost}
                    handleModal={handleModal}
                    handleEdit={handleEditModal}
                    handleReportModal={handleReportModal}
                    isOpen={optionsOpen}
                    setIsOpen={setOptionsOpen}
                    postRef={postRef}
                />
            )}
            {user && loggedUser && user.profilePic ? (
                <div className={styles.postContainer} ref={postRef}>
                    {isHover && (
                        <HoverUserProfile
                            name={`${user.name} ${user.lastname}`}
                            username={user.username}
                            bio={user.bio}
                            profilePic={user.profilePic}
                            bannerPic={user.coverPic}
                        />
                    )}
                    {pinned && (
                        <p className={styles.pinned}>
                            <span>
                                <BsPinAngleFill />
                            </span>{' '}
                            Pinned Post
                        </p>
                    )}
                    <div className={`${styles.user} ${group && styles.groupStyle}`}>
                        <img
                            src={group?.groupPic || user.profilePic || 'noProfile.png'}
                            alt={user.name}
                            onClick={handleImageClick}
                            className={`${group && styles.group}`}
                            onMouseMove={handleHover}
                            onMouseLeave={() => setIsHover(false)}
                            onMouseDown={() => setIsHover(false)}
                            onMouseOut={() => setIsHover(false)}
                        />
                        {group && user.profilePic && (
                            <img src={user.profilePic} className={styles.userGroup} />
                        )}
                        <div className={styles.bothColumn}>
                            <h5
                                className={
                                    user.name || `${styles.skeleton} ${styles.skeletonText}`
                                }>
                                {group
                                    ? `${group.title}`
                                    : `${
                                          isResponsive
                                              ? fullName
                                              : fullName.length > 12
                                              ? fullName.substring(0, 12) + '...'
                                              : fullName
                                      } `}
                            </h5>
                            {group && (
                                <p
                                    className={
                                        styles.groupUsername
                                    }>{`${user.name} ${user.lastname} · @${user.username}`}</p>
                            )}
                            {!group && (
                                <p
                                    className={
                                        user.username || `${styles.skeleton} ${styles.skeletonText}`
                                    }>
                                    {user.username &&
                                        `@${
                                            isResponsive
                                                ? user.username
                                                : user.username.length > 8
                                                ? user.username.substring(0, 8) + '...'
                                                : user.username
                                        }`}
                                </p>
                            )}
                            <p>·</p>
                            <p className={styles.createdAt}>{format(createdAt, 'my-locale')}</p>
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
                                            code({ node, inline, className, children, ...props }) {
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
                        {poll && poll.length > 0 && (
                            <Poll poll={poll} loggedUser={loggedUser} _id={_id} />
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
                    {showComments && (
                        <Comments
                            loggedUser={loggedUser}
                            postId={_id}
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
        </>
    );
}
