import React from 'react'
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import styles from './GroupCard.module.scss';

interface Props{
    title: string,
    description: string,
    groupPic: string,
    groupCover: string,
    groupPrivate: any,
    members: [string]
}

export default function GroupCard({title, description, groupPic, groupCover, groupPrivate, members}: Props) {
  return (
    <div className={styles.groupCardContainer}>
        <div className={styles.coverImg}>
            <img src={groupCover} alt={title} />
        </div>
        <div className={styles.content}>
            <div className={styles.groupPic}>
                <img src={groupPic} alt={title} />
            </div>
            <div className={styles.principal}>
                <h4>Group Title</h4>
                <div className={styles.sub}>
                    <p>{members.length} Members</p>
                    {groupPrivate
                        ? <p className={styles.type}><span><RiGitRepositoryPrivateLine/></span> Private</p>
                        : <p className={styles.type}><span><MdPublic/></span> Public</p>
                    }
                </div>
            </div>
            <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quasi.</p>
            <div className={styles.buttonContainer}>
                <button>Join</button>
            </div>
        </div>
    </div>
  )
}
