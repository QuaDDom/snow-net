import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

interface User{
    email: string,
    password: string
}


export const useLogin = ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);

    const handleChangeLog = async (e: React.ChangeEvent<HTMLInputElement>, inputType: string)=>{

        if(inputType === "email") setEmail(e.target.value);
        else if(inputType === "password") setPassword(e.target.value);

    }

    const handleSubmitLog = async (update: boolean, loggedUser: any)=> {
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            setCurrentUser(res.data);
        } catch(err){
            console.log(err);
        } finally{
            Router.push('/');
        }
    }

    return {
        handleChangeLog,
        handleSubmitLog,
        currentUser,
        valuesLog: {
            email,
            password
        }
    }
}