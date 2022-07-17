import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { format } from 'timeago.js';
import { useGetUser } from '../../../hooks/useGetUser';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from '../../Markdown/Markdown';
import styles from './Comment.module.scss';
import CommentDots from './CommentDots';

interface Props {
    hour?: {
        number: string;
        type: string;
    };
    text: string;
    image: string;
    userId: string;
    likes: any;
    loggedUser: any;
    createdAt: any;
}

export default function Comment({ image, text, userId, likes, loggedUser, createdAt }: Props) {
    const [openImage, setOpenImage] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [textState, setTextState] = useState(text);
    const user: any = useGetUser(userId);

    const handleClick = () => setOpenImage(true);
    const handleModal = () => (modalOpen ? setModalOpen(false) : setModalOpen(true));

    const handleImageClick = () => {
        Router.push('user/' + user.username);
    };

    return (
        <div className={styles.commentContainer}>
            <div className={styles.user}>
                <img
                    src={user.profilePic || 'noProfile.png'}
                    alt={user.name}
                    onClick={handleImageClick}
                />
                <div className={styles.bothColumn}>
                    <h5 className={user.name || `${styles.skeleton} ${styles.skeletonText}`}>
                        {`${user.name} ${user.lastname}`}
                    </h5>
                    <p>·</p>
                    <p className={styles.createdAt}>{format(createdAt)}</p>
                </div>
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
                                        const match = /language-(\w+)/.exec(className || '');
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
            {/* <CommentDots
                username={user.username}
                userId={userId}
                loggedUserId={loggedUser?._id}
                handleModal={handleModal}
            /> */}
        </div>
    );
}
