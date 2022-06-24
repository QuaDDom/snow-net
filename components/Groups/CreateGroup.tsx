import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from '../../styles/creategroup.module.scss';
import Input from '../Input';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { MdPublic } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { groupSchema } from '../../validations/GroupValidation';
import GroupPreview from './GroupPreview';
import axios from 'axios';
import Router from 'next/router';

export default function CreateGroup() {
    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    const [isPrivate, setIsPrivate] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);

    const { loggedUser } = useContext<any>(AuthContext);

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(groupSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    const handleSubmit = async () => {
        try {
            const bodyData = {
                title,
                description,
                members: [loggedUser._id],
                admins: [loggedUser._id]
            };
            const data = await axios.post('https://snow-net.herokuapp.com/api/groups', bodyData);
            Router.push('/groups/' + data.data._id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, variable: string) => {
        if (variable === 'title') {
            setTitle(e.target.value);
        } else {
            setDescription(e.target.value);
        }
    };

    const handleOpen = () => (selectOpen ? setSelectOpen(false) : setSelectOpen(true));

    return (
        <>
            {loggedUser && (
                <div className={styles.createGroupContainer}>
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
                            <form onSubmit={handleFormSubmit(handleSubmit)}>
                                <Input
                                    inputRef={register}
                                    type="text"
                                    label="Group Name"
                                    name="title"
                                    size={{ width: 420, height: 55, fontSize: 16.5 }}
                                    handleChange={e => handleChange(e, 'title')}
                                    value={title}
                                    error={errors.title}
                                />
                                <Input
                                    type="text"
                                    label="Description"
                                    name="description"
                                    size={{ width: 420, height: 55, fontSize: 16.5 }}
                                    handleChange={e => handleChange(e, 'description')}
                                    value={description}
                                    inputRef={register}
                                    error={errors.description}
                                />
                                <div className={styles.selectContainer} onClick={handleOpen}>
                                    <div
                                        className={`${styles.optionsContainer} ${selectOpen &&
                                            styles.active}`}
                                        onClick={() => {}}>
                                        <div
                                            className={styles.option}
                                            onClick={() => setIsPrivate(false)}>
                                            <input type="radio" id="public" name="public" />
                                            <label htmlFor="public">
                                                <span>
                                                    <MdPublic />
                                                </span>{' '}
                                                Public
                                            </label>
                                        </div>
                                        <div
                                            className={styles.option}
                                            onClick={() => setIsPrivate(true)}>
                                            <input type="radio" id="private" name="private" />
                                            <label htmlFor="private">
                                                <span>
                                                    <RiGitRepositoryPrivateLine />
                                                </span>{' '}
                                                Private
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.selected} ${selectOpen &&
                                            styles.active}`}>
                                        {!isPrivate ? (
                                            <p>
                                                <span>
                                                    <MdPublic />
                                                </span>{' '}
                                                Public
                                            </p>
                                        ) : (
                                            <p>
                                                <span>
                                                    <RiGitRepositoryPrivateLine />
                                                </span>{' '}
                                                Private
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.preview}>
                        <GroupPreview
                            title={title}
                            description={description}
                            groupType={isPrivate}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
