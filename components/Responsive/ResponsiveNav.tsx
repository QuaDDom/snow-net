import React from 'react'
import { BiConversation } from 'react-icons/bi'
import { RiGalleryLine, RiSearchLine } from 'react-icons/ri'
import { FaIgloo } from 'react-icons/fa';
import styles from './ResponsiveNav.module.scss'

export default function ResponsiveNav() {
  return (
    <div className={styles.responsiveNav}>
        <div className={styles.icons}>
            <span><FaIgloo/></span>
            <span><RiSearchLine/></span>
            <span><BiConversation/></span>
            <span><RiGalleryLine/></span>
        </div>
    </div>
  )
}
