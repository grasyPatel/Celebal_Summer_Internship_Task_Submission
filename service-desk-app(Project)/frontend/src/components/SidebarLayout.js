// src/components/SidebarLayout.js
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const SidebarLayout = ({ children }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () =>
    import('firebase/auth').then(({ getAuth, signOut }) => {
      const auth = getAuth();
      signOut(auth).then(() => navigate('/'));
    });

  // Enhanced styling with gradients and modern colors
  const sidebarStyles = {
    backgroundColor: darkMode 
      ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
      : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    border: darkMode 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: darkMode
      ? '4px 0 20px rgba(0, 0, 0, 0.3)'
      : '4px 0 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  };

  const menuItemStyles = {
    root: {
      fontSize: '14px',
      fontWeight: '500',
      margin: '4px 8px',
      borderRadius: '12px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: darkMode 
          ? 'rgba(99, 102, 241, 0.15)' 
          : 'rgba(99, 102, 241, 0.08)',
        transform: 'translateX(4px)',
        boxShadow: darkMode
          ? '0 4px 12px rgba(99, 102, 241, 0.2)'
          : '0 4px 12px rgba(99, 102, 241, 0.15)',
      },
      '&.ps-active': {
        backgroundColor: darkMode 
          ? 'rgba(99, 102, 241, 0.2)' 
          : 'rgba(99, 102, 241, 0.12)',
        color: '#6366f1',
        borderLeft: '3px solid #6366f1',
      }
    },
    icon: {
      marginRight: '12px',
      fontSize: '20px',
      transition: 'all 0.3s ease',
    },
    button: {
      padding: '12px 16px',
      '&:hover': {
        backgroundColor: 'transparent',
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar
        collapsed={collapsed}
        backgroundColor="transparent"
        rootStyles={{
          ...sidebarStyles,
          color: darkMode ? '#e2e8f0' : '#1e293b',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
        transitionDuration={300}
      >
        {/* Header Section */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-indigo-600' : 'bg-indigo-500'
              } shadow-lg`}>
                <PersonIcon className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {currentUser?.displayName || 'User'}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {currentUser ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          )}
        </div>

        <Menu
          menuItemStyles={menuItemStyles}
          className="px-2"
        >
          {/* Toggle Button */}
          <MenuItem 
            icon={<MenuIcon />} 
            onClick={() => setCollapsed(!collapsed)}
            style={{
              backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.1)' : 'rgba(79, 70, 229, 0.05)',
              marginBottom: '16px',
              borderRadius: '12px',
            }}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </MenuItem>

          {/* Navigation Items */}
          <div className="space-y-2">
            <MenuItem
              icon={<DashboardIcon />}
              component={<Link to="/dashboard" />}
            >
              Dashboard
            </MenuItem>

            {currentUser ? (
              <MenuItem 
                icon={<LogoutIcon />} 
                onClick={handleLogout}
                style={{
                  color: darkMode ? '#ef4444' : '#dc2626',
                }}
              >
                Logout
              </MenuItem>
            ) : (
              <MenuItem 
                icon={<LoginIcon />} 
                component={<Link to="/" />}
              >
                Login
              </MenuItem>
            )}

            {/* Theme Toggle */}
            <MenuItem
              icon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              onClick={() => setDarkMode(!darkMode)}
              style={{
                backgroundColor: darkMode 
                  ? 'rgba(245, 158, 11, 0.1)' 
                  : 'rgba(245, 158, 11, 0.05)',
                color: darkMode ? '#fbbf24' : '#d97706',
              }}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </MenuItem>
          </div>
        </Menu>

        {/* Footer Section */}
        {!collapsed && (
          <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-lg ${
            darkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/50 border border-gray-200'
          } backdrop-blur-sm`}>
            <p className={`text-xs text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © 2025 Your App
            </p>
          </div>
        )}
      </Sidebar>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${
        collapsed ? 'ml-0' : 'ml-0'
      }`}>
        <div className={`min-h-screen p-6 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
            : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900'
        }`}>
          {/* Content Header */}
          <div className={`mb-6 p-4 rounded-xl ${
            darkMode 
              ? 'bg-gray-800/30 border border-gray-700/50' 
              : 'bg-white/60 border border-gray-200/50'
          } backdrop-blur-sm shadow-sm`}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Dashboard
            </h1>
            <p className={`text-sm mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Manage your application with style
            </p>
          </div>

          {/* Children Content */}
          <div className={`rounded-xl ${
            darkMode 
              ? 'bg-gray-800/20 border border-gray-700/30' 
              : 'bg-white/40 border border-gray-200/30'
          } backdrop-blur-sm shadow-lg p-6`}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;