import React, { useContext, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import styles from '../styles/login.module.scss';
import AuthContext from '../context/AuthContext';
import Router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';

interface Props {
    isWelcome?: boolean;
    launch?: boolean;
}

export default function LoginComponent({ isWelcome, launch }: Props) {
    const {
        handleChangeLog,
        handleSubmitLog,
        valuesLog,
        loggedUser,
        emailValidationApi,
        passwordValidationApi
    } = useContext<any>(AuthContext);

    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .email('Not a valid email')
            .required('Required')
            .test('email_async_validation', 'Email Validation Error', async function(value) {
                const message = await emailValidationApi(value);
                if (message)
                    return this.resolve(this.createError({ message: 'Invalid email or password' }));
                else return true;
            }),
        password: yup
            .string()
            .required()
            .test('password_async_validation', 'Password Validation Error', async function(value) {
                const isValid = await passwordValidationApi(value);
                if (!isValid)
                    return this.resolve(this.createError({ message: 'Invalid email or password' }));
                else return true;
            })
    });

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema),
        reValidateMode: 'onSubmit',
        mode: 'onSubmit'
    });

    useEffect(() => {
        if (loggedUser) {
            Router.push('/');
        }
    }, [loggedUser]);

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
                            <p>
                                {"You don't have an account?"} <Link href="/register">Sign up</Link>
                            </p>
                        </div>
                        <div className={styles.formContainer}>
                            <form onSubmit={handleFormSubmit(handleSubmitLog)}>
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email"
                                    size={{
                                        width: `${!isResponsive ? '310px' : '400px'}`,
                                        height: !isResponsive ? 50 : 45,
                                        fontSize: 17
                                    }}
                                    value={valuesLog.email}
                                    handleChange={handleChangeLog}
                                    inputRef={register}
                                    error={errors.email}
                                    bg={'#131b27'}
                                />
                                <div />
                                <Input
                                    type="password"
                                    name="password"
                                    label="Password"
                                    size={{
                                        width: `${!isResponsive ? '310px' : '400px'}`,
                                        height: !isResponsive ? 50 : 45,
                                        fontSize: 17
                                    }}
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
    );
}
