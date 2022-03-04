import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styles from './Poll.module.scss';

interface Props {
    poll: any,
    loggedUser: any,
    _id: string
}

export default function Poll({poll, loggedUser, _id}: Props) {
    const [isVoted, setIsVoted] = useState(false);
    const [percentage, setPercentage] = useState<any>([]);


    const handleVote = async (option: any, pollNumber: number)=>{
        if(isVoted) return;

        const data = await axios.put(`http://localhost:5000/api/posts/poll/${_id}/${pollNumber}`, {
            userId: loggedUser._id
        });  
        console.log(data.data.poll)
        
        setIsVoted(true)
    }


    return (
        <div className={styles.pollContainer}>
            <div className={styles.options}>
                {poll.map((option: any, index: number)=>(
                    <div className={styles.option} onClick={()=> handleVote(option, index)} key={index}>
                        {isVoted && <div style={{
                            position: "absolute",
                            height: "100%",
                            width: 50 + "%",
                            top: 0,
                            left: 0,
                        }} className={styles.percentageSize}/>}
                        <span>{option.option}</span>
                        {isVoted && <p>{`50%`}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}
