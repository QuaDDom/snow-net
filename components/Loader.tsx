import React from 'react';
import styles from './Loader.module.scss';
import snowLogo from '../img/snow-logo.svg';

interface Props {
    isLoading: boolean;
}

export default function Loader({ isLoading }: Props) {
    return (
        <>
            <div className={`${styles.bgWhite} ${isLoading || styles.vanish}`} />
            <div className={`${styles.loaderContainer} ${isLoading || styles.vanish}`}>
                <div className={styles.bgBlack}>
                    <div className={styles.swipesContainer}>
                        <div className={styles.bgAquaSwipe} />
                        <div className={styles.bgBlackSwipe} />
                    </div>
                    <div className={styles.logo}>
                        <img
                            src="/snow-logo.svg"
                            alt="snownetwork"
                            className={styles.snowLogo}
                            width={70}
                            height={70}
                            layotu="fill"
                        />
                        <h2>SNOW</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
