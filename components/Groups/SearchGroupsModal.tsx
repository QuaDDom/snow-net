import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg';
import styles from './SearchGroupsModal.module.scss'

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
    <div className={styles.searchGroupsModal}>
        <div className={styles.modal}>
          <button className={styles.close}><CgClose/></button>
          <h3>Search Groups</h3>
          <div className={styles.inputSearch}>
            <span><AiOutlineSearch/></span>
            <input 
            type="text" 
            placeholder="Search People" 
            value={query} 
            onChange={handleChange}
           	/>
          </div>
          <div className={styles.groups}>
            {
              allGroups.map(({title, groupPic}: any)=>(
				<div className={styles.group}>
					<div className={styles.content}>
						<div className={styles.groupPic}>
							<img src={groupPic} alt="" />
						</div>
						<div className={styles.text}>
							<h5>{title}</h5>
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
