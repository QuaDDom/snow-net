import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import EditModal from '../modals/EditModal';
import styles from './PageStyle.module.scss';

interface Props{
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function General({ setPage }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');

    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    const handleOpen = ()=> {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    };
    return (
        <div className={styles.pageContainer}>
            {isOpen && <EditModal type={type} setIsOpen={setIsOpen} value={value}/>}
            {!isResponsive && 
            <button onClick={()=> setPage(0)} className={styles.back}><AiOutlineArrowLeft/></button>
            }
            <div className={styles.title}>General Account Settings</div>
            <hr />
            <div className={styles.settings}>
                <div className={styles.option}>
                    <h5>Name</h5>
                    <p>John Doe</p>
                    <button onClick={handleOpen}>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>Username</h5>
                    <p>@johndoe</p>
                    <button onClick={handleOpen}>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>Bio</h5>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, incidunt.</p>
                    <button onClick={handleOpen}>Edit</button>
                </div>
            </div>
        </div>
    )
}
