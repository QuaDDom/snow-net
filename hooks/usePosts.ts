import axios from "axios";
import { useEffect, useState } from "react"

interface Props{
    type: string
}

export const usePosts = ({type}: Props)=>{
    const [posts, setPosts] = useState<any>([]);

    let data;
    const fetchData = async ()=>{
        data = await axios.get('http://localhost:5000/api/posts/get/all');
        setPosts([...data.data]);
    };
    
    useEffect(()=>{
        if(type === "all"){
            fetchData();
        }
    },[])

    return {
        posts,
        fetchData
    }
}