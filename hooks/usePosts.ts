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
        data = await axios.get(`http://localhost:5000/api/posts/get/all`);
        setPosts([...data.data]);
        setLoader(false);
    };
    


    useEffect(()=>{
        fetchData();
    },[])

    return {
        posts,
        fetchData,
        loader
    }
}