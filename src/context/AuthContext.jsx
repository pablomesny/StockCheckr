import { createContext, useState } from 'react';
import { USER_LOCALSTORAGE } from '../utils';

export const AuthContext = createContext();

const initialValues = {
  id: null,
  status: 'not authenticated',
  username: '',
  email: ''
};

const prevValues = () => {
  try {
    const user = JSON.parse( localStorage.getItem(USER_LOCALSTORAGE) ) ?? initialValues;
    return user;
  } catch (error) {
    return initialValues;
  }
};

export const AuthProvider = ({ children }) => {
  const [ authData, setAuthData ] = useState( prevValues() );

  const handleChangeAuth = value => {
    setAuthData( value );
  };

  const onLogout = () => {
    setAuthData( () => prevValues() );
  };

  const value = {
    authData,
    handleChangeAuth,
    onLogout
  };

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
    
};
