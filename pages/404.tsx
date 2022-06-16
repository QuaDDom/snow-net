import Router from 'next/router';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Layout from '../components/Layout';
import styles from '../styles/404.module.scss';

export default function Err404() {
    const handleClick = () => Router.push('/');

    return (
        <Layout title="404 - Not Found">
            <div className={styles.errContainer}>
                <div className={styles.bg}></div>
                <div className={styles.errorDesign}>
                    <h2>404</h2>
                    <h3>Page not found</h3>
                </div>
                <div className={styles.backButton}>
                    <button onClick={handleClick}>
                        Back to Home{' '}
                        <span>
                            <AiOutlineArrowRight />
                        </span>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
