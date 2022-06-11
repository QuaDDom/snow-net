import React from 'react';
import { AiOutlineArrowLeft, AiOutlineMail } from 'react-icons/ai';
import { MdPassword, MdShield } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import styles from './PageStyle.module.scss';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loggedUser: any;
}

export default function Security({ setPage }: Props) {
    const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
    return (
        <div className={styles.pageContainer}>
            {!isResponsive && (
                <button onClick={() => setPage(0)} className={styles.back}>
                    <AiOutlineArrowLeft />
                </button>
            )}
            <div className={styles.title}>Login & Security</div>
            <hr />
            <div className={styles.settings}>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <MdPassword />
                        </span>{' '}
                        Password
                    </h5>
                    <p>We recommend changing the password from time to time</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <AiOutlineMail />
                        </span>{' '}
                        Email
                    </h5>
                    <p>johndoe@gmail.com</p>
                    <button>Edit</button>
                </div>
                <div className={styles.option}>
                    <h5>
                        <span>
                            <MdShield />
                        </span>{' '}
                        Use two-factor authentication
                    </h5>
                    <p>
                        A code will be sent to your gmail to confirm your identity every time you
                        log in
                    </p>
                    <button>Enable</button>
                </div>
            </div>
        </div>
    );
}
