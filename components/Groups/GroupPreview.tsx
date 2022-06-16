import React from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BiHappy, BiImageAlt, BiPoll } from 'react-icons/bi';
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import styles from './GroupPreview.module.scss';

interface Props {
    groupType: boolean;
    title: string;
    coverPic?: string;
    groupPic?: string;
    description: string;
}

export default function GroupPreview({ groupType, title, coverPic, groupPic, description }: Props) {
    return (
        <div className={styles.groupPreviewContainer}>
            <div className={styles.preview}>
                <h3>Preview</h3>
                <div className={styles.groupContainer}>
                    <div className={styles.banner}>
                        <img src={coverPic || ''} />
                    </div>
                    <div className={styles.info}>
                        {groupPic && <img src={groupPic} />}
                        <div className={styles.textInfo}>
                            <h4>{title}</h4>
                            <div>
                                {groupType ? (
                                    <p>
                                        <span>
                                            <RiGitRepositoryPrivateLine />
                                        </span>{' '}
                                        Private
                                    </p>
                                ) : (
                                    <p>
                                        <span>
                                            <MdPublic />
                                        </span>{' '}
                                        Public
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.otherComponents}>
                    <div className={`${styles.photos} ${styles.side}`}>
                        <h4>Photos</h4>
                        <div className={styles.gridExample}>
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                        </div>
                    </div>
                    <div className={styles.postContainer}>
                        <div className={styles.toPost}>
                            <div className={styles.profilePic}></div>
                            <div className={styles.input}>
                                <p></p>
                            </div>
                            <div className={styles.postOptions}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <button></button>
                        </div>
                    </div>
                    <div className={`${styles.about} ${styles.side}`}>
                        <h4>About</h4>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
