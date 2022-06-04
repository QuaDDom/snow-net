import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import { ChangeEvent, useState } from "react";




export const useRegister = ()=>{
    const [email, setEmail] = useState(''),
          [username, setUsername] = useState(''),
          [name, setName] = useState(''),
          [lastname, setLastname] = useState(''),
          [bio, setBio] = useState(''),
          [password, setPassword] = useState(''),
          [repeatPassword, setRepeatPassword] = useState(''),
          [userData, setUserData] = useState({}),
          [errors, setErrors] = useState({}),
          [isSubmit, setIsSubmit] = useState(false);

    useEffect(()=>{
        setUserData({
            username,
            name,
            lastname,
            email,
            password,
            bio
        });
    },[email, username, name, lastname, bio, password])

    useEffect(()=>{(userData)},[userData])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, inputType: string)=>{
        switch(inputType){
            case 'name':
                setName(e.target.value);
                break;
            case 'lastname':
                setLastname(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'reppassword':
                setRepeatPassword(e.target.value);
                break;
            case 'email': 
                setEmail(e.target.value);
                break;
            case 'username':
                setUsername(e.target.value);
                break;
            case 'bio': 
                setBio(e.target.value);
        }
        setUserData({
            username,
            name,
            lastname,
            email,
            password,
            bio
        });
    }

    const handleSubmit = async (e: any)=>{
        try{
            const data = await axios.post("http://localhost:5000/api/auth/register", userData);
            if(data.data === 'This user already exists'){
                ('This user already exists')
                setErrors({email: "This user already exists!"})
                return;
            }
        } catch(err){
            (err);
        } finally{
            Router.push('/verified/pending');
        }
    }

    return {
        handleChange,
        handleSubmit,
        userData,
        values: {
            username,
            name,
            lastname,
            bio,
            email,
            password,
            repeatPassword,
        },
        errors
    }
}