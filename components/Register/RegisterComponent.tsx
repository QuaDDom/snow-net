import React, { useContext, useEffect, useState } from 'react';
import Input from '../Input';
import styles from '../../styles/register.module.scss';
import AuthContext from '../../context/AuthContext';
import TextArea from '../TextArea';
import Button from '../Button';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import Head from 'next/head';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import PageFour from './PageFour';
import PageDots from './PageDots';
import { useMediaQuery } from 'react-responsive';
import * as yup from 'yup';

export default function RegisterInputs() {
    const [page, setPage] = useState(1);
    const [isErrors, setIsErrors] = useState(true);
    const {
        handleChange,
        handleSubmit,
        values,
        loggedUser,
        errors: handleErrors,
        emailValidationApi
    } = useContext<any>(AuthContext);
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });

    const registerSchema = yup.object().shape({
        username: yup
            .string()
            .required('This field is required')
            .min(3)
            .max(10)
            .lowercase('Please put the username in lowercase'),
        name: yup
            .string()
            .required('This field is required')
            .min(3)
            .max(10),
        lastname: yup
            .string()
            .required('This field is required')
            .min(3)
            .max(14),
        email: yup
            .string()
            .email('Not a valid email')
            .required('Required')
            .test('email_async_validation', 'Email Validation Error', async function(value) {
                const message = await emailValidationApi(value);
                if (message) return this.resolve(this.createError({ message: 'Email not found' }));
                else return true;
            }),
        password: yup
            .string()
            .required('This field is required')
            .min(6)
            .max(30),
        reppassword: yup
            .string()
            .required('This field is required')
            .oneOf([yup.ref('password')], 'Passwords must be equals!')
    });

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange' && 'onBlur'
    });

    useEffect(() => {
        if (errors.email || errors.username) setIsErrors(true);
        else setIsErrors(false);
    }, [errors]);

    const handleNext = (sum: boolean) => {
        if (page === 1) {
            if (errors.username || errors.mail) return;
            else sum ? setPage(page - 1) : setPage(page + 1);
        } else if (page === 2) {
            if (errors.password || errors.reppassword) return;
            else sum ? setPage(page - 1) : setPage(page + 1);
        } else if (page === 3) {
            if (errors.name || errors.lastname) return;
            else sum ? setPage(page - 1) : setPage(page + 1);
        }
    };

    useEffect(() => {
        if (loggedUser) {
            Router.push('/');
        }
        setIsErrors(true);
    }, [loggedUser]);

    return (
        <>
            <Head>
                <title>Register - Snow</title>
            </Head>
            <div className={styles.registerContainer}>
                <div className={styles.containerAll}>
                    <div className={styles.registerContent}>
                        <div className={styles.registerBackground}>
                            <img src="welcome-snow.svg" alt="" />
                        </div>
                        <div className={styles.register}>
                            <div className={styles.registerText}>
                                <h2>Get Started!</h2>
                            </div>
                            <PageDots page={page} />
                            <div className={styles.formContainer}>
                                <form onSubmit={handleFormSubmit(handleSubmit)}>
                                    <div className={styles.inputsCont}>
                                        {page === 1 && (
                                            <PageOne
                                                register={register}
                                                errors={errors}
                                                handleChange={handleChange}
                                                values={values}
                                                isResponsive={isResponsive}
                                            />
                                        )}
                                        {page === 2 && (
                                            <PageTwo
                                                register={register}
                                                errors={errors}
                                                handleChange={handleChange}
                                                values={values}
                                                isResponsive={isResponsive}
                                            />
                                        )}
                                        {page === 3 && (
                                            <PageThree
                                                register={register}
                                                errors={errors}
                                                handleChange={handleChange}
                                                values={values}
                                                isResponsive={isResponsive}
                                                handleSubmit={handleSubmit}
                                            />
                                        )}
                                    </div>
                                </form>
                                <div className={styles.buttons}>
                                    {page >= 2 && (
                                        <button
                                            onClick={() => handleNext(true)}
                                            className={styles.back}>
                                            <IoIosArrowBack />
                                        </button>
                                    )}
                                    {page <= 2 && (
                                        <button
                                            onClick={() => handleNext(false)}
                                            className={styles.forward}>
                                            <IoIosArrowForward />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
