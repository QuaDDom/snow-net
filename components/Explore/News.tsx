import React from 'react'
import styles from '../../styles/explore.module.scss';
import Image from 'next/image';

interface Props{
    title: string,
    img: string,
    topic: string
}

export default function News({title, img, topic}: Props) {
  return (
    <div className={styles.worldNews}>
        <Image src={img} alt={title} />
        <div>
            <p>{topic} News</p>
            <h4>{title}</h4>
        </div>
    </div>
  )
}
