import React, { useState } from 'react';
import styles from '../../styles/group.module.scss';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { MdPeople, MdPublic } from 'react-icons/md';
import { AiOutlineCamera, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import ToPost from '../Posts/ToPost';
import Post from '../Posts/Post';
import { useMediaQuery } from 'react-responsive';
import Photos from '../UserProfile/Photos';
import { BsCalendarDateFill, BsPeopleFill } from 'react-icons/bs';
import dateFormat from 'dateformat';
import GroupMembers from './GroupMembers';
import UploadGroupCover from '../Settings/modals/UploadGroupCover';
import UploadGroupProfile from '../Settings/modals/UploadGroupProfile';

export default function GroupComponent({ group }: { group: any }) {
    const [isJoined, setIsJoined] = useState(false);
    const [membersProfile, setMembersProfile] = useState<any>([]);
    const [groupPosts, setGroupPosts] = useState<any>([]);
    const { loggedUser } = useContext<any>(AuthContext);
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const [isAdmin, setIsAdmin] = useState(false);
    const [updatePfpModal, setUpdatePfpModal] = useState(false);
    const [newCoverPic, setNewCoverPic] = useState('');
    const [updateCoverModal, setUpdateCoverModal] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://snow-net.herokuapp.com/api/posts/group/${group._id}`
            );
            setGroupPosts([...res.data]);
            res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleJoin = async () => {
        try {
            await axios.put(`https://snow-net.herokuapp.com/api/groups/join/${group._id}`, {
                userId: loggedUser?._id
            });
            isJoined ? setIsJoined(false) : setIsJoined(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setIsJoined(group.members.includes(loggedUser?._id) ? true : false);

        const fetchMembersData = () => {
            const profiles: any = [];
            group.members.map(async (userId: string) => {
                const res = await axios.get(`https://snow-net.herokuapp.com/api/users/${userId}`);
                profiles.push(res.data.profilePic);
                setMembersProfile([...profiles]);
            });
        };

        if (group.admins.includes(loggedUser?._id)) {
            setIsAdmin(true);
        }

        fetchMembersData();
        fetchData();
    }, [group, loggedUser]);

    return (
        <>
            {updatePfpModal && (
                <UploadGroupProfile
                    title="Upload Group Picture"
                    value=""
                    groupId={group?._id}
                    setIsOpen={setUpdatePfpModal}
                    userId={loggedUser?._id}
                />
            )}
            {updateCoverModal && (
                <UploadGroupCover
                    title="Upload Cover Picture"
                    value=""
                    groupId={group?._id}
                    setIsOpen={setUpdateCoverModal}
                    setNewCoverPic={setNewCoverPic}
                    userId={loggedUser?._id}
                />
            )}
            <div className={styles.groupContainer}>
                <div className={styles.profile}>
                    <div
                        className={`${styles.banner} ${isAdmin && styles.logged}`}
                        onClick={() => isAdmin && setUpdateCoverModal(true)}>
                        <img src={group.groupCover || './noCover.jpg'} alt="" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.groupPic}>
                            <img src={group.groupPic || './noProfile.png'} alt="" />
                            {isAdmin && (
                                <span
                                    className={styles.editProfilePic}
                                    onClick={() => setUpdatePfpModal(true)}>
                                    <span>
                                        <AiOutlineCamera />
                                    </span>
                                </span>
                            )}
                        </div>
                        <div className={styles.textInfo}>
                            <h4>{group.title}</h4>
                            <div>
                                {group.private ? (
                                    <p>
                                        <span>
                                            <RiGitRepositoryPrivateLine />
                                        </span>{' '}
                                        Private
                                    </p>
                                ) : (
                                    <p>
                                        <span>
                                            <MdPublic />
                                        </span>{' '}
                                        Public
                                    </p>
                                )}
                                <p>
                                    <span>
                                        <BsPeopleFill />
                                    </span>{' '}
                                    {`${group.members.length} Members`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.members}>
                        {membersProfile.map((profile: string) => (
                            <div className={styles.member} key={profile}>
                                <img src={profile} className={styles.memberProfile} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.options}>
                        <button
                            className={`${styles.join} ${isJoined && styles.joined}`}
                            onClick={handleJoin}>
                            <span>
                                <AiOutlineUsergroupAdd />
                            </span>
                            {isJoined ? 'Joined' : 'Join Group'}
                        </button>
                    </div>
                </div>
                <div className={styles.groupContent}>
                    <div>
                        <Photos userData={groupPosts} />
                        <GroupMembers members={group.members} />
                    </div>
                    <div className={styles.posts}>
                        {isJoined && (
                            <ToPost userData={loggedUser} fetchData={fetchData} group={group} />
                        )}
                        <div className={styles.postsContainer}>
                            {groupPosts.map(
                                ({
                                    _id,
                                    text,
                                    image,
                                    userId,
                                    likes,
                                    createdAt,
                                    repostedBy,
                                    poll,
                                    pinned,
                                    groupData
                                }: any) => (
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
                                )
                            )}
                        </div>
                    </div>
                    {isResponsive && (
                        <div className={styles.about}>
                            <h4>About</h4>
                            <p>{group.description}</p>
                            <div className={styles.info}>
                                <p>
                                    <span>
                                        <BsPeopleFill />
                                    </span>{' '}
                                    {`${group.members.length} Members`}
                                </p>
                                <p>
                                    <span>
                                        <BsCalendarDateFill />
                                    </span>
                                    Created at {dateFormat(group.createdAt, 'yyyy mmmm dS')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
