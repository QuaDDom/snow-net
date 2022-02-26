import React, { useContext, useEffect } from 'react'
import Input from './Input'
import styles from '../styles/register.module.scss';
import AuthContext from '../context/AuthContext';
import TextArea from './TextArea';
import Button from './Button';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../validations/RegisterValidation';
import { yupResolver } from '@hookform/resolvers/yup';


export default function RegisterInputs() {
  const { handleChange, handleSubmit, values, loggedUser } = useContext<any>(AuthContext);

  const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
    mode: "onChange"
  });
    
  useEffect(()=>{
    if(loggedUser){
        Router.push('/')
    }
  },[loggedUser])

  return (
    <div className={styles.registerContainer}>
    <div className={styles.containerAll}>
      <div className={styles.register}>
          <div className={styles.registerText}>
            <h2>Register</h2>
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleFormSubmit(handleSubmit)}>
                <div className={styles.inputsCont}>
                    <div className={styles.separator}>
                      <Input 
                      type="text" 
                      label="Username" 
                      name="username" 
                      size={{width: 420, height: 45, fontSize: 20}}
                      handleChange={handleChange}
                      value={values.username}
                      inputRef={register}
                      error={errors.username}
                      />
                      <Input 
                      type="text" 
                      label="Name" 
                      name="name" 
                      size={{width: 420, height: 45, fontSize: 20}}
                      handleChange={handleChange}
                      value={values.name}
                      inputRef={register}
                      error={errors.name}
                      />
                      <Input 
                      type="text" 
                      label="Last Name" 
                      name="lastname" 
                      size={{width: 420, height: 45, fontSize: 20}}
                      handleChange={handleChange}
                      value={values.lastname}
                      inputRef={register}
                      error={errors.lastname}
                      />
                    </div>
                    <div className={styles.separator}>
                      <Input 
                      type="email" 
                      label="Email" 
                      name="email" 
                      size={{width: 420, height: 45, fontSize: 20}}
                      handleChange={handleChange}
                      value={values.email}
                      inputRef={register}
                      error={errors.email}
                      />
                      <Input 
                      type="password" 
                      label="Password" 
                      name="password" 
                      size={{width: 420, height: 45, fontSize: 20}}
                      handleChange={handleChange}
                      value={values.password}
                      inputRef={register}
                      error={errors.password}
                      />
                      <Input 
                      type="password" 
                      label="Repeat Password" 
                      name="reppassword" 
                      size={{width: 420, height: 45, fontSize: 20}}
                      handleChange={handleChange}
                      value={values.repeatPassword}
                      inputRef={register}
                      error={errors.reppassword}
                      />
                    </div>
                </div>
                <div className={styles.centerContent}>
                  <TextArea 
                  name="bio" 
                  label="Bio" 
                  bg="#0f0f0f"
                  handleChange={handleChange}
                  value={values.bio}
                  inputRef={register}
                  error={errors.bio}
                  />
                  <Button>Register</Button> 
                </div>
            </form>
          
          </div>  
      </div>
    </div>
  </div>
  )
}
