import { Box } from "@mui/material"
import { Groups, Navbar, Submenu } from "../components"

export const DashboardPage = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100%' }}>
        <Submenu />

        <Groups />
      </Box>
    </>
  )
}
