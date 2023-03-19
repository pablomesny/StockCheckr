import { Navigate, Route, Routes } from "react-router-dom"
import { ControlPanelPage, DashboardPage, LoginPage } from "../pages"
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
          path="/*"
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

      </Routes>
    </AuthProvider>
  )
}
