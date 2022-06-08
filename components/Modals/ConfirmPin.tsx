import React from 'react';
import styles from './ConfirmPin.module.scss';

export default function ConfirmPin() {
    return (
        <div className="modalContainer">
            <div className="modal">
                <h5>Pin this post?</h5>
                <p>This post will appear on top of all your other posts</p>
                <div className="buttons">
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    );
}
