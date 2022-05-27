import React, { useState } from 'react'
import styles from './InputChoice.module.scss'

interface Props{
  label: string,
  setPoll: React.Dispatch<React.SetStateAction<any[]>>,
  index: number,
  poll: [any],
  value: any,
  setValue: any
}

export default function InputChoice({label, setPoll, index, poll, value, setValue}: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
  } 

  return (
    <div className={styles.inputChoice}>
          <input 
          type="text" 
          className={styles.inputComponent}
          placeholder=' '
          onChange={handleChange}
          value={value}
          />
          <label className={styles.labelComponent}>{label}</label>
    </div>
  )
}
