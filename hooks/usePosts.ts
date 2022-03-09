import axios from "axios";
import { useEffect, useState } from "react"

interface Props{
    type: string
}

export const usePosts = ({type}: Props)=>{
    const [posts, setPosts] = useState<any>([]);
    const [loader, setLoader] = useState(false);

    let data: any;

    const fetchData = async ()=>{
        setLoader(true)
        let offset = 0;
        data = await axios.get(`http://localhost:5000/api/posts/get/all/15/${offset}`);
        setPosts((posts:any) => [...posts, ...data.data]);
        offset += 15;
        setLoader(false);
    };
    
    const handleScroll = (e: any)=>{
        if(window.innerHeight + e.target.documentElement.scrollTop + 1
        >= e.target.documentElement.scrollHeight){
            fetchData();
        }
    }

    useEffect(()=>{
        fetchData();
        window.addEventListener('scroll', handleScroll)
    },[])

    return {
        posts,
        fetchData
    }
}