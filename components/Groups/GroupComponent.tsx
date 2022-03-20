import React, { useState } from 'react'
import styles from '../../styles/group.module.scss';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'; 
import { MdPublic } from 'react-icons/md'; 
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import ToPost from '../Posts/ToPost';
import Post from '../Posts/Post';
import { useMediaQuery } from 'react-responsive';

export default function GroupComponent({group}: {group: any}) {
    const [isJoined, setIsJoined] = useState(false);
    const [membersProfile, setMembersProfile] = useState<any>([]);
    const [groupPosts, setGroupPosts] = useState<any>([]);
    const { loggedUser } = useContext<any>(AuthContext)
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

    const fetchData = async ()=>{
        try{
            const res = await axios.get(`http://localhost:5000/api/posts/group/${group._id}`);
            setGroupPosts([...res.data]);
        } catch(err){
            console.log(err);
        }
    }

    const handleJoin = async ()=>{
        try{
            await axios.put(`http://localhost:5000/api/groups/join/${group._id}`, {
                userId: loggedUser._id
            });
            isJoined ? setIsJoined(false) : setIsJoined(true);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        setIsJoined(group.members.includes(loggedUser?._id) ? true : false);
        console.log(group.members)
        const fetchMembersData = ()=>{
            const profiles: any = [];
            group.members.map( async (userId: string) => {
                const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
                profiles.push(res.data.profilePic);
                setMembersProfile([...profiles]);
            });
        }
        fetchMembersData();
        fetchData();
    },[group, loggedUser])

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
                    {
                        membersProfile.map((profile:string)=>(
                            <div className={styles.member}>
                                <img src={profile} className={styles.memberProfile} />
                            </div>
                        ))
                    }
                </div>
                <div className={styles.options}>
                    <button className={`${styles.join} ${isJoined && styles.joined}`} onClick={handleJoin}>
                        <span><AiOutlineUsergroupAdd/></span>
                        {isJoined ? "Joined" : "Join Group"}
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
                        <ToPost userData={loggedUser} fetchData={fetchData} group={group}/>
                        <div className={styles.postsContainer}>
                            {
                            groupPosts.map((
                                {_id, text, image, userId, likes,
                                createdAt, repostedBy, poll, pinned, groupData }: any)=>(
                                <Post 
                                _id={_id} 
                                text={text} 
                                image={image} key={_id} 
                                userId={userId} 
                                likes={likes}
                                fetchData={fetchData}
                                loggedUser={loggedUser}
                                createdAt={createdAt}
                                repostedBy={repostedBy}
                                poll={poll}
                                pinned={pinned}
                                group={groupData}
                                />
                            ))
                            }
                        </div>
                    </div>
                    {isResponsive && <div className={styles.about}>
                        <h4>About</h4>
                        <p>{group.description}</p>
                    </div>}
            </div>
        </div>
    )
}
