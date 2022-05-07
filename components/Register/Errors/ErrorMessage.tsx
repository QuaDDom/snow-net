import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdError } from 'react-icons/md';
import styles from './ErrorMessage.module.scss';

interface Props{
    error: string
}

export default function ErrorMessage({error}: Props) {
  return (
    <div className={styles.message}>
        <span><MdError/></span>
        <p>{error}</p>
    </div>
  )
}
