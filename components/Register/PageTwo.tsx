import React from 'react'
import Input from '../Input'

interface Props{
  handleChange: ()=> void,
  values: any,
  register: any,
  errors: any
}

export default function PageTwo({handleChange, values, register, errors}: Props) {
  return (
    <div>
        <Input 
        type="password" 
        label="Password" 
        name="password" 
        size={{width: 520, height: 45, fontSize: 20}}
        handleChange={handleChange}
        value={values.password}
        inputRef={register}
        error={errors.password}
        />
        <Input 
        type="password" 
        label="Repeat Password" 
        name="reppassword" 
        size={{width: 520, height: 45, fontSize: 20}}
        handleChange={handleChange}
        value={values.repeatPassword}
        inputRef={register}
        error={errors.reppassword}
        />
    </div>
  )
}
