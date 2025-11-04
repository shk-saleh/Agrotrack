import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminView from '../Components/Dashboard/AdminView';
import FarmerView from '../Components/Dashboard/FarmerView';
import { Loader } from 'lucide-react';

const Dashboard = () => {
  const { userRole, currentUser } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Hide welcome message after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  // Show loading/welcome screen
  if (!currentUser || !userRole || showWelcome) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary-50 to-white">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-3xl">A</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Agro<span className="text-primary-600">Track</span>
            </h1>
          </div>
          <Loader className="animate-spin mx-auto mb-4 text-primary-600" size={40} />
          <p className="text-gray-600 font-medium">
            {userRole ? `Welcome ${userRole}!` : 'Loading dashboard...'}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Preparing your personalized experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {userRole === 'admin' ? <AdminView /> : <FarmerView />}
    </>
  );
};

export default Dashboard;
