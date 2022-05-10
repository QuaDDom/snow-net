import React from 'react'
import Input from '../Input'
import ErrorMessage from './Errors/ErrorMessage'

interface Props{
  handleChange: ()=> void,
  values: any,
  register: any,
  errors: any,
  isResponsive: boolean
}

export default function PageTwo({handleChange, values, register, errors}: Props) {
  return (
    <>
        <Input 
        type="password" 
        label="Password" 
        name="password" 
        size={{width: '20vw', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.password}
        inputRef={register}
        error={{}}
        />
      {errors.password && <ErrorMessage error={errors.password.message}/>}
        <Input 
        type="password" 
        label="Repeat Password" 
        name="reppassword" 
        size={{width: '20vw', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.repeatPassword}
        inputRef={register}
        error={{}}
        />
      {errors.reppassword && <ErrorMessage error={errors.reppassword.message}/>}
    </>
  )
}
