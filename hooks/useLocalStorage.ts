import Router from "next/router";
import { useEffect, useState } from "react"

export const useLocalStorage = ()=>{
    const [loggedUser, setLoggedUser] = useState<any>(null);

    useEffect(()=>{
        try{
            const userLocal = localStorage.getItem('userLog');
            if(!userLocal && Router.pathname !== "/register") Router.push('/login');
            if(userLocal){
                const user = JSON.parse(userLocal);
                setLoggedUser(user); 
            }
        } catch(err){
            console.log(err);
        }
    },[]);

    if(loggedUser) return loggedUser;
}