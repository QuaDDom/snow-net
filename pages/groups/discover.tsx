import React from 'react'
import { PopularGroups, FriendsGroups } from '../../components/Groups/SlideGroups'
import Layout from '../../components/Layout'
import { AuthProvider } from '../../context/AuthContext'


export default function DiscoverGroups() {
    return (
      <Layout title="Discover Groups - Snow">
        <div className="discoverContainer">
          <AuthProvider>
            <PopularGroups/>
            <FriendsGroups/>
          </AuthProvider>
        </div>
      </Layout>
    )
}
