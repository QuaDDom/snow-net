import React, { useState } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import styles from './SnowFAQ.module.scss';

export default function SnowFAQ() {
    const [faqOpen, setFaqOpen] = useState(false);
    return (
        <div className={styles.faqContainer}>
            <button>
                <BsFillQuestionCircleFill />
            </button>
            <div className={styles.faq}>
                <p>
                    Snow is a social network. Here you can create and share content! You can upload
                    posts, upload images, create polls, interact with friends, create and join
                    groups, and even includes its own chat to talk
                </p>
            </div>
        </div>
    );
}
