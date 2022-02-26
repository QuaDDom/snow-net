import React, { useContext } from 'react'
import styles from '../styles/username.module.scss';
import AuthContext from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import Post from './Post';

interface Post{
    _id: string,
    userId: string,
    text: string,
    img: string,
    likes: [],
}

interface Props{
    userData: any,
    username: any
}

export default function UserProfileComponent({userData, username}: Props) {
    const { loggedUser } = useContext<any>(AuthContext);
    const { fetchData } = usePosts({type: "all"});

    console.log(userData);

    return (
        <>
        { userData && <div className={styles.userProfileContainer}>
            <div className={styles.profile}>
                <div className={styles.banner}>
                    <img src={userData.user.coverPic || 'noCover.jpg'} alt="" />
                </div>
                <div className={styles.info}>
                    <img src={userData.user.profilePic || 'noProfile.png'} alt="" />
                    <div>
                        <h4>{`${userData.user.name} ${userData.user.lastname}`}</h4>
                        <p>{`@${username}`}</p>
                    </div>
                </div>
            </div>
            <div className={styles.about}>
                <div className={styles.photos}>
                    <h4>Photos</h4>
                    <div className="grid">

                    </div>
                </div>
                <div className={styles.postsContainer}>
                    <h4>Last Posts</h4>
                    <div className={styles.posts}>
                    {
                        userData && userData.posts.map(({_id, text, img, userId, likes}: Post)=>(
                            <Post 
                            _id={_id} 
                            text={text} 
                            img={img} key={_id} 
                            userId={userId} 
                            likes={likes}
                            fetchData={fetchData}
                            loggedUser={loggedUser}
                            />
                        ))
                    }
                    </div>
                </div>
                <div className={styles.bio}>
                    <h4>Bio</h4>
                    <p>{userData.user.bio}</p>
                </div>
            </div>
        </div>}
        </>
    )
}
