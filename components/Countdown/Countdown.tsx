import React, { useRef, useState } from 'react'
import styles from './Countdown.module.scss';
import SnowWelcome from './SnowWelcome';
import LoginComponent from '../LoginComponent';
import CountdownComponent from './CountdownComponent';
import { AuthProvider } from '../../context/AuthContext';

export default function Countdown() {
    const [launch, setLaunch] = useState(false);

    return (
        <div className={styles.containerAll}>     
            <AuthProvider>
                <CountdownComponent launch={launch} setLaunch={setLaunch}/>
                <SnowWelcome launch={launch}/>
                {launch && <LoginComponent isWelcome={true} launch={launch}/>}
            </AuthProvider>       
        </div>

    )
}
