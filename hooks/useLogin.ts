import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface User {
    email: string;
    password: string;
}

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<any>(null);

    const handleChangeLog = async (e: React.ChangeEvent<HTMLInputElement>, inputType: string) => {
        if (inputType === 'email') setEmail(e.target.value);
        else if (inputType === 'password') setPassword(e.target.value);
    };

    const emailValidationApi = async () => {
        try {
            const message = await axios.post('https://snow-net.herokuapp.com//api/auth/email', {
                email
            });
            if (message.data) return true;
            else return false;
        } catch (err) {
            console.log(err);
        }
    };

    const passwordValidationApi = async () => {
        try {
            const isValid = await axios.post('https://snow-net.herokuapp.com//api/auth/password', {
                email,
                password
            });
            return isValid.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitLog = async (update: boolean, loggedUser: any) => {
        try {
            const res = await axios.post('https://snow-net.herokuapp.com//api/auth/login', {
                email,
                password
            });
            setToken(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            Router.push('/');
        }
    };

    return {
        handleChangeLog,
        handleSubmitLog,
        token,
        emailValidationApi,
        passwordValidationApi,
        valuesLog: {
            email,
            password
        }
    };
};
