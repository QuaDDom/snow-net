import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Layout from '../components/Layout';
import General from '../components/Settings/pages/General';
import Language from '../components/Settings/pages/Language';
import Privacy from '../components/Settings/pages/Privacy';
import Security from '../components/Settings/pages/Security';
import SettingsBar from '../components/Settings/SettingsBar';
import SettingsComponent from '../components/Settings/SettingsComponent';
import { AuthProvider } from '../context/AuthContext';
import styles from '../styles/settings.module.scss';

export default function settings() {
  const [page, setPage] = useState(1);
  const isResponsive = useMediaQuery({ query: '(max-width: 1200px)' });

  useEffect(()=>{
    if(isResponsive){
      setPage(0)
    }
  },[isResponsive])

  return (
      <Layout title="Settings - Snow">          
      <div className={styles.settingsContainer}>
          {isResponsive && page === 0 && <SettingsBar setPage={setPage}/>}
          {!isResponsive && <SettingsBar setPage={setPage}/>}
          <AuthProvider>
            <SettingsComponent page={page} setPage={setPage}/>
          </AuthProvider>
      </div>
      </Layout>
  );
}
