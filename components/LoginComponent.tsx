import React, { useContext, useEffect } from 'react'
import Button from './Button'
import Input from './Input'
import styles from '../styles/login.module.scss';
import AuthContext from '../context/AuthContext';
import Router from 'next/router';
import { loginSchema } from '../validations/LoginValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Link from 'next/link';


export default function LoginComponent() {
    const { handleChangeLog, handleSubmitLog, valuesLog, loggedUser } = useContext<any>(AuthContext);

    const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        reValidateMode: "onChange",
        mode: "onChange"
    });

    useEffect(()=>{
        if(loggedUser){
            Router.push('/')
        }
    },[loggedUser])

    return (
        <div className={styles.loginContainer}>
        <div className={styles.containerAll}>
        <div className={styles.login}>
            <div className={styles.loginText}>
                <h2>Log in</h2>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleFormSubmit(handleSubmitLog)}>
                    <Input 
                    type="email" 
                    name="email"
                    label="Email"
                    size={{width: '25vw', height: 55, fontSize: 18}}
                    value={valuesLog.email}
                    handleChange={handleChangeLog}
                    inputRef={register}
                    error={errors.email}
                    />
                    <div/>
                    <Input
                    type="password"
                    name="password"
                    label="Password"
                    size={{width: '25vw', height: 55, fontSize: 18}}
                    value={valuesLog.password}
                    handleChange={handleChangeLog}
                    inputRef={register}
                    error={errors.password}
                    />
                    <Button>Login</Button>
                </form>
                <p>You don't have an account? <Link href="/register">Sign up</Link></p>
            </div>  
        </div>
        </div>
    </div>
    )
}
