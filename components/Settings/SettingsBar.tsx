import React from 'react';
import { IoLanguageSharp, IoSettingsOutline } from 'react-icons/io5';
import { MdPrivacyTip, MdShield } from 'react-icons/md';
import styles from './SettingsBar.module.scss';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SettingsBar({ setPage }: Props) {
    return (
        <div className={styles.sidebarContainer}>
            <h2>Settings</h2>
            <div className={styles.options}>
                <div className={styles.option} onClick={() => setPage(1)}>
                    <div className={styles.icon}>
                        <IoSettingsOutline />
                    </div>
                    <div className={styles.text}>
                        <h4>General</h4>
                    </div>
                </div>
                <div className={styles.option} onClick={() => setPage(2)}>
                    <div className={styles.icon}>
                        <MdShield />
                    </div>
                    <div className={styles.text}>
                        <h4>Login & Security</h4>
                    </div>
                </div>
                <div className={styles.option} onClick={() => setPage(3)}>
                    <div className={styles.icon}>
                        <MdPrivacyTip />
                    </div>
                    <div className={styles.text}>
                        <h4>Privacy</h4>
                    </div>
                </div>
                <div className={styles.option} onClick={() => setPage(4)}>
                    <div className={styles.icon}>
                        <IoLanguageSharp />
                    </div>
                    <div className={styles.text}>
                        <h4>Language & Region</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
