import React from 'react';
import ContentLoader from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';
import styles from '../Post.module.scss';

export default function LoadingPost() {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

    return (
        <div className={styles.postContainer}>
            <ContentLoader
                viewBox="0 0 350 70"
                speed={2}
                width={!isResponsive ? 325 : 470}
                height={!isResponsive ? 140 : 140}
                backgroundColor={'#424a51'}
                foregroundColor={'#77839a'}>
                <rect
                    x={!isResponsive ? '50' : '50'}
                    y={!isResponsive ? '8' : '8'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '88' : '88'}
                    height={!isResponsive ? '5.5' : '6.5'}
                />
                <rect
                    x={!isResponsive ? '148' : '148'}
                    y={!isResponsive ? '8' : '8'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '32' : '52'}
                    height={!isResponsive ? '5.5' : '6.5'}
                />
                <rect
                    x={!isResponsive ? '50' : '50'}
                    y={!isResponsive ? '30' : '30'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '230' : '250'}
                    height={!isResponsive ? '5' : '6'}
                />
                <rect
                    x={!isResponsive ? '290' : '310'}
                    y={!isResponsive ? '30' : '30'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '50' : '50'}
                    height={!isResponsive ? '5' : '6'}
                />
                <rect
                    x={!isResponsive ? '50' : '50'}
                    y={!isResponsive ? '45' : '45'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '100' : '100'}
                    height={!isResponsive ? '5' : '6'}
                />
                <rect
                    x={!isResponsive ? '160' : '160'}
                    y={!isResponsive ? '45' : '45'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '40' : '40'}
                    height={!isResponsive ? '5' : '6'}
                />
                <rect
                    x={!isResponsive ? '210' : '210'}
                    y={!isResponsive ? '45' : '45'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '130' : '130'}
                    height={!isResponsive ? '5' : '6'}
                />
                <rect
                    x={!isResponsive ? '0' : '0'}
                    y={!isResponsive ? '72' : '72'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '180' : '380'}
                    height={!isResponsive ? '5' : '6'}
                />
                <rect
                    x={!isResponsive ? '20' : '20'}
                    y={!isResponsive ? '88' : '88'}
                    rx="3"
                    ry="3"
                    width={!isResponsive ? '100' : '178'}
                    height={!isResponsive ? '5' : '6'}
                />
                <circle cx="22" cy="19" r="19" />
            </ContentLoader>
        </div>
    );
}
