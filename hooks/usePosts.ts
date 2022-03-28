import axios from "axios";
import { useEffect, useState } from "react"

interface Props{
    type: string
}

export const usePosts = ({type}: Props)=>{
    const [posts, setPosts] = useState<any>([]);
    const [loader, setLoader] = useState(false);
    const [isLimit, setIsLimit] = useState(false);
    const [offset, setOffset] = useState(10);

    let data: any;

    const fetchData = async ()=>{
        setLoader(true)
        data = await axios.get(`http://localhost:5000/api/posts/get/all/0/${offset}`);
        if(data.data === "limit") {
            setIsLimit(true);
            return;
        };
        setPosts([...data.data]);
        setLoader(false);
    };

    const loadMorePosts = async ()=>{
        console.log('loadMore')
        setLoader(true)
        data = await axios.get(`http://localhost:5000/api/posts/get/all/${10}/${offset}`);
        if(data.data === "limit") {
            setIsLimit(true);
            return;
        };
        setPosts((oldPosts: any) => oldPosts.concat(data.data));
        setLoader(false);
    }
    
    useEffect(()=>{
        if(isLimit) return;
        loadMorePosts();
    },[offset])


    return {
        posts,
        fetchData,
        loadMorePosts,
        loader,
        setOffset,
        offset,
        isLimit
    }
}