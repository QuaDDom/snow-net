import React from 'react'
import LoginComponent from '../components/LoginComponent';
import { AuthProvider } from '../context/AuthContext';


export default function Login() {
  return (
    <AuthProvider>
      <LoginComponent/>
    </AuthProvider>
  )
}
