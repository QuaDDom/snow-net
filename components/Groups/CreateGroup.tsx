import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import styles from '../../styles/creategroup.module.scss';
import Input from '../Input';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'; 
import { MdPublic } from 'react-icons/md'; 
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { groupSchema } from '../../validations/GroupValidation';
import GroupPreview from './GroupPreview';

export default function CreateGroup() {
    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description')
    const [selectOpen, setSelectOpen] = useState(false);
    const { loggedUser } = useContext<any>(AuthContext);
    const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(groupSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, variable: string)=>{
        if(variable === 'title'){
            setTitle(e.target.value)
        } else{
            setDescription(e.target.value)
        }
    }

    const handleOpen = ()=> selectOpen ? setSelectOpen(false ): setSelectOpen(true);
    

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
                            inputRef={register}
                            type="text"
                            label="Group Name"
                            name="title"
                            size={{ width: 420, height: 55, fontSize: 18 }}
                            handleChange={(e)=> handleChange(e, 'title')}
                            value={title}
                            error={errors.title}                        
                        />
                        <Input 
                            type="text"
                            label="Description"
                            name="description"
                            size={{ width: 420, height: 55, fontSize: 18 }}
                            handleChange={(e)=> handleChange(e, 'description')}
                            value={description}
                            inputRef={register}
                            error={errors.description}                        
                        />
                        <div className={styles.selectContainer} onClick={handleOpen}>
                            <div className={`${styles.optionsContainer} ${selectOpen && styles.active}`}>
                                <div className={styles.option}>
                                    <input type="radio" id="title" name="title"/>
                                    <label htmlFor="title">Public</label>
                                </div>
                                <div className={styles.option}>
                                    <input type="radio" id="title" name="title"/>
                                    <label htmlFor="title">Private</label>
                                </div>
                            </div>
                        </div>
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
            <div className={styles.preview}>
                <GroupPreview 
                title={title}
                description={"skjfhsjkfhsjkfhjsdhf"}
                groupType={'public'}
                />
            </div>
        </div> } 
        </>
    )
}
