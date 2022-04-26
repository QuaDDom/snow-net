import React from 'react'
import styles from './NewPostModal.module.scss';

interface Props{
    loggedUser: any
}

export default function NewPostModal({ loggedUser }: Props) {
  return (
    <div className="newPostModal">
        <div className="modal">
            <div className="user">
                <img src="" alt="" />
            </div>
            <div className="input">

            </div>
            <div className="options">

            </div>
        </div>
    </div>
  )
}
