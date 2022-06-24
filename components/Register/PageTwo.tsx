import React from 'react';
import Input from '../Input';
import ErrorMessage from './Errors/ErrorMessage';

interface Props {
    handleChange: () => void;
    values: any;
    register: any;
    errors: any;
    isResponsive: boolean;
}

export default function PageTwo({ handleChange, values, register, errors, isResponsive }: Props) {
    return (
        <>
            <Input
                type="password"
                label="Password"
                name="password"
                size={{
                    width: `${!isResponsive ? '310px' : '400px'}`,
                    height: 50,
                    fontSize: 17
                }}
                handleChange={handleChange}
                value={values.password}
                inputRef={register}
                error={{}}
            />
            {errors.password && <ErrorMessage error={errors.password.message} />}
            <Input
                type="password"
                label="Repeat Password"
                name="reppassword"
                size={{
                    width: `${!isResponsive ? '310px' : '400px'}`,
                    height: 50,
                    fontSize: 17
                }}
                handleChange={handleChange}
                value={values.repeatPassword}
                inputRef={register}
                error={{}}
            />
            {errors.reppassword && <ErrorMessage error={errors.reppassword.message} />}
        </>
    );
}
