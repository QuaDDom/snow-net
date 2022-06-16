import axios from 'axios';
import Router from 'next/router';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import Person from '../Person';
import styles from './Suggestions.module.scss';
import noCover from '../../img/noCover.jpg';
import AuthContext from '../../context/AuthContext';

import SearchUsers from './SearchUsers';

export default function Suggestions() {
    const [randomUsersData, setRandomUsersData] = useState<any>([]);
    const [group, setGroup] = useState<any>(null);
    const { loggedUser } = useContext<any>(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('http://localhost:5000/api/users/get/all/3/8');
            setRandomUsersData([...data.data]);
            const randomGroup = await axios.get('http://localhost:5000/api/groups/random');
            setGroup({ ...randomGroup.data });
        };
        fetchData();
    }, []);

    return (
        <div className={styles.suggestionsContainer}>
            <SearchUsers />
            <div className={styles.border} />
            <div className={styles.groups}>
                <div className={styles.groupList}>
                    <h3>Suggested Groups</h3>
                    <div className={styles.groupGrid}>
                        {group && (
                            <div
                                className={styles.group}
                                onClick={() => Router.push(`/groups/${group._id}`)}>
                                <div className={styles.presentation}>
                                    <div className={styles.banner}>
                                        <img src={`${group.groupCover || noCover}`} />
                                    </div>
                                    <img
                                        className={styles.groupPic}
                                        src={group.groupPic}
                                        alt={group.title}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <p className={styles.title}>{group.title}</p>
                                    <div>
                                        <p
                                            className={
                                                styles.members
                                            }>{`${group.members.length} Members`}</p>
                                        {group.private ? (
                                            <p className={styles.type}>
                                                <span>
                                                    <RiGitRepositoryPrivateLine />
                                                </span>{' '}
                                                Private
                                            </p>
                                        ) : (
                                            <p className={styles.type}>
                                                <span>
                                                    <MdPublic />
                                                </span>{' '}
                                                Public
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.follow}>
                <h3>Who to follow</h3>
                <div className={styles.personList}>
                    {randomUsersData &&
                        randomUsersData.map((user: any) => (
                            <Person
                                name={user.name}
                                lastname={user.lastname}
                                image={user.profilePic}
                                id={user._id}
                                key={user._id}
                                username={user.username}
                                loggedUser={loggedUser}
                                friendReqs={user.friendReqs}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
