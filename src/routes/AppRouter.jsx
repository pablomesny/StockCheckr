import { Navigate, Route, Routes } from "react-router-dom"
import { ControlPanelPage, DashboardPage, LoginPage } from "../pages"
import { PublicRoutes, PrivateRoutes, InformationRoutes } from './index';
import { AuthProvider } from "../context";

export const AppRouter = () => {
  return (
    <AuthProvider>
      {/* <Navbar /> */}

      {/* <Submenu /> */}

      <Routes>

        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
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
