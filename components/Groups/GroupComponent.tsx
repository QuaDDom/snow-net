import React from 'react'
import styles from '../../styles/group.module.scss';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'; 
import { MdPublic } from 'react-icons/md'; 
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

export default function GroupComponent({group}: {group: any}) {
    const { loggedUser } = useContext<any>(AuthContext)

    const handleJoin = async ()=>{
        try{
            await axios.put('');
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className={styles.groupContainer}>
            <div className={styles.profile}>
                <div className={styles.banner}>
                    <img src={group.groupCover || 'noCover.jpg'} alt="" />
                </div>
                <div className={styles.info}>
                    <img src={group.groupPic || 'noProfile.png'} alt="" />
                    <div className={styles.textInfo}>
                        <h4>{group.title}</h4>
                        <div>
                            {group.private
                                ? <p><span><RiGitRepositoryPrivateLine/></span> Private</p>
                                : <p><span><MdPublic/></span> Public</p>
                            }
                            <h5>{`${group.members.length} Members`}</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.members}>
                            
                </div>
                <div className={styles.options}>
                    <button className={styles.join}>
                        <span><AiOutlineUsergroupAdd/></span> Join Group
                    </button>
                </div>
                </div>
                <div className={styles.groupContent}>
                    <div className={styles.photos}>
                            <h4>Photos</h4>
                            <div className="grid">

                            </div>
                    </div>
                    <div className={styles.posts}>

                    </div>
                    <div className={styles.about}>
                        <h4>About</h4>
                        <p>{group.description}</p>
                </div>
            </div>
        </div>
    )
}
