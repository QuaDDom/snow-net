import axios from "axios"
import { useEffect, useState } from "react"

export const useGetConversations = (userId: string)=>{
    const [conversations, setConversations] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get('/api/chats/' + userId);
                setConversations(res.data);
            } catch(err){
                console.log(err);
            }
        }
    },[])
}