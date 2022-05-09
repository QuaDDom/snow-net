import React, { useContext } from 'react';
import styles from './OptionsBar.module.scss';
import { CgProfile } from 'react-icons/cg';
import { BsPeopleFill } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { RiGalleryLine, RiSearchLine } from 'react-icons/ri'
import Option from './Option';
import AuthContext from '../../context/AuthContext';
import { FaHandsHelping } from 'react-icons/fa';

export default function OptionsBar() {
  const { loggedUser } = useContext<any>(AuthContext);

  return (
    <div className={styles.optionsBarContainer}>
      <div className={styles.options}>
        {loggedUser && <Option title="Profile" Icon={CgProfile} href={"/user/" + loggedUser.username}/>}
        <Option title="Explore" Icon={RiSearchLine} href="/explore"/>
        <Option title="Messages" Icon={BiMessageDetail} href="/messages"/>
        <Option title="Gallery" Icon={RiGalleryLine} href="/gallery/all"/>
        <Option title="Groups" Icon={BsPeopleFill} href="/groups/discover"/>
        <Option title="Donations" Icon={FaHandsHelping} href="/donations"/>
      </div>
    </div>
  )
}
