import axios from "axios";
import { useEffect, useState } from "react"

interface User{
    email: string,
    name: string,
    lastname: string,
    profilePic: string,
    username: string,
    bio: string,
    coverPic: string
}

export const useGetUser = (userId: string)=>{
    const [user, setUser] = useState<User>({
        email: '',
        name: '',
        lastname: '',
        profilePic: '',
        username: '',
        bio: '',
        coverPic: ''
    });

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await axios.get(`http://localhost:5000/api/users/${userId}`);
            setUser(data.data);
        }
        fetchData();
    },[]) 

    return user;
}