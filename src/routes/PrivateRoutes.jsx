import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

export const PrivateRoutes = ({ children }) => {

    const { status } = useContext( AuthContext );

  return ( status === 'authenticated' )
    ? children
    : <Navigate to ="/auth/login" />
}
