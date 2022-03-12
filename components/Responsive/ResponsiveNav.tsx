import React from 'react'
import { BiConversation } from 'react-icons/bi'
import { RiGalleryLine, RiSearchLine } from 'react-icons/ri'
import { FaIgloo } from 'react-icons/fa';
import styles from './ResponsiveNav.module.scss'
import NavLink from 'next/link'; 

export default function ResponsiveNav() {
  return (
    <div className={styles.responsiveNav}>
        <div className={styles.icons}>
            <NavLink href="/"><FaIgloo/></NavLink>
            <NavLink href="/explore"><RiSearchLine/></NavLink>
            <NavLink href="/messages"><BiConversation/></NavLink>
            <NavLink href="/gallery"><RiGalleryLine/></NavLink>
        </div>
    </div>
  )
}
