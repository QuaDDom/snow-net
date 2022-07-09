import React from 'react';
import { BiConversation } from 'react-icons/bi';
import { RiGalleryLine, RiSearchLine } from 'react-icons/ri';
import { FaIgloo } from 'react-icons/fa';
import styles from './ResponsiveNav.module.scss';
import NavLink from 'next/link';
import { BsPeopleFill } from 'react-icons/bs';

export default function ResponsiveNav() {
    return (
        <div className={styles.responsiveNav}>
            <div className={styles.icons}>
                <NavLink href="/">
                    <FaIgloo />
                </NavLink>
                <NavLink href="/groups/all">
                    <BsPeopleFill />
                </NavLink>
                <NavLink href="/messages">
                    <BiConversation />
                </NavLink>
                <NavLink href="/gallery/all">
                    <RiGalleryLine />
                </NavLink>
            </div>
        </div>
    );
}
