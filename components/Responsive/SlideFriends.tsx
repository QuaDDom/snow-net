import React from 'react';
import Slider from "react-slick";
import { useTouch } from '../../hooks/useTouch';
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
            <div className={styles.slide}>
                <Slider {...settings}>
                    {
                        users.map(({profilePic, username, name, lastname}: any)=>(
                            <User 
                            profilePic={profilePic} 
                            name={name + '' + lastname}
                            username={username}
                            key={profilePic}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
