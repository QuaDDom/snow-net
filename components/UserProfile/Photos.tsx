import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdOutlineNoPhotography } from 'react-icons/md';
import styles from './Photos.module.scss';

interface Props {
    userData: any;
}

export default function Photos({ userData }: Props) {
    const [dataImage, setDataImage] = useState([]);

    useEffect(() => {
        if (userData.posts) {
            setDataImage(
                userData.posts
                    .filter((post: any) => post.image)
                    .reverse()
                    .slice(0, 6)
            );
        } else {
            setDataImage(
                userData
                    .filter((post: any) => post.image)
                    .reverse()
                    .slice(0, 6)
            );
        }
        dataImage;
    }, [userData]);

    return (
        <div className={styles.photos}>
            <h4>Photos</h4>
            <div className={styles.grid}>
                {dataImage.map(({ image }: any, index: number) => (
                    <img src={image} key={image + index} />
                ))}
            </div>
            {dataImage.length < 1 && (
                <div className={styles.noPhotos}>
                    <span>
                        <MdOutlineNoPhotography />
                    </span>
                    <p>This profile has no photos yet</p>
                </div>
            )}
        </div>
    );
}
