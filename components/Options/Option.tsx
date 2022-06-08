import Router from 'next/router';
import React from 'react';
import styles from './Option.module.scss';

interface Props {
    Icon?: any;
    title: string;
    href: string;
    img?: any;
}

export default function Option({ Icon, title, href }: Props) {
    return (
        <div className={styles.optionContainer} onClick={() => Router.push(href)}>
            <span>
                <Icon />
            </span>
            <h5>{title}</h5>
            <span></span>
        </div>
    );
}
