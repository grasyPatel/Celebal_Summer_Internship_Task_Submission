import React from 'react';
import {
  FaUsers,
  FaSignOutAlt,
  FaBoxOpen,
  FaClipboardList,
  FaStore,
} from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0
         fixed md:relative
         top-0 left-0
         h-screen w-64
         bg-gray-900 z-30
         transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center p-4">
          <Link to="/admin" className="text-white text-2xl font-bold tracking-wide">
            SHOPNOW
          </Link>
        </div>

        <h2 className="text-lg text-white font-semibold text-center mb-4">
          Admin Dashboard
        </h2>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 px-4">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-3 font-medium'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3'
            }
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <FaUsers />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-3 font-medium'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3'
            }
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-3 font-medium'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3'
            }
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-3 font-medium'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3'
            }
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <FaStore />
            <span>Shop</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 mt-auto">
          <button
          onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-white bg-red-600 hover:bg-red-400 hover:text-white rounded transition"
            aria-label="Logout"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;