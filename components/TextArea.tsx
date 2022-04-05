import React from 'react';
import styles from './TextArea.module.scss';

interface Props{
  name: string,
  label: string,
  bg: string,
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>, type: string)=> void,
  inputRef: any,
  error: any
}

export default function TextArea({name, label, bg, handleChange, value, error}: Props) {
  return (
      <div className={styles.textAreaContainer}>
          <textarea 
          name={name} 
          id={name} 
          className={styles.textAreaComponent}
          placeholder=' '
          value={value}
          onChange={(e)=> handleChange(e, name)}
          />
          <label 
          htmlFor={name} 
          className={styles.labelComponent}
          >{label}</label>
      </div>
  );
}
