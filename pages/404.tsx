import React from 'react';
import styles from '../styles/404.module.scss';

export default function Err404() {
  return (
    <div className={styles.errContainer}>
        <div className={styles.backButton}>
            <button></button>
        </div>
        <div className={styles.errorDesign}>
            <h2>404</h2>
            <h3>Page not found</h3>
        </div>
    </div>
  );
}
