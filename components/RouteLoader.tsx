import React from 'react'
import styles from './RouteLoader.module.scss';

interface Props{
    isRouteLoading: boolean
}

export default function RouteLoader({isRouteLoading}: Props) {
  return (
    <div className={styles.routeLoaderContainer}>
        
    </div>
  )
}
