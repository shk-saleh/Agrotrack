import React from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

const TopBar = ({ currentUser }) => {

  const { userRole } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, {currentUser?.displayName || 'User'}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="text-primary-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {currentUser?.displayName || currentUser?.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {userRole || 'User'}
            </p>
          </div>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
