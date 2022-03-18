import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import styles from '../../styles/creategroup.module.scss';
import Input from '../Input';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'; 
import { MdPublic } from 'react-icons/md'; 

export default function CreateGroup() {
    const { loggedUser } = useContext<any>(AuthContext);

    return (
        <>
        { loggedUser && <div className={styles.createGroupContainer}>
            <div className={styles.create}>
                <h2>Create group</h2>
                <div className={styles.owner}>
                    <img src={loggedUser.profilePic} alt={loggedUser.username} />
                    <div className={styles.info}>
                        <h5>{`${loggedUser.name} ${loggedUser.lastname}`}</h5>
                        <p>Owner</p>
                    </div>
                </div>
                <div className={styles.inputs}>
                    <form>
                        <Input 
                        type="text" 
                        label="Group Name" 
                        name="title" 
                        size={{width: 420, height: 45, fontSize: 18}}
                        handleChange={()=>{}}
                        value={''}
                        />
                        <Input 
                        type="text" 
                        label="Description" 
                        name="description" 
                        size={{width: 420, height: 45, fontSize: 18}}
                        handleChange={()=>{}}
                        value={''}
                        />
                        <div className={styles.selectContainer}>
                            <span><MdPublic/></span>
                            <select name="groupType" placeholder='Select'>
                                <option value="public">Public</option>
                                <option value="private"> Private</option>
                            </select>
                        </div>
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
            <div className={styles.preview}>

            </div>
        </div> } 
        </>
    )
}
