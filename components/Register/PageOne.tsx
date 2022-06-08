import Link from 'next/link';
import React from 'react';
import Input from '../Input';
import ErrorMessage from './Errors/ErrorMessage';
import styles from './PageOne.module.scss';

interface Props {
    handleChange: () => void;
    values: any;
    register: any;
    errors: any;
    isResponsive: boolean;
}

export default function PageOne({ handleChange, values, register, errors }: Props) {
    return (
        <>
            <Input
                type="text"
                label="Username"
                name="username"
                size={{ width: '384px', height: 52, fontSize: 18 }}
                handleChange={handleChange}
                value={values.username}
                inputRef={register}
                error={{}}
            />
            {errors.username && <ErrorMessage error={errors.username.message} />}
            <Input
                type="email"
                label="Email"
                name="email"
                size={{ width: '384px', height: 52, fontSize: 18 }}
                handleChange={handleChange}
                value={values.email}
                inputRef={register}
                error={{}}
            />
            {errors.email && <ErrorMessage error={errors.email.message} />}
            <div className={styles.link}>
                <p>
                    Have an account already? <Link href="/login">Log in</Link>
                </p>
            </div>
        </>
    );
}
