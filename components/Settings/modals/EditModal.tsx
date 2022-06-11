import axios from 'axios';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import styles from './Modals.module.scss';

interface Props {
    type?: string;
    value: string;
    setIsOpen:
        | React.Dispatch<React.SetStateAction<string>>
        | React.Dispatch<React.SetStateAction<any>>;
    title: string;
    postId: string;
    userId: string;
    setText?: any;
}

export default function EditModal({
    type,
    value,
    setIsOpen,
    title,
    userId,
    postId,
    setText
}: Props) {
    const [inputVal, setInputVal] = useState(value);

    const updatePost = async () => {
        setText(inputVal);
        try {
            await axios.put(`http://localhost:5000/api/posts/${postId}`, {
                userId,
                text: inputVal
            });
            setIsOpen('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    return (
        <div className={styles.modalContainer}>
            {/* <div className={"closeOverlay"} onClick={()=> setIsOpen(false)}/> */}
            <div className={styles.modal}>
                <h4 className={styles.title}>{title}</h4>
                <input type="text" value={inputVal} onChange={handleChange} />
                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={() => setIsOpen('')}>
                        Cancel
                    </button>
                    <button className={styles.save} onClick={updatePost}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
