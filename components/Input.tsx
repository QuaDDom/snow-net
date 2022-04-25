import React, {} from 'react';
import styles from './Input.module.scss';

interface Props{
  type: string,
  label: string,
  name: string,
  bg?: string,
  size: {
    width: number | string,
    height: number | string,
    fontSize: number
  },
  value: string,
  inputRef: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, type: string)=> void,
  error: any
}

export default function Input({type, label, name, bg, size, value, handleChange, inputRef, error}: Props) {

  return (
      <div className={styles.inputContainer} style={{
        width: size.width,
        height: size.height
      }}>
        <input 
        {...inputRef(name, value)}
        type={type} 
        className={`${styles.inputComponent} ${error && styles.error}`} 
        name={name} 
        value={value} 
        onChange={(e)=> handleChange(e, name)}
        placeholder=' '
        style={{
          fontSize: size.fontSize
        }}
        />
        <label
        className={`${styles.labelComponent} ${error?.message && styles.error}`}
        style={{
          background: bg,
          fontSize: size.fontSize
        }}
        >{!error?.message ? label : error.message}</label>

      </div>
  );
}
