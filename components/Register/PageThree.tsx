import React from 'react'
import Input from '../Input'

interface Props{
    handleChange: ()=> void,
    values: any,
    register: any,
    errors: any
}

export default function PageThree({handleChange, values, register, errors}: Props) {
  return (
    <div>
        <Input 
        type="text" 
        label="Name" 
        name="name" 
        size={{width: '20vw', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.name}
        inputRef={register}
        error={errors.name}
        />
        <Input 
        type="text" 
        label="Last Name" 
        name="lastname" 
        size={{width: '20vw', height: 52, fontSize: 18}}
        handleChange={handleChange}
        value={values.lastname}
        inputRef={register}
        error={errors.lastname}
        />
    </div>
  )
}
