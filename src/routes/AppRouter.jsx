import { Route, Routes } from "react-router-dom"
import { DashboardPage, LoginPage } from "../pages"
import { Navbar, Submenu } from '../components';
import { ControlPanelPage } from "../pages/ControlPanelPage";

export const AppRouter = () => {
  return (
    <>
      <Navbar />

      <Submenu />

      <Routes>
        
        <Route path="/*" element={ <LoginPage /> } />
        <Route path="/dashboard" element={ <DashboardPage /> } />
        <Route path="/panel" element={ <ControlPanelPage /> } />

      </Routes>
    </>
  )
}
