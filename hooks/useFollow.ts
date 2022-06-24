import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const useFollow = (loggedUser: any, id: string, friendReqs: any) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        if (friendReqs.includes(loggedUser._id)) {
            setIsFollowed(true);
        }
        if (loggedUser?.friends.includes(id)) {
            setIsFriend(true);
        }
    }, []);

    const handleFollow = async () => {
        try {
            if (!isFollowed) {
                await axios.put(`https://snow-net.herokuapp.com/api/users/${id}/follow`, {
                    userId: loggedUser._id
                });
                setIsFollowed(true);
            } else {
                await axios.put(`https://snow-net.herokuapp.com/api/users/${id}/unfollow`, {
                    userId: loggedUser._id
                });
                setIsFollowed(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return handleFollow;
};
