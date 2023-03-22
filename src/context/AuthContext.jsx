import { createContext, useState } from 'react';

export const AuthContext = createContext();

const initialValues = {
  id: null,
  status: 'not authenticated',
  username: '',
  email: ''
};

export const AuthProvider = ({ children }) => {
  const [ authData, setAuthData ] = useState( initialValues );

  const handleChangeAuth = (value) => {
    setAuthData( value );
  }

  const onLogout = () => {
    setAuthData( initialValues );
  }

  const value = {
    authData,
    handleChangeAuth,
    onLogout
  }

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
};
