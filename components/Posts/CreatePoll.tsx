import React, { useState } from 'react'
import styles from './CreatePoll.module.scss';
import InputChoice from './InputChoice';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';

interface Props{
    setPoll: React.Dispatch<React.SetStateAction<never[]>>,
    pollOpen: boolean
}

const days = Array.from(Array(8).keys());
const hours = Array.from(Array(24).keys());
const minutes = Array.from(Array(60).keys());

const initialChoices = [1,1]

export default function CreatePoll({setPoll, pollOpen}: Props) {
    const [daysOpen, setDaysOpen] = useState(false);
    const [hoursOpen, setHoursOpen] = useState(false);
    const [minutesOpen, setMinutesOpen] = useState(false);
    const [minutesState, setMinutesState] = useState<any>('Minutes');
    const [hoursState, setHoursState] = useState<any>('Hours');
    const [daysState, setDaysState] = useState<any>('Days');
    const [choices, setChoices] = useState(initialChoices);
    
    const handleClick = ()=>{
        setChoices([...choices, 1])
    }

    const handleSelects = (select: string)=>{
        if(select === "days") daysOpen ? setDaysOpen(false) : setDaysOpen(true);
        else if(select === "hours") hoursOpen ? setHoursOpen(false) : setHoursOpen(true);
        else minutesOpen ? setMinutesOpen(false) : setMinutesOpen(true);
    }

    return (
        <div className={`${styles.createPollContainer} ${pollOpen ? styles.open : styles.close}`}>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    {
                        choices.map((choice, index)=>(
                            <InputChoice label={`Choice ${index + 1}`} setPoll={setPoll} index={index}/>
                        ))
                    }
                </div>
                <button onClick={handleClick}><IoMdAdd/></button>
            </div>
            <div className={styles.options}>
                <h4>Poll length</h4>
                <div className={styles.selects}>
                    <div className={styles.select}>
                        <div className={`${styles.optionsContainer} ${daysOpen && styles.active}`}>
                            {days.map((time: number)=>(
                                <div 
                                className={styles.option} 
                                onClick={()=>{ setDaysState(time); setDaysOpen(false)}}
                                >
                                    <input type="radio" id={`${time}`} name={`${time}`}/>
                                    <label htmlFor={`${time}`}>{time}</label>
                                </div>
                            ))}
                        </div>
                    <div className={`${styles.selected} ${daysOpen && styles.active}`} 
                    onClick={()=> handleSelects('days')}>
                        {daysState}
                    </div>
                    </div>
                    <div className={styles.select}>
                        <div className={`${styles.optionsContainer} ${hoursOpen && styles.active}`}>
                            {hours.map((time: number)=>(
                                <div 
                                className={styles.option} 
                                onClick={()=>{ setHoursState(time); setHoursOpen(false)}}
                                >
                                    <input type="radio" id={`${time}`} name={`${time}`}/>
                                    <label htmlFor={`${time}`}>{time}</label>
                                </div>
                            ))}
                        </div>
                    <div className={`${styles.selected} ${hoursOpen && styles.active}`} 
                    onClick={()=> handleSelects('hours')}>
                        {hoursState}
                    </div>
                    </div>
                    <div className={styles.select}>
                        <div className={`${styles.optionsContainer} ${minutesOpen && styles.active}`}>
                            {minutes.map((time: number)=>(
                                <div 
                                className={styles.option} 
                                onClick={()=>{ setMinutesState(time); setMinutesOpen(false)}}
                                >
                                    <input type="radio" id={`${time}`} name={`${time}`}/>
                                    <label htmlFor={`${time}`}>{time}</label>
                                </div>
                            ))}
                        </div>
                    <div className={`${styles.selected} ${minutesOpen && styles.active}`} 
                    onClick={()=> handleSelects('minutes')}>
                        {minutesState}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
