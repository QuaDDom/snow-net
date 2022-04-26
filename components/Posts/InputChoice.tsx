import React, { useState } from 'react'
import styles from './InputChoice.module.scss'

interface Props{
  label: string,
  setPoll: React.Dispatch<React.SetStateAction<any[]>>,
  index: number,
  poll: [any]
}

export default function InputChoice({label, setPoll, index, poll}: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
    if(index === 1){
      
    }
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
