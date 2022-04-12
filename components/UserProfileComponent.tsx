import React, { useContext, useState } from 'react'
import styles from '../styles/username.module.scss';
import AuthContext from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import Post from './Posts/Post';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { RiMailSendLine } from 'react-icons/ri';
import { AiOutlineCamera, AiOutlineConsoleSql } from 'react-icons/ai';
import axios from 'axios';
import ToPost from './Posts/ToPost';
import Photos from './UserProfile/Photos';
import dateFormat, { masks } from "dateformat";
import MutualFriends from './UserProfile/MutualFriends';
import { BsCalendarDateFill } from 'react-icons/bs';
import { MdPeople } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import UploadUserProfile from './Settings/modals/UploadUserProfile';
import UploadUserCover from './Settings/modals/UploadUserCover';
import Repost from './Posts/Repost';

interface Post{
    _id: string,
    userId: string,
    text: string,
    image: string,
    likes: [],
    createdAt: any,
    reposted: boolean,
    repostedPost: any,
    repostedBy: any,
    poll: any,
    pinned: boolean
    groupData: any
  }

interface Props{
    userData: any,
    username: any
}

export default function UserProfileComponent({userData, username}: Props) {
    const { loggedUser } = useContext<any>(AuthContext);
    const { fetchData } = usePosts({type: "all"});
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoggedUser, setIsLoggedUser] = useState(false);
    const [updatePfpModal, setUpdatePfpModal] = useState(false)
    const [newCoverPic, setNewCoverPic] = useState('');
    const [updateCoverModal, setUpdateCoverModal] = useState(false);



    const handleFollow = async ()=>{
        try{
            if(!isFollowed){
                await axios.put(`http://localhost:5000/api/users/${userData.user._id}/follow`, {
                    userId: loggedUser._id
                });
                setIsFollowed(true);
            } else{
                await axios.put(`http://localhost:5000/api/users/${userData.user._id}/unfollow`, {
                    userId: loggedUser._id
                });
                setIsFollowed(false);
            }
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        setIsFollowed(userData?.user.friendReqs.includes(loggedUser._id) ? true : false);
        setIsLoggedUser(loggedUser?._id === userData?.user._id ? true : false);
    },[userData, loggedUser])

    return (
        <>
        {updatePfpModal && <UploadUserProfile 
                                title="Upload Profile Picture"
                                value=""
                                userId={loggedUser._id}
                                setIsOpen={setUpdatePfpModal}
                           />}
        {updateCoverModal && <UploadUserCover
                                title="Upload Cover Picture"
                                value=""
                                userId={loggedUser._id}
                                setIsOpen={setUpdateCoverModal}
                                setNewCoverPic={setNewCoverPic}
                             />}
        { userData && <div className={styles.userProfileContainer}>
            <div className={styles.profile}>
                <div 
                className={`${styles.banner} ${isLoggedUser && styles.logged}`}
                onClick={()=> isLoggedUser && setUpdateCoverModal(true)}
                >
                    <img 
                    src={newCoverPic || userData.user.coverPic || 'noCover.jpg'} 
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.profilePic}>
                        <img src={userData.user.profilePic || 'noProfile.png'} />
                        {isLoggedUser && 
                        <span className={styles.editProfilePic} onClick={()=> setUpdatePfpModal(true)}>
                            <span><AiOutlineCamera/></span>
                        </span>
                        }
                    </div>
                    <div>
                        <h4>{`${userData.user.name} ${userData.user.lastname}`}</h4>
                        <p>{`@${username}`}</p>
                        {!isResponsive && <p className={styles.bio}>{userData.user.bio}</p>}
                    </div>
                    <div className={styles.buttons}>
                        {!isLoggedUser && <button><RiMailSendLine/></button>}
                        <button 
                        className={`${styles.follow} ${isLoggedUser && styles.editProfile}`}
                        onClick={handleFollow}>
                            {isLoggedUser 
                            ? "Edit Profile"
                            : isFollowed ? 'Following' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.about}>
                <div className={styles.leftColumn}>
                    <Photos userData={userData}/>
                    <MutualFriends friends={userData.user.friends}/>
                </div>
                <div className={styles.postsContainer}>
                    {isLoggedUser ?  <ToPost 
                    userData={loggedUser} 
                    fetchData={fetchData} 
                    /> : <h4>Last Posts</h4>}
                    <div className={styles.posts}>
                    {
                        userData && userData.posts.map((
                            {_id, text, image, userId, likes, createdAt,
                            reposted, repostedPost, repostedBy, poll, pinned, groupData}: Post, index: number)=>(
                              <>
                            {
                              reposted ?
                              <Repost 
                              _id={_id} 
                              text={text} 
                              image={image} 
                              key={_id} 
                              userId={userId} 
                              likes={likes}
                              fetchData={fetchData}
                              loggedUser={loggedUser}
                              createdAt={createdAt}
                              repostedPost={repostedPost}
                              repostedBy={repostedBy}
                              poll={poll}
                              /> :
                              <Post 
                              _id={_id} 
                              text={text} 
                              image={image}
                              key={_id} 
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
                            }
                            </>
                          ))
                        }
                    </div>
                </div>
             {isResponsive && <div className={styles.bio}>
                    <h4>Bio</h4>
                    <p>{userData.user.bio}</p>
                    <div className={styles.info}>
                        <p><span><BsCalendarDateFill/></span> Joined in: {dateFormat(userData.user.createdAt, "yyyy mmmm dS")}</p>
                    </div>
                </div>}
            </div>
        </div>}
        </>
    )
}
