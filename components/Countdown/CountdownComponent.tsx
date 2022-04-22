import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import styles from './Countdown.module.scss';
import Router from 'next/router';
import StaggerTextReveal from '../TextReveal/StaggerText';
import SnowWelcome from './SnowWelcome';
import LoginComponent from '../LoginComponent';

interface Props{
    launch: boolean,
    setLaunch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CountdownComponent({launch, setLaunch}: Props) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    let countdown: any = useRef();

    const handleTimerStart = ()=>{
        const date = new Date('April 21 2022 19:51:50').getTime();

        countdown = setInterval(()=>{
            const now = new Date().getTime();
            const distance = date - now;
            const daysDate = Math.floor(distance  / (1000 * 60 * 60 * 24));
            const hoursDate = Math.floor((distance  %  (1000 * 60 * 60 * 24)  / (1000 * 60 * 60)));
            const minutesDate = Math.floor((distance  % (1000 * 60 * 60 )) / (1000 * 60));
            const secondsDate = Math.floor((distance  % (1000 * 60)) / 1000);

            if(distance <= 0){
                clearInterval(countdown.current)
                setLaunch(true);
            } else{
                setDays(Math.floor(daysDate));
                setHours(Math.floor(hoursDate));
                setMinutes(Math.floor(minutesDate))
                setSeconds(Math.floor(secondsDate))
            }

        }, 1000)
    }

    useEffect(()=>{
        handleTimerStart();
        return ()=>{
            clearInterval(countdown.current)
        }
    },[])

    return (
        <>
        <div className={`${styles.bgWhite} ${launch && styles.launch}`}/>
        <div className={`${styles.countdownContainer} ${launch && styles.launch}`}
            style={{background: "url('wavesbg2.svg')"}}>
            <div className={styles.content}>
                <h2>A new social network</h2>
                <h1><span>Coming</span> soon</h1>
                <div className={styles.countdown}>
                    <div>
                        <h3>{days}</h3>
                        <p>Days</p>
                    </div>
                    <span>:</span>
                    <div>
                        <h3>{hours}</h3>
                        <p>Hours</p>
                    </div>
                    <span>:</span>
                    <div>
                        <h3>{minutes}</h3>
                        <p>Minutes</p>
                    </div>
                    <span>:</span>
                    <div>
                        <h3>{seconds}</h3>
                        <p>Seconds</p>
                    </div>
                </div>
                <button onClick={()=> Router.push('/register')}>Register Now</button>
            </div>
            <div className={styles.snowLogo}>
                <img src='snow-logo.svg' alt="" />
            </div>
        </div>
        </>
  )
}
