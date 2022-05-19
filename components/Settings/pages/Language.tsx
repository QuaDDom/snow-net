import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoLanguage } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import styles from './PageStyle.module.scss';

interface Props{
    setPage: React.Dispatch<React.SetStateAction<number>>,
    loggedUser: any
}

export default function Language({ setPage }: Props) {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    return (
        <div className={styles.pageContainer}>
            {!isResponsive && 
            <button onClick={()=> setPage(0)} className={styles.back}><AiOutlineArrowLeft/></button>
            }
            <div className={styles.title}>Language & Region</div>
            <hr />
            <div className={styles.settings}>
                <div className={styles.option}>
                    <h5><span><IoLanguage/></span> Snow Language</h5>
                    <p>English</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5><span><BiWorld/></span> Region</h5>
                    <p>Argentina</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5><span><BsFillPeopleFill/></span> Auto Translate Posts</h5>
                    <p>English</p>
                    <button>Edit</button>
                </div>
            </div>
        </div>
    )
}
