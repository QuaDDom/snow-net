import axios from 'axios';
import Image from 'next/image';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from './RowMsg.module.scss';


interface Props{
    _id: string,
    members: [string, string],
    loggedUser: any,
    setCurrentChat: any,
    setUser: React.Dispatch<any>,
    user: any
}

export default function RownMsg({_id, members, loggedUser, setCurrentChat, setUser, user}: Props) {
    const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
    const [friend, setFriend] = useState<any>(null);

    useEffect(()=>{
        const friendId = members.find(id=> id !== loggedUser._id);

        const getFriend = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/users/${friendId}`);
                setFriend(res.data);
                setUser(res.data);
            } catch(err){
                console.log(err);
            }
        }
        
        getFriend();
    },[loggedUser?._id])

    const handleClick = (e: any)=>{
        setCurrentChat({_id, members});
        setUser(friend);

        let x = e.clientX - e.target.offsetLeft,
              y = e.clientY - e.target.offsetTop,
              ripple = document.createElement('span');

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        ref.current.appendChild(ripple);

        setTimeout(()=>{
            ripple.remove();
        }, 600);
    }

    return (
        <>
       { friend && <div className={styles.rowContainer} onClick={handleClick} ref={ref}>
            <div className={styles.ripple}/>
            <Image src={friend.profilePic || 'noProfile.png'} alt={friend.username} />
            <div className={styles.info}>
                <h5>{`${friend.name} ${friend.lastname}`}</h5>
                <p>{''}</p>
            </div>
            <div/>
        </div>}
        </>
    );
}
