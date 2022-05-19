import axios from "axios";
import Router from "next/router";
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
          [errors, setErrors] = useState({});


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, inputType: string)=>{
        if(inputType === "name") setName(e.target.value);
        if(inputType === "lastname") setLastname(e.target.value);
        if(inputType === "password") setPassword(e.target.value);
        if(inputType === "reppassword") setRepeatPassword(e.target.value);
        if(inputType === "bio") setBio(e.target.value);
        if(inputType === "email") setEmail(e.target.value);
        if (inputType === "username") setUsername(e.target.value);
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
                console.log('This user already exists')
                setErrors({email: "This user already exists!"})
                return;
            }
        } catch(err){
            console.log(err);
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