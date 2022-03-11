import React from 'react'
import SnowLogo from './img/snow-logo.svg';
import styles from './TopBar.module.scss';

interface Props{

}

export default function TopBar() {
  return (
    <div className="topBarContainer">
        <div className="icons">
            <div className="snow">
                <img src={SnowLogo} alt="snow" />
            </div>
            <h3>SNOW</h3>
            <div className="user">
                <img src="" alt="" />
            </div>
        </div>
    </div>
  )
}
