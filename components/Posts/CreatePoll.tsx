import React, { useState } from 'react';
import styles from './CreatePoll.module.scss';
import InputChoice from './InputChoice';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import { useEffect } from 'react';

interface Props {
    setPoll: React.Dispatch<React.SetStateAction<any[]>>;
    pollOpen: boolean;
    poll: any;
}

const days = Array.from(Array(8).keys());
const hours = Array.from(Array(24).keys());
const minutes = Array.from(Array(60).keys());

export default function CreatePoll({ setPoll, pollOpen, poll }: Props) {
    const [daysOpen, setDaysOpen] = useState(false);
    const [hoursOpen, setHoursOpen] = useState(false);
    const [minutesOpen, setMinutesOpen] = useState(false);
    const [minutesState, setMinutesState] = useState<any>('Minutes');
    const [hoursState, setHoursState] = useState<any>('Hours');
    const [daysState, setDaysState] = useState<any>('Days');
    const [option, setOption] = useState('');
    const [option2, setOption2] = useState('');

    const handleClick = () => {};

    useEffect(() => {
        if (option && option2)
            setPoll([
                {
                    option: option,
                    votes: [1]
                },
                {
                    option: option2,
                    votes: [1]
                }
            ]);
    }, [option, option2]);

    const handleSelects = (select: string) => {
        if (select === 'days') daysOpen ? setDaysOpen(false) : setDaysOpen(true);
        else if (select === 'hours') hoursOpen ? setHoursOpen(false) : setHoursOpen(true);
        else minutesOpen ? setMinutesOpen(false) : setMinutesOpen(true);
    };

    return (
        <div className={`${styles.createPollContainer} ${pollOpen ? styles.open : styles.close}`}>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <InputChoice
                        label="Choice 1"
                        setPoll={setPoll}
                        poll={poll}
                        index={1}
                        value={option}
                        setValue={setOption}
                    />
                    <InputChoice
                        label="Choice 2"
                        setPoll={setPoll}
                        poll={poll}
                        index={2}
                        value={option2}
                        setValue={setOption2}
                    />
                </div>
                <button onClick={handleClick}>
                    <IoMdAdd />
                </button>
            </div>
            <div className={styles.options}>
                <h4>Poll length</h4>
                <div className={styles.selects}>
                    <div className={styles.select}>
                        <div className={`${styles.optionsContainer} ${daysOpen && styles.active}`}>
                            {days.map((time: number, index: number) => (
                                <div
                                    className={styles.option}
                                    onClick={() => {
                                        setDaysState(time);
                                        setDaysOpen(false);
                                    }}
                                    key={time + index}>
                                    <input type="radio" id={`${time}`} name={`${time}`} />
                                    <label htmlFor={`${time}`}>{time}</label>
                                </div>
                            ))}
                        </div>
                        <div
                            className={`${styles.selected} ${daysOpen && styles.active}`}
                            onClick={() => handleSelects('days')}>
                            {daysState}
                        </div>
                    </div>
                    <div className={styles.select}>
                        <div className={`${styles.optionsContainer} ${hoursOpen && styles.active}`}>
                            {hours.map((time: number, index: number) => (
                                <div
                                    className={styles.option}
                                    onClick={() => {
                                        setHoursState(time);
                                        setHoursOpen(false);
                                    }}
                                    key={time + index}>
                                    <input type="radio" id={`${time}`} name={`${time}`} />
                                    <label htmlFor={`${time}`}>{time}</label>
                                </div>
                            ))}
                        </div>
                        <div
                            className={`${styles.selected} ${hoursOpen && styles.active}`}
                            onClick={() => handleSelects('hours')}>
                            {hoursState}
                        </div>
                    </div>
                    <div className={styles.select}>
                        <div
                            className={`${styles.optionsContainer} ${minutesOpen &&
                                styles.active}`}>
                            {minutes.map((time: number, index: number) => (
                                <div
                                    className={styles.option}
                                    onClick={() => {
                                        setMinutesState(time);
                                        setMinutesOpen(false);
                                    }}
                                    key={time + index}>
                                    <input type="radio" id={`${time}`} name={`${time}`} />
                                    <label htmlFor={`${time}`}>{time}</label>
                                </div>
                            ))}
                        </div>
                        <div
                            className={`${styles.selected} ${minutesOpen && styles.active}`}
                            onClick={() => handleSelects('minutes')}>
                            {minutesState}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
