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
  
  const [ auth, setAuth ] = useState( prevValues() );

  const handleChangeAuth = value => {
    setAuth( value );
  };

  const onLogout = () => {
    setAuth( initialValues );
  };

  const value = {
    auth,
    handleChangeAuth,
    onLogout
  };

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
    
};
