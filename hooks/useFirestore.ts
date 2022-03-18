import { useEffect } from "react";
import { useState } from "react";
import { projectFirestore } from "../config/firebase.config";

export const useFirestore = (collection: string)=>{
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        const unsub = projectFirestore.collection(collection)
                        .orderBy('createdAt', 'desc')
                        .onSnapshot((snap: any)=>{
                            let docs: any = [];
                            snap.forEach((el: any)=>{
                                docs.push({
                                    id: el.id,
                                    ...el.data()
                                });
                            });
                            setData(docs);
                            setTimeout(()=>{
                                setIsLoading(false);
                            },2000)
                        });
                        
        return ()=> unsub();
    },[collection])

    return {data, isLoading};
}