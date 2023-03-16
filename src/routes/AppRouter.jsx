import { Route, Routes } from "react-router-dom"
import { DashboardPage, LoginPage } from "../pages"
import { Navbar } from '../components';
import { ControlPanelPage } from "../pages/ControlPanelPage";

export const AppRouter = () => {
  return (
    <>
      <Navbar />

      <Routes>
        
        <Route path="/*" element={ <LoginPage /> } />
        <Route path="/dashboard" element={ <DashboardPage /> } />
        <Route path="/panel" element={ <ControlPanelPage /> } />

      </Routes>
    </>
  )
}
