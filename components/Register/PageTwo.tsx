import React from 'react'
import Input from '../Input'

interface Props{
  handleChange: ()=> void,
  values: any,
  register: any,
  errors: any,
  isResponsive: boolean
}

export default function PageTwo({handleChange, values, register, errors}: Props) {
  return (
    <div>
        <Input 
        type="password" 
        label="Password" 
        name="password" 
        size={{width: '20vw', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.password}
        inputRef={register}
        error={errors.password}
        />
        <Input 
        type="password" 
        label="Repeat Password" 
        name="reppassword" 
        size={{width: '20vw', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.repeatPassword}
        inputRef={register}
        error={errors.reppassword}
        />
    </div>
  )
}
