import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DoctorAvatar } from './PremiumDoctorIllustrations';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/dashboard', roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
      { label: 'Patients', path: '/patients', roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
      { label: 'Medical Records', path: '/medical-records', roles: ['admin', 'doctor', 'nurse', 'receptionist'] }
    ];

    if (user.role === 'admin' || user.role === 'receptionist') {
      baseItems.push(
        { label: 'Appointments', path: '/appointments', roles: ['admin', 'receptionist'] }
      );
    }

    if (user.role === 'doctor') {
      baseItems.push({ label: 'My Dashboard', path: '/doctor-dashboard', roles: ['doctor'] });
    }

    if (user.role === 'admin') {
      baseItems.push(
        { label: 'Departments', path: '/departments', roles: ['admin'] },
        { label: 'Reports', path: '/reports', roles: ['admin'] }
      );
    }

    return baseItems.filter(item => item.roles.includes(user.role));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-critical-100 text-critical-700';
      case 'doctor': return 'bg-medical-100 text-medical-700';
      case 'nurse': return 'bg-success-100 text-success-700';
      case 'receptionist': return 'bg-warning-100 text-warning-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <nav className="glass-effect border-b border-neutral-200/50 sticky top-0 z-50 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/dashboard')}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-500 to-medical-700 rounded-2xl flex items-center justify-center mr-4 shadow-card group-hover:shadow-elevated transition-all duration-300 group-hover:scale-105">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-2xl font-bold text-gradient">MediCare HMS</h1>
                <p className="text-sm text-neutral-500 font-medium">Hospital Management System</p>
              </div>
            </div>
          </div>

          {/* Premium Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {getNavItems().map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`${
                  location.pathname === item.path
                    ? 'nav-button-active'
                    : 'nav-button-inactive'
                } touch-feedback`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Premium User Profile Section with Doctor Avatar */}
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-base font-semibold text-neutral-900">{user.name}</p>
              <div className="flex items-center justify-end space-x-2 mt-1">
                <span className={`badge ${getRoleColor(user.role)} text-xs`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                {user.department && (
                  <span className="text-xs text-neutral-500">• {user.department}</span>
                )}
              </div>
            </div>

            {/* Premium Doctor Avatar */}
            <div className="relative group">
              {user.role === 'doctor' ? (
                <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <DoctorAvatar className="w-14 h-14" name={user.name} />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-medical-100 to-medical-200 rounded-2xl flex items-center justify-center shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group-hover:scale-105">
                  <span className="text-lg font-bold text-medical-700 group-hover:scale-110 transition-transform duration-300">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white shadow-soft"></div>
            </div>

            {/* Premium Logout Button */}
            <button
              onClick={handleLogout}
              className="btn-ghost text-critical-600 hover:text-critical-700 hover:bg-critical-50 focus:ring-critical-200 touch-feedback p-3 rounded-xl"
              title="Sign Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Premium */}
      <div className="lg:hidden px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {getNavItems().map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`${
                location.pathname === item.path
                  ? 'nav-button-active'
                  : 'nav-button-inactive'
              } text-sm touch-feedback`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
