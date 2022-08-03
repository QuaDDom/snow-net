import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useGetOnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState<any>([]);

    const socket = useRef<any>(null);

    useEffect(() => {
        socket.current = io('ws://localhost:8080');
        socket.current.on('getUsers', (users: any) => {
            console.log('users', users);
            const onlineUsersId = users.map((user: any) => user.userId);
            setOnlineUsers(onlineUsersId);
            console.log(`Online Users ${onlineUsersId}`);
        });
    }, []);

    return onlineUsers;
};
