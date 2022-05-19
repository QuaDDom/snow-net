import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import EditModal from '../modals/EditModal';
import styles from './PageStyle.module.scss';

interface Props{
    setPage: React.Dispatch<React.SetStateAction<number>>,
    loggedUser: any
}

export default function General({ setPage, loggedUser }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');

    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const handleOpen = ()=> {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    };
    return (
        <div className={styles.pageContainer}>
            {isOpen && <EditModal type={type} setIsOpen={setIsOpen} value={value} title={''} postId={''} userId={''}/>}
            {!isResponsive && 
            <button onClick={()=> setPage(0)} className={styles.back}><AiOutlineArrowLeft/></button>
            }
            <div className={styles.title}>General Account Settings</div>
            <hr />
            <div className={styles.settings}>
                <div className={styles.option}>
                    <h5>Name</h5>
                    <p>{loggedUser?.name} {loggedUser?.lastname}</p>
                    <button onClick={handleOpen}>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>Username</h5>
                    <p>@{loggedUser?.username}</p>
                    <button onClick={handleOpen}>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>Bio</h5>
                    <p>{loggedUser?.bio}</p>
                    <button onClick={handleOpen}>Edit</button>
                </div>
            </div>
        </div>
    )
}
