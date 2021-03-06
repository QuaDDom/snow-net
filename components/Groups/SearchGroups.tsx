import Router from 'next/router';
import React, { useState } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import styles from './SearchGroups.module.scss';
import SearchGroupsModal from './SearchGroupsModal';

export default function SearchGroups() {
    const [searchModal, setSearchModal] = useState(false);
    return (
        <>
            {searchModal && <SearchGroupsModal setSearchModal={setSearchModal} />}
            <div className={styles.searchGroups}>
                <div className={styles.containerSearch}>
                    <div className={styles.inputContainer} onClick={() => setSearchModal(true)}>
                        <span className={styles.icon}>
                            <BiSearch />
                        </span>
                        <p>Search Groups</p>
                    </div>
                </div>
                <div className={styles.create}>
                    <button onClick={() => Router.push('/groups/create')}>
                        <span>
                            <BiPlus />
                        </span>{' '}
                        Create
                    </button>
                </div>
            </div>
        </>
    );
}
