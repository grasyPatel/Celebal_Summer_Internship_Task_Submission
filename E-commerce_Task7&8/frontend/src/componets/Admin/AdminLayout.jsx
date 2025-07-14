// AdminLayout.jsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-auto">
        {/* Header */}
        <header className= "lg:hidden bg-gray-900 border-b px-4 py-4 shadow-sm flex gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white text-xl hover:text-gray-300"
            aria-label="Toggle Sidebar"
          >
            <FaBars size={20} />
          </button>
          <h2 className="text-xl font-semibold text-white  lg:hidden">Admin</h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;