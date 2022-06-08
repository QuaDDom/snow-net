import React from 'react';
import { MdOutlineWatchLater } from 'react-icons/md';
import styles from './PendingRequest.module.scss';
import Image from 'next/image';

export default function PendingRequest() {
    return (
        <div className={styles.pendingRequest}>
            <div className={styles.user}>
                <img
                    src="https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt=""
                />
                <h3>John Doe</h3>
                <p>10:10</p>
                <p className={styles.pending}>
                    <span>
                        <MdOutlineWatchLater />
                    </span>{' '}
                    Pending
                </p>
            </div>
            <div className={styles.content}>
                <p className={styles.text}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, sint!
                </p>
            </div>
            <div className={styles.options}>
                <button className={styles.decline}>Decline</button>
                <button className={styles.accept}>Publish</button>
            </div>
        </div>
    );
}
