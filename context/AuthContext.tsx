import Router from 'next/router';
import React, { Children, createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

interface Props{
    children: React.ReactNode 
}

const AuthContext = createContext({});

export const AuthProvider = ({children}: Props)=>{
    const {handleChange, handleSubmit, userData, values, errors }: any = useRegister();
    const {handleChangeLog, handleSubmitLog, currentUser, valuesLog} = useLogin();
    const {loggedUser, setLoggedUser} = useLocalStorage();

    useEffect(()=>{
        if(currentUser){
            try{
                const {password, ...localUser} = currentUser;
                localStorage.setItem('userLog', JSON.stringify(localUser));
            } catch(err){
                console.log(err);
            }
        }
    },[currentUser, loggedUser]);

    const data = {
        handleChange,
        handleSubmit,
        userData,
        values,
        handleChangeLog,
        handleSubmitLog,
        loggedUser,
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