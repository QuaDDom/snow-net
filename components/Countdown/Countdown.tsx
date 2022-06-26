import React, { useEffect, useRef, useState } from 'react';
import styles from './Countdown.module.scss';
import SnowWelcome from './SnowWelcome';
import LoginComponent from '../LoginComponent';
import CountdownComponent from './CountdownComponent';
import { AuthProvider } from '../../context/AuthContext';
import Router from 'next/router';

export default function Countdown() {
    const [launch, setLaunch] = useState(false);
    const [isLaunch, setIsLaunch] = useState(false);

    return (
        <div className={styles.containerAll}>
            <AuthProvider>
                <CountdownComponent launch={launch} setLaunch={setLaunch} />
                <SnowWelcome launch={launch} />
            </AuthProvider>
        </div>
    );
}
