import Router from 'next/router';
import { useEffect, useState } from 'react';

export const useLocalStorage = () => {
    const [loggedUser, setLoggedUser] = useState<any>(null);

    useEffect(() => {
        try {
            const userLocal = localStorage.getItem('userLog');
            if (userLocal) {
                const user = JSON.parse(userLocal);
                setLoggedUser(user);
            } else if (!loggedUser && Router.pathname !== '/register') {
                if (Router.pathname !== '/login') Router.push('/welcome');
            } else if (
                (loggedUser && Router.pathname === '/register') ||
                Router.pathname === '/login' ||
                Router.pathname === '/welcome'
            ) {
                Router.push('/');
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return { loggedUser, setLoggedUser };
};
