import React from 'react'
import { AiOutlineGif } from 'react-icons/ai';
import { BiHappy, BiImageAlt, BiPoll } from 'react-icons/bi';
import styles from './NewPostModal.module.scss';

interface Props{
    loggedUser: any
}

export default function NewPostModal({ loggedUser }: Props) {
  return (
    <div className={styles.newPostModal}>
        <div className={styles.modal}>
            <div className={styles.user}>
                <img src="" alt="" />
            </div>
            <div className={styles.input}>
                <input type="text" />
            </div>
            <div className={styles.options}>
                <p onClick={()=>{}} className={styles.button}><BiHappy/></p> 
                <p onClick={()=>{}} className={styles.button}><AiOutlineGif/></p> 
                <input type="file" name="file" id="file" onChange={()=>{}}/>
                <label htmlFor="file" className={styles.button}><BiImageAlt/></label>
                <p onClick={()=>{}} className={styles.button}><BiPoll/></p>
            </div>
        </div>
    </div>
  )
}
