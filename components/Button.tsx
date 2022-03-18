import React from 'react';
import styles from './Button.module.scss'

export default function Button({children}: {children: string}) {
  return <button className={styles.button}>{children}</button>;
}
