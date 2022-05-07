import React from 'react'
import { PopularGroups, FriendsGroups } from '../../components/Groups/SlideGroups'
import Layout from '../../components/Layout'
import { AuthProvider } from '../../context/AuthContext'
import styles from '../../styles/groupdiscover.module.scss';


export default function DiscoverGroups() {
    return (
      <Layout title="Discover Groups - Snow">
        <div className={styles.discoverContainer}>
          <AuthProvider>
            <PopularGroups/>
            <FriendsGroups/>
          </AuthProvider>
        </div>
      </Layout>
    )
}
