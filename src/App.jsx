import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/AuthContext';
import LandingPage from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';


// import ProtectedRoute from './components/ProtectedRoute';
// import DashboardLayout from './components/Layout/DashboardLayout';

// // Auth Pages
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';

// // Dashboard Pages
// import AdminDashboard from './components/Admin/AdminDashboard';
// import FarmerDashboard from './components/Farmer/FarmerDashboard';
// import Forum from './components/Forum/Forum';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardRouter />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Forum />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/prices"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <DashboardLayout>
                  <FarmerDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Dashboard Router Component
const DashboardRouter = () => {
  
  const { userRole } = require('../context/AuthContext').useAuth();
  
  if (userRole === 'admin') {
    return <AdminDashboard />;
  }
  
  return <FarmerDashboard />;
};

export default App;
