import React from 'react';
import { MdGroup, MdOutlineSort } from 'react-icons/md';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
    return (
        <div className={styles.sidebarContainer}>
            <h2>Request Panel</h2>
            <div className={styles.options}>
                <div className={styles.option}>
                    <div className={styles.icon}>
                        <MdOutlineSort />
                    </div>
                    <div className={styles.text}>
                        <h4>Pending Posts</h4>
                        <p>{0} Posts</p>
                    </div>
                </div>
                <div className={styles.option}>
                    <div className={styles.icon}>
                        <MdGroup />
                    </div>
                    <div className={styles.text}>
                        <h4>Requests to join groups</h4>
                        <p>{0} Groups</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
