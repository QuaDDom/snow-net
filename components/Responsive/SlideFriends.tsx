import React from 'react';
import Slider from "react-slick";
import User from './SlideContent/User';
import styles from './SlideFriends.module.scss';

interface Props{
    users: any
}

let settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
};

export default function SlideFriends({ users }: Props) {
    console.log(users)
    return (
        <div className={styles.slideFriendsContainer}>
            <h3>Who to follow</h3>
            <div className={styles.slider}>
                <Slider {...settings}>
                    {
                        users.map(({profilePic, username, name, lastname, _id}: any, index: number)=>(
                            <User 
                            profilePic={profilePic} 
                            name={name + '' + lastname}
                            username={username}
                            key={_id}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
