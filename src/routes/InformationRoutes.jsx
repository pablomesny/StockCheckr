import { Box } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar, Submenu } from "../components"
import { DashboardPage } from "../pages"
import { ControlPanelRoutes } from "./ControlPanelRoutes"

export const InformationRoutes = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100vw', minHeight: '100%' }}>
        <Submenu />

        <Routes>
            <Route path="/dashboard" element={ <DashboardPage /> } />
            <Route path="/panel/*" element={ <ControlPanelRoutes /> } />

            <Route path="/*" element={ <Navigate to="/panel" /> } />
        </Routes>
      </Box>

    </>
  )
}
