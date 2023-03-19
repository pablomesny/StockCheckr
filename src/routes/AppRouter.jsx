import { Navigate, Route, Routes } from "react-router-dom"
import { PublicRoutes, PrivateRoutes, InformationRoutes } from './index';
import { AuthProvider } from "../context";
import { AuthRoutes } from "./AuthRoutes";

export const AppRouter = () => {
  return (
    <AuthProvider>
      {/* <Navbar /> */}

      {/* <Submenu /> */}

      <Routes>

        <Route
          path="/auth/*"
          element={
            <PublicRoutes>
              <AuthRoutes />
            </PublicRoutes>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <InformationRoutes />
            </PrivateRoutes>
          }
        />

        <Route path="/" element={ <Navigate to="/auth/login" /> } />

      </Routes>
    </AuthProvider>
  )
}
