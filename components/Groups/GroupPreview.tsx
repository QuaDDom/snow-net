import React from 'react'
import { MdPublic } from 'react-icons/md'
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'
import styles from './GroupPreview.module.scss'

interface Props{
    groupType: string,
    title: string,
    coverPic?: string,
    groupPic?: string,
    description: string
}

export default function GroupPreview({groupType, title, coverPic, groupPic}: Props) {
  return (
    <div className={styles.groupPreviewContainer}>
        <div className={styles.preview}>
            <h3>Preview</h3>
            <div className={styles.groupContainer}>
                <div className={styles.banner}>
                    <img src={coverPic}/>
                </div>
                <div className={styles.info}>
                    {groupPic && <img src={groupPic}/>}
                    <div className={styles.textInfo}>
                        <h4>{title}</h4>
                        <div>
                            {   groupType === "private"
                                ? <p><span><RiGitRepositoryPrivateLine/></span> Private</p>
                                : <p><span><MdPublic/></span> Public</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
