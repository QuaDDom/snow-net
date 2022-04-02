import styles from './ProgressBar.module.scss';
import React from 'react'

interface Props{
    progress: number,
    url?: string
}

export default function ProgressBar({url, progress}: Props) {

    return (
        <div className={styles.progressBar} style={{width: progress + "%"}}/>
    )
}
