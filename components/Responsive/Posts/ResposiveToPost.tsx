import React, { useContext, useState } from 'react'
import { RiPencilFill, RiQuillPenFill } from 'react-icons/ri';
import AuthContext from '../../../context/AuthContext';
import NewPostModal from './NewPostModal';
import styles from './ResponsiveToPost.module.scss';

export default function ResposiveToPost() {
    const [isOpen, setIsOpen] = useState(false);
    const { loggedUser, setLoggedUser } = useContext<any>(AuthContext);

    const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

    return (
        <div className={styles.responsiveToPost}>
            <button className={styles.createPost} onClick={handleClick}>
                <RiQuillPenFill/>
            </button>
            {
                isOpen && <NewPostModal loggedUser={loggedUser}/>
            }
        </div>
    )
}
