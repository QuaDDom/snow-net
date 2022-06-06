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
import Head from 'next/head';

interface Props{
    isWelcome?: boolean,
    launch?: boolean
}

export default function LoginComponent({ isWelcome, launch }: Props) {
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
        <>
        <Head>
            <title>Login - Snow</title>
        </Head>
        <div className={styles.loginContainer}>
        <div className={styles.containerAll}>
        <div className={styles.login}>
            <div className={styles.loginText}>
                <h2>Log in</h2>
                <p>{"You don't have an account?"} <Link href="/register">Sign up</Link></p>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleFormSubmit(handleSubmitLog)}>
                    <Input 
                    type="email" 
                    name="email"
                    label="Email"
                    size={{width: '400px', height: 50, fontSize: 18}}
                    value={valuesLog.email}
                    handleChange={handleChangeLog}
                    inputRef={register}
                    error={errors.email}
                    bg={'#131b27'}
                    />
                    <div/>
                    <Input
                    type="password"
                    name="password"
                    label="Password"
                    size={{width: '400px', height: 50, fontSize: 17}}
                    value={valuesLog.password}
                    handleChange={handleChangeLog}
                    inputRef={register}
                    error={errors.password}
                    bg={'#131b27'}
                    />
                    <Button>Login</Button>
                </form>
            </div>  
            </div>
            </div>
        </div>
        </>
    )
}
