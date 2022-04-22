import React from 'react'
import styles from './PageDots.module.scss';

interface Props{
    page: number
}

export default function PageDots({page}: Props) {
    return (
        <div className={styles.dotsContainer}>
            <span className={`
            ${page === 1 && styles.one} 
            ${page === 2 && styles.two} 
            ${page === 3 && styles.three}
            `}></span>
            <div className={`${styles.dot} ${page >= 1 && styles.active}`}>1</div>
            <div className={`${styles.dot} ${page >= 2 && styles.active}`}>2</div>
            <div className={`${styles.dot} ${page >= 3 && styles.active}`}>3</div>
        </div>
    )
}
