import React from 'react';
import { Circles, Puff } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';
import styles from './Loader.module.scss';

export default function Loader() {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    return (
        <div className={styles.loaderContainer}>
            <Circles color="#8bffff" height={isResponsive ? 80 : 55} width={80} />
            <h3>Loading your images...</h3>
        </div>
    );
}
