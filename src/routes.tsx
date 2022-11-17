import React from 'react';
import { Route, Routes } from 'react-router-dom';
//Components
import Home from './pages/dashboard/Home';
import Authentication from './pages/Authentication';
import Error from './pages/Error';
import NavigationDashboardLayout from './pages/templates/NavigationDashboardLayout';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Authentication />} />
      <Route path="dashboard" element={<NavigationDashboardLayout /> }>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default MainRoutes;
