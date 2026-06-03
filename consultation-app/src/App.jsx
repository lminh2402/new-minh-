import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Consultation from './pages/doctor/Consultation';
import Feedback from './pages/expert/Feedback';
import Overview from './pages/expert/Overview';
import Retraining from './pages/expert/Retraining';
import Statistics from './pages/expert/Statistics';
import SettingsPage from './pages/SettingsPage';

const PlaceholderRoute = ({ title }) => (
  <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500">Màn hình đang được phát triển.</p>
    </div>
  </div>
);

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<MainLayout userRole={userRole} onLogout={handleLogout} />}>
          {/* Default Redirect */}
          <Route index element={
            userRole === 'doctor' ? <Navigate to="/consultation" replace /> : 
            userRole === 'expert' ? <Navigate to="/expert/overview" replace /> : 
            <Navigate to="/login" replace />
          } />
          
          {/* Doctor Routes */}
          <Route path="consultation" element={<Consultation />} />
          <Route path="home" element={<PlaceholderRoute title="Trang chủ" />} />
          <Route path="calendar" element={<PlaceholderRoute title="Lịch làm việc" />} />
          <Route path="bug-report" element={<PlaceholderRoute title="Báo cáo lỗi AI" />} />

          {/* Expert Routes */}
          <Route path="expert/overview" element={<Overview />} />
          <Route path="expert/feedback" element={<Feedback />} />
          <Route path="expert/retraining" element={<Retraining />} />
          <Route path="expert/stats" element={<Statistics />} />

          {/* Common Routes */}
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
