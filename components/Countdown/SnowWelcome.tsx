import React from 'react'
import StaggerTextChange from '../TextReveal/StaggerChange'
import StaggerTextReveal from '../TextReveal/StaggerText'
import styles from './SnowWelcome.module.scss'

interface Props{
    launch: boolean
}

export default function SnowWelcome({launch}: Props) {
  return (
    <div className={`${styles.snowWelcomeContainer} ${launch && styles.launch}`}>
        <div>
        <StaggerTextChange
        text={'Welcome to Snow!'}
        changeTo={"Enjoy your experience."}
        fontFamily={"'Poppins', serif"}
        fontWeight={"400"}
        fontSize={7}
        duration={0.9}
        // stagger={10}
        // direction={"down"}
        // reverse={true}
        color="#fff"
        unit={"vw"}
        triggerAfter={2600}
        //width={50}
        //height={7}
        />
        </div>
    </div>
  )
}
