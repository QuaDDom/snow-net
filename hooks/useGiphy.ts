import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import axios from "axios";

const key = "Y5MruqgDFFiY2XLwfRGEXRpCm8RZbeCC";

export const useGiphy = ()=>{
    const [giphy, setGiphy] = useState<any>(null)
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        const useFetch = async ()=>{
            setIsLoading(true);
            const data = await axios('https://api.giphy.com/v1/gifs/trending', {
                                params: {
                                    api_key: key,
                                    limit: 30
                                }
                                });
            setGiphy(data.data.data)
            setIsLoading(false);
        };
        useFetch()
    },[]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const useFetch = async ()=>{
            setIsLoading(true);
            const data = await axios(`https://api.giphy.com/v1/gifs/search`,{
                params:{
                    api_key: key,
                    q: search
                }
            })
            setGiphy(data.data.data);
            setIsLoading(false);
        }
        useFetch();
    }

    return {
        handleChange,
        handleSubmit,
        giphy,
        search,
        isLoading
    }
}