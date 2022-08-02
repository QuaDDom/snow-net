import React, { useState } from 'react';
import { BiRepost } from 'react-icons/bi';
import styles from './RepostCounter.module.scss';

interface Props {
    isReposted: boolean;
    totalReposts: number;
    handleRepost: () => void;
}

export default function RepostConter({ isReposted, totalReposts, handleRepost }: Props) {
    const [reposts, setReposts] = useState(totalReposts);
    const [animationReposts, setAnimationReposts] = useState('initial');

    const handleReposts = () => {
        setTimeout(() => setAnimationReposts('goUp'), 0);
        setTimeout(() => setReposts(!isReposted ? reposts + 1 : reposts - 1), 100);
        setTimeout(() => setAnimationReposts('waitDown'), 100);
        setTimeout(() => setAnimationReposts('initial'), 200);

        handleRepost();
    };

    return (
        <div className={styles.repost} onClick={handleReposts}>
            <span className={`${isReposted && styles.reposted}`}>
                <BiRepost />
            </span>
            <div className={styles.repostContainer}>
                <p className={`${isReposted && styles.reposted} ${styles[animationReposts]}`}>
                    {reposts}
                </p>
            </div>
        </div>
    );
}
