import React, { useContext } from 'react';
import RegisterComponent from '../components/RegisterComponent';
import { AuthProvider } from '../context/AuthContext';

export default function Register() {

  return (
    <AuthProvider>
      <RegisterComponent/>
    </AuthProvider>
  );
}
