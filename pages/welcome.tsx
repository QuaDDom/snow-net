import React from 'react';
import styles from '../styles/welcome.module.scss';
import Router from 'next/router';
import { useMediaQuery } from 'react-responsive';

export default function welcome() {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const handlePush = (route: string)=> Router.push(route);
    
    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.containerAll}>
                <div className={styles.leftSide}>
                    <img src="wavesbg.svg" alt="" className={styles.bg} />
                    {isResponsive && <div className={styles.snow}>
                        <img src="snow-logo.svg" alt="" />
                        <h1>SNOW</h1>
                    </div>}
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.snowLogo}>
                        <img src="snow-logo.svg" alt="" />
                    </div>
                    <h2>Welcome to Snow! <br /> A new social network</h2>
                    <h3>Join Snow</h3>
                    <div className={styles.buttons}>
                        <button
                         className={styles.register}
                         onClick={()=> handlePush('/register')}
                        >Register</button>
                        <p>Do you already have an account?</p>
                        <button
                         className={styles.login}
                         onClick={()=> handlePush('/login')}
                        >Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
