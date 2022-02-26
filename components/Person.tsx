import React from 'react';
import styles from './Person.module.scss'

interface Props{
    id: number,
    image: string,
    name: string,
    lastname: string
}

export default function Person({id, image, name, lastname}: Props) {
  return (
      <div className={styles.personContainer}>
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
