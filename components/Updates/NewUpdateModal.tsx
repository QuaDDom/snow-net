import { features } from 'process';
import React, { Dispatch, SetStateAction } from 'react';
import { CgClose } from 'react-icons/cg';
import styles from './NewUpdateModal.module.scss';

interface Props {
    features: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewUpdateModal({ features, setOpen }: Props) {
    localStorage.setItem('updateModal', JSON.stringify('open'));

    const handleClose = () => {
        localStorage.setItem('updateModal', JSON.stringify('closed'));
        setOpen(false);
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.newUpdateModal}>
                <div className={styles.closeModal}>
                    <button onClick={handleClose}>
                        <CgClose />
                    </button>
                </div>
                <div className={styles.intro}>
                    <div className={styles.text}>
                        <h2>What's New</h2>
                        <p className={styles.date}>11 June</p>
                    </div>
                    <div className={styles.snowLogo}>
                        <img src="./newupdatecover.svg" alt="snowcover" className={styles.cover} />
                        <img src="./snow-logo.svg" alt="snow" className={styles.logo} />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.newFeaturesText}>
                        <h3>NEW FEATURES</h3>
                        <div className={styles.line} />
                    </div>
                    <ul>
                        {features.map((feature: any) => (
                            <li>
                                <div>
                                    <p className={styles.title}>{feature.title}.</p>
                                    <p className={styles.description}>{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
