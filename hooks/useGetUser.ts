import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    email: string;
    name: string;
    lastname: string;
    profilePic: string;
    username: string;
    bio: string;
    coverPic: string;
    verifiedBadge: boolean;
}

export const useGetUser = (userId: string) => {
    const [user, setUser] = useState<User>({
        email: '',
        name: '',
        lastname: '',
        profilePic: '',
        username: '',
        bio: '',
        coverPic: '',
        verifiedBadge: false
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`https://snow-net.herokuapp.com/api/users/${userId}`);
            setUser(data.data);
        };
        fetchData();
    }, []);

    return user;
};
