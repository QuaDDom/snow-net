import React from 'react'
import DonationCard from '../components/Donations/DonationCard'
import Layout from '../components/Layout'
import styles from '../styles/donations.module.scss'


export default function Donations() {
  return (
    <Layout title="Donations - Snow">
      <div className={styles.donationsPage}>
        <h2>Donations</h2>
        <div className={styles.cards}>
          <DonationCard
           title="Snowflake"
           info='Help the development of this project by donating, and getting the "Snowflake" badge as a reward!'
           price={5}
          />
          <DonationCard
           title="Snowman"
           info='Help the development of this project by donating, and getting the "Snowman" badge as a reward!'
           price={10}
          />
          <DonationCard
           title="Snowstorm"
           info='Help the development of this project by donating, and getting the "Snowstorm" badge as a reward!'
           price={20}
          />
        </div>
      </div>
    </Layout>
  )
}
