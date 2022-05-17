import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import GroupComponent from '../../components/Groups/GroupComponent';
import Layout from '../../components/Layout';
import AuthContext, { AuthProvider } from '../../context/AuthContext';


export default function Group() {
    const router = useRouter();
    const id = router.query.id;
    const [group, setGroup] = useState<any>(null);

    useEffect(()=>{
        const fetchGroupData = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/groups/${id}`);
                setGroup(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchGroupData();
    },[id]);

    return (
        <>
        {group && <Layout title={group.title + "- Snow"}>
            <AuthProvider>
                <GroupComponent group={group}/>
            </AuthProvider>
        </Layout>}
        </>
    )
}
