import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import Person from './Person';
import styles from './Suggestions.module.scss';
import noCover from '../img/noCover.jpg';

export default function Suggestions() {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [group, setGroup] = useState<any>(null);

  useEffect(()=>{
    const fetchData = async ()=>{
      const usersData = await axios.get('http://localhost:5000/api/users/get/all');
      const randomGroup = await axios.get('http://localhost:5000/api/groups/random');
      setAllUsers([usersData.data[0], usersData.data[1], usersData.data[3]]);
      setGroup({...randomGroup.data});
    }
    fetchData();
  },[])

  return (
      <div className={styles.suggestionsContainer}>
        <div className={styles.border}/>
          <div className={styles.groups}>
            <div className={styles.groupList}>
              <h3>Suggested Groups</h3>
              <div className={styles.groupGrid}>
                { group && <div className={styles.group}>
                  <div className={styles.presentation}>
                    <div 
                    className={styles.banner} 
                    style={{
                      background: `url(${group.groupCover || noCover})`,
                    }}
                    />
                    <img 
                    src={group.groupPic} 
                    alt={group.title} 
                    onClick={()=> Router.push(`/groups/${group._id}`)}
                    />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.title}>{group.title}</p>
                    <div>
                      <p className={styles.members}>{`${group.members.length} Members`}</p>
                      {group.private
                        ? <p className={styles.type}><span><RiGitRepositoryPrivateLine/></span> Private</p>
                        : <p className={styles.type}><span><MdPublic/></span> Public</p>
                      }
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
          <div className={styles.follow}>
            <h3>Who to follow</h3>
            <div className={styles.personList}>
              {
                allUsers && allUsers.map((user: any)=>(
                  <Person 
                  name={user.name} 
                  lastname={user.lastname} 
                  image={user.profilePic} 
                  id={user._id}
                  key={user._id}
                  username={user.username}
                  />
                ))
              }
            </div>
          </div>
      </div>
  );
}
