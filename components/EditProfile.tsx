import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import styles from '../styles/profile.module.scss';
import Input from './Input';
import TextArea from './TextArea';

export default function EditProfile() {
    const { loggedUser } = useContext<any>(AuthContext);

    return (
        <div className={styles.profileContainer}>
          {  loggedUser && <div className={styles.options}>
            <div className={styles.images}>
                <div className={styles.banner}>
                <img src={loggedUser.coverPic} alt="" />
                </div>
                <div className={styles.profile}>
                <img src={loggedUser.profilePic} alt="profilepicture" />
                </div>
                <h3>{`${loggedUser.name} ${loggedUser.lastname}`}</h3>
            </div>
            <div className={styles.info}>
                <div className={styles.names}>
                <Input 
                type="text" 
                name="name" 
                label="Name" 
                size={{width: 520, height: 50, fontSize: 20}}
                value=""
                handleChange={()=>{}}
                />
                <Input 
                type="text" 
                name="lastname" 
                label="Last Name" 
                size={{width: 520, height: 45, fontSize: 20}}
                value=""
                handleChange={()=>{}}
                />
                </div>
                <div className={styles.personalInfo}>
                <Input 
                type="email" 
                name="email" 
                label="Email" 
                size={{width: 520, height: 50, fontSize: 20}}
                value=""
                handleChange={()=>{}}
                />
                <Input 
                type="tel" 
                name="phone" 
                label="Phone Number" 
                size={{width: 520, height: 50, fontSize: 20}}
                value=""
                handleChange={()=>{}}
                />
                </div>
            </div>
            <div className={styles.bio}>
                <TextArea name="bio" label="Bio" bg="#050505" value=""
                handleChange={()=>{}}/>
            </div>
            </div>}
        </div>
    )
}
