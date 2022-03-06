import React, { useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdBlock, MdOutlineReport } from 'react-icons/md';
import { RiDeleteBin5Line, RiEditLine, RiUserFollowLine, RiVolumeMuteLine } from 'react-icons/ri';
import styles from './CommentDots.module.scss';

interface Props{
  username: string,
  loggedUserId: string,
  userId: string,
  postId: string,
  fetchData: () => Promise<void>,
  handleModal: ()=> void,
  deletePost: () => Promise<void>
}

export default function CommentDots({username, userId, loggedUserId, handleModal, postId, fetchData}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

  return (
  <>
      <div className={styles.postDotsContainer}>
          <span onClick={handleClick} className={styles.dots}><HiDotsHorizontal/></span>
          {
              isOpen && userId === loggedUserId && 
              <div className={styles.options}>
                  <div className={`${styles.option} ${styles.delete}`}>
                      <span><RiDeleteBin5Line/></span>
                      <p>Delete Comment</p>
                  </div>
                  <div className={styles.option}>
                      <span><RiEditLine/></span>
                      <p>Edit Comment</p>
                  </div>
  
              </div>
          }
          {
              isOpen && userId !== loggedUserId && 
              <div className={styles.options}>
                  <div className={styles.option}>
                      <span><RiUserFollowLine/></span>
                      <p>Follow @{username}</p>
                  </div>
                  <div className={styles.option}>
                      <span><RiVolumeMuteLine/></span>
                      <p>Mute @{username}</p>
                  </div>
                  <div className={styles.option}>
                      <span><MdBlock/></span>
                      <p>Block @{username}</p>
                  </div>
                  <div className={styles.option}>
                      <span><MdOutlineReport/></span>
                      <p>Report this comment</p>
                  </div>
              </div>
          }
      </div>
  </>
  )
}
