import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar, Submenu } from '../components';
import { BrandsProvider, GroupsProvider } from '../context';
import { DashboardPage } from '../pages';
import { ControlPanelRoutes } from './ControlPanelRoutes';

export const InformationRoutes = () => {
  return (
    <GroupsProvider>
      <BrandsProvider>
        <Navbar />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
          }}
        >
          <Submenu />

          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/panel/*" element={<ControlPanelRoutes />} />

            <Route path="/*" element={<Navigate to="/panel" />} />
          </Routes>
        </Box>
      </BrandsProvider>
    </GroupsProvider>
  );
};
