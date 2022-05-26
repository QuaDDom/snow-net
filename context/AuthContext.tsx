import axios from 'axios';
import Router from 'next/router';
import React, { Children, createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

interface Props{
    children: React.ReactNode 
}

const AuthContext = createContext({});

export const AuthProvider = ({children}: Props)=>{
    const {handleChange, handleSubmit, userData, values, errors }: any = useRegister();
    const {handleChangeLog, handleSubmitLog, token, valuesLog} = useLogin();
    const {loggedUser, setLoggedUser} = useLocalStorage();
    const [newUserData, setNewUserData] = useState<any>(null)

    useEffect(()=>{
        if(token){
            try{
                localStorage.setItem('userLog', JSON.stringify(token));
            } catch(err){
                console.log(err);
            }
        }
    },[token, loggedUser]);

    useEffect(()=>{
        const getData = async ()=>{
            if(loggedUser){
                try{
                    const data = await axios.post('http://localhost:5000/api/auth/userdata', {}, {
                        headers: {
                            'Authorization' : 'Bearer ' + loggedUser.token
                        }
                    });
                    console.log(data.data)
                    setNewUserData({...data.data.user})
                } catch(err){
                    console.log(err);
                }
            }
        }
        getData();
    },[loggedUser])

    const data = {
        handleChange,
        handleSubmit,
        userData,
        values,
        handleChangeLog,
        handleSubmitLog,
        loggedUser: newUserData,
        valuesLog,
        setLoggedUser,
        errors
    }

    return (
        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;