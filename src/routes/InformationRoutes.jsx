import { Box } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar, Submenu } from "../components"
import { StocksProvider } from "../context"
import { DashboardPage } from "../pages"
import { ControlPanelRoutes } from "./ControlPanelRoutes"

export const InformationRoutes = () => {
  return (
    <StocksProvider>
      <Navbar />

      <Box 
        sx={{ display: 'flex', flexDirection: 'row', width: '100vw', height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' } }}
      >
        <Submenu />

        <Routes>
            <Route path="/dashboard" element={ <DashboardPage /> } />
            <Route path="/panel/*" element={ <ControlPanelRoutes /> } />

            <Route path="/*" element={ <Navigate to="/panel" /> } />
        </Routes>
      </Box>

    </StocksProvider>
  )
}
