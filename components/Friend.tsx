import React from 'react';
import styles from './Friend.module.scss';

interface Props {
  id: number,
  image: string,
  name: string,
  lastname: string,
  status: string
}

export default function Friend({id, image, name, lastname, status}: Props) {
  return (
      <div className={styles.friendContainer}>
          <div className={styles.content}>
              <div className={styles.image}>
                <img src={image} alt={name} />
                <div className={styles.status}/>
              </div>
              <h4 className={styles.friendName}>{`${name} ${lastname}`}</h4>
              <div></div>
          </div>
      </div>
  );
}
