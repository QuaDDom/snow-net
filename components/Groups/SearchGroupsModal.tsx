import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from './SearchGroupModal.module.scss'

export default function SearchGroupsModal() {
  const [query, setQuery] = useState('');
  const [allGroups, setAllGroups] = useState<any>([])

  useEffect(()=>{
    const fetchData = async ()=>{
        const users = await axios.get('http://localhost:5000/api/users/get/all');
        setAllGroups([...users.data]);
    }
    fetchData();
  },[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setQuery(e.target.value);
  }


  return (
    <div className="searchGroupsModal">
        <div className="modal">
          <button className="close"></button>
          <h3>Search Groups</h3>
          <div className="inputSearch">
            <span><AiOutlineSearch/></span>
            <input 
            type="text" 
            placeholder="Search People" 
            value={query} 
            onChange={handleChange}
           	/>
          </div>
          <div className="groups">
            {
              allGroups.map((group: any)=>(
				<div className={styles.group}>
					<div className={styles.content}>
						<div className={styles.groupPic}>
							<img src="" alt="" />
						</div>
						<div className={styles.text}>
							<h5></h5>
							<div>
								<p></p>
								<p></p>
							</div>
						</div>
						<div className={styles.button}>
							<button>Join</button>
						</div>
					</div>
				</div>
			  ))
            }
          </div>
        </div>
    </div>
  )
}
