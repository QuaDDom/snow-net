import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styles from './GroupMembers.module.scss';

interface Props{
    members: [string]
}

export default function GroupMembers({ members }: Props) {
    const [membersData, setMembersData] = useState<any>([]);

    useEffect(()=>{
        const fetchMembersData = async ()=>{
            try{
                members.map(async (userId)=>{
                    const data = await axios.get(`http://localhost:5000/api/users/${userId}`);
                    setMembersData([...membersData, data.data]);
                })
            } catch(err){
                console.log(err)
            }
        }
        fetchMembersData();
    },[])

    return (
        <div className={styles.members}>
            <h4>Members</h4>
            <div className={styles.grid}>
                {
                    membersData.map((member: any)=>(
                        <div className={styles.member} key={member._id}>
                            <img src={member.profilePic} alt={member.username} />
                            <div className={styles.info}>
                                <h6>{member.name} {member.lastname}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
