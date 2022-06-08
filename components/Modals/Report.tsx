import React, { useState } from 'react';
import styles from '../Settings/modals/Modals.module.scss';

interface Props {
    postId: string;
    setModalOpen: any;
}

export default function Report({ postId, setModalOpen }: Props) {
    const [report, setReport] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReport(e.target.value);
    };

    return (
        <div className={styles.modalContainer}>
            <div className={`${styles.modal} ${styles.reportModal}`}>
                <h4 className={styles.title}>Report Post</h4>
                <p>
                    If you think this post may be harmful, do not hesitate to send us your report.
                </p>
                <input
                    type="text"
                    value={report}
                    onChange={handleChange}
                    className={styles.reportInput}
                />
                <div className={styles.buttons}>
                    <button className={styles.send}>Send</button>
                    <button className={styles.cancel} onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
