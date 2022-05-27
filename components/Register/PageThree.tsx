import React from 'react'
import Input from '../Input'
import ErrorMessage from './Errors/ErrorMessage'
import styles from './PageThree.module.scss'

interface Props{
    handleChange: ()=> void,
    values: any,
    register: any,
    errors: any,
    isResponsive: boolean,
    handleSubmit: any
}

export default function PageThree({handleChange, values, register, errors, handleSubmit}: Props) {
  return (
    <>
        <Input 
        type="text" 
        label="Name" 
        name="name" 
        size={{width: '384px', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.name}
        inputRef={register}
        error={{}}
        />
        {errors.name && <ErrorMessage error={errors.name?.message}/>}
        <Input 
        type="text" 
        label="Last Name" 
        name="lastname" 
        size={{width: '384px', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.lastname}
        inputRef={register}
        error={{}}
        />
        {errors.lastname && <ErrorMessage error={errors.lastname?.message}/>}
        <button className={styles.register} type="submit">Register</button>
    </>
  )
}
