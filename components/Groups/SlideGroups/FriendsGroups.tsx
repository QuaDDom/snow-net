import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Slider from 'react-slick';
import GroupCard from './GroupCard';
import styles from './GroupsSlide.module.scss';

let settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
  };

export default function FriendsGroups() {
    const [groups, setGroups] = useState<any>([])

    const fetchGroups = async ()=>{
        try{
            const groupsData = await axios.get('http://localhost:5000/api/groups');
            setGroups([...groupsData.data]);
            console.log(groupsData.data)
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchGroups();
    },[])

    return (
      <div className={styles.slideContainer}>
      <h3 className={styles.title}>Friends Groups</h3>
      <p>Groups where your friends are</p>
      <div className={styles.slide}>
          <Slider {...settings}>
              {
                  groups.map(({title, description, groupPic, groupCover,
                               private: groupPrivate, members}: any)=>(
                      <GroupCard 
                          title={title} 
                          description={description} 
                          groupPic={groupPic}
                          groupCover={groupCover}
                          groupPrivate={groupPrivate}
                          members={members}
                      />
                  ))
              }
          </Slider>
        </div>
    </div>
    )
}
