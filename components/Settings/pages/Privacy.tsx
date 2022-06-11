import React from 'react';
import { AiOutlineArrowLeft, AiOutlineMail } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import styles from './PageStyle.module.scss';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loggedUser: any;
}

export default function Privacy({ setPage }: Props) {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    return (
        <div className={styles.pageContainer}>
            {!isResponsive && (
                <button onClick={() => setPage(0)} className={styles.back}>
                    <AiOutlineArrowLeft />
                </button>
            )}
            <div className={styles.title}>Account Privacy</div>
            <hr />
            <div className={styles.settings}>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <IoPersonCircleSharp />
                        </span>{' '}
                        Account Type
                    </h5>
                    <p>Public (everyone can see your posts)</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <AiOutlineMail />
                        </span>{' '}
                        Who can send you friend requests?
                    </h5>
                    <p>Everyone</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <BsFillPeopleFill />
                        </span>{' '}
                        Who can see your friends?
                    </h5>
                    <p>Only Friends</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <BiMessageSquareDetail />
                        </span>{' '}
                        Who can send you messages?
                    </h5>
                    <p>Only Friends</p>
                    <button>Edit</button>
                </div>
            </div>
        </div>
    );
}
