import React from 'react'
import Input from '../Input'

interface Props{
    handleChange: ()=> void,
    values: any,
    register: any,
    errors: any,
    isResponsive: boolean
}


export default function PageOne({handleChange, values, register, errors}: Props) {
  return (
    <div>
        <Input 
          type="text" 
          label="Username" 
          name="username" 
          size={{width: '20vw', height: 52, fontSize: 18}}
          handleChange={handleChange}
          value={values.username}
          inputRef={register}
          error={errors.username}
        />
        <Input 
            type="email" 
            label="Email" 
            name="email" 
            size={{width: '20vw', height: 52, fontSize: 18}}
            handleChange={handleChange}
            value={values.email}
            inputRef={register}
            error={errors.email}
          />
    </div>
  )
}
