import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import styles from './SearchGroupsModal.module.scss';

interface Props {
    setSearchModal: any;
}

export default function SearchGroupsModal({ setSearchModal }: Props) {
    const [query, setQuery] = useState('');
    const [allGroups, setAllGroups] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const groups = await axios.get('https://snow-net.herokuapp.com//api/groups/');
            setAllGroups([...groups.data]);
        };
        fetchData();
    }, []);

    const search = () => {
        return allGroups.filter(
            (group: any) =>
                group.title.includes(query) ||
                group.title.toLowerCase().includes(query) ||
                group.title.toUpperCase().includes(query)
        );
    };

    const handleClose = () => setSearchModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className={styles.searchGroupsModal}>
            <div className={styles.modal}>
                <button className={styles.close} onClick={handleClose}>
                    <CgClose />
                </button>
                <h3>Search Groups</h3>
                <div className={styles.inputSearch}>
                    <span>
                        <AiOutlineSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search People"
                        value={query}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.groups}>
                    {search().map(
                        ({ title, groupPic, private: groupPrivate, members, _id }: any) => (
                            <div className={styles.group} key={_id}>
                                <div className={styles.content}>
                                    <div className={styles.groupPic}>
                                        <img src={groupPic} alt="" />
                                    </div>
                                    <div className={styles.text}>
                                        <h4>{title}</h4>
                                        <div>
                                            <p>{members.length} members</p>
                                            {groupPrivate ? (
                                                <p className={styles.type}>
                                                    <span>
                                                        <RiGitRepositoryPrivateLine />
                                                    </span>{' '}
                                                    Private
                                                </p>
                                            ) : (
                                                <p className={styles.type}>
                                                    <span>
                                                        <MdPublic />
                                                    </span>{' '}
                                                    Public
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.button}>
                                        <button>Join</button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
