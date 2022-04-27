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

    useEffect(()=>{
        if(poll[0].votes.includes(loggedUser?.id)) setIsVoted(true);
        else if(poll[1].votes.includes(loggedUser?.id)) setIsVoted(true);
    },[loggedUser, poll])


    const handleVote = async (option: any, pollNumber: number)=>{
        if(isVoted) return;
        const option1 = poll[0].votes.length;
        const option2 = poll[1].votes.length;
        const totalVotes = option1 + option2;
        const percentage1 = Math.floor((option1 * 100) / totalVotes);
        const percentage2 = Math.floor((option2 * 100) / totalVotes);
        setPercentage([percentage1, percentage2]);
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
                            width: percentage[index] + "%",
                            top: 0,
                            left: 0,
                        }} className={styles.percentageSize}/>}
                        <span>{option.option}</span>
                        {isVoted && <p>{`${percentage[index]}%`}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}
