import React, { useState } from 'react'
import { RiPencilFill } from 'react-icons/ri';
import NewPostModal from './NewPostModal';
import styles from './ResponsiveToPost.module.scss';

export default function ResposiveToPost() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

    return (
        <div className={styles.responsiveToPost}>
            <button className={styles.createPost} onClick={handleClick}>
                <RiPencilFill/>
            </button>
            {
                isOpen && <NewPostModal/>
            }
        </div>
    )
}
