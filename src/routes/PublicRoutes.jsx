import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

export const PublicRoutes = ({ children }) => {

  const { authData } = useContext( AuthContext );
  const { status } = authData;

  return ( status !== 'authenticated' )
    ? children
    : <Navigate to="/panel" />
}
