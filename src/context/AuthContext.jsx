import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ authData, setAuthData ] = useState({
        status: 'authenticated'
    })

  return (
    <AuthContext.Provider value={ authData }>
        { children }
    </AuthContext.Provider>
  )
}
