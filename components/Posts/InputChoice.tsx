import React, { useState } from 'react'
import styles from './InputChoice.module.scss'

interface Props{
  label: string,
  setPoll: React.Dispatch<React.SetStateAction<never[]>>,
  index: number
}

export default function InputChoice({label, setPoll, index}: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
  } 

  return (
    <div className={styles.inputChoice}>
          <input 
          type="text" 
          className={styles.inputComponent}
          placeholder=' '
          value={value}
          onChange={handleChange}
          />
          <label className={styles.labelComponent}>{label}</label>
    </div>
  )
}
