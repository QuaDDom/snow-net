import React from 'react'
import AddComment from './AddComment';
import styles from './Comments.module.scss';

interface Props{
  loggedUser: any,
  fetchData: () => Promise<void>
}

export default function Comments({loggedUser, fetchData}: Props) {
  return (
    <div className="commentsContainer">
      <AddComment userData={loggedUser} fetchData={fetchData}/>
    </div>
  )
}
