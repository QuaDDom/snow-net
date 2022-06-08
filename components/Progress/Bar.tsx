import React from 'react';
import styles from './Bar.module.scss';

export default function Bar({ animationDuration, progress, isFinished }: any) {
    return (
        <div
            className={styles.progressBarContainer}
            style={{
                opacity: isFinished ? 0 : 1,
                transition: `opacity ${animationDuration}ms linear`
            }}>
            <div
                className={styles.progressBar}
                style={{
                    width: `${progress * 100}%`,
                    transition: `width ${animationDuration}ms linear`
                }}
            />
        </div>
    );
}
