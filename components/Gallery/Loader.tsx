import React from 'react'
import { Circles, Puff } from 'react-loader-spinner'
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
        <Circles color="#8bffff" height={80} width={80}/>
        <h3>Loading your images...</h3>
    </div>
  )
}
