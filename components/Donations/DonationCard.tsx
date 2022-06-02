import React from 'react'
import styles from './DonationCard.module.scss';
import Image from 'next/image';

interface Props{
  title: string,
  info: string,
  icon?: any,
  price: number
}

export default function DonationCard({title, info, price, icon}: Props) {
  const style = price === 10 && styles.violet || price === 20 && styles.blue;
  return (
    <div className={`${styles.donationCard}`}>
        <div className={`${styles.bgTop} ${style}`}/>
        <div className={styles.icon}>
            <img src={icon} alt="" />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.info}>{info}</p>
        <h4 className={styles.price}>${price}</h4>
        <button className={style || styles.button}>Donate</button>
    </div>
  )
}
