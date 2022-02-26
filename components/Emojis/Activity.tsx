import React from 'react'
import styles from './Emojis.module.scss';

interface Props{
  data: any,
  handleClick: (emoji: string) => void
}

export default function Activity({data, handleClick}: Props) {
  return (
    <>
    {
      data.map((emoji: any)=>(
        <span
         className={styles.emoji}
         key={emoji.native}
         aria-label={emoji.native}
         onClick={()=> handleClick(emoji.native)}
        >{emoji.native}</span>
      ))
    }
    </>
  )
}
