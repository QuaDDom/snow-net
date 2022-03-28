import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import styles from './Modals.module.scss';

interface Props{
  type: string,
  value: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  title: string
}

export default function EditModal({type, value, setIsOpen, title}: Props) {
  const [inputVal, setInputVal] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputVal(e.target.value);
  }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.closeOverlay}></div>
        <div className={styles.editModal}>
          <button className={styles.close} onClick={()=> setIsOpen(false)}><CgClose/></button>
            <h4 className={styles.title}>{title}</h4>
            <input type="text" value={inputVal} onChange={handleChange}/>
            <button className={styles.save}>Save</button>
        </div>
    </div>
  )
}
