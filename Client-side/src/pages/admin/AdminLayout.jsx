import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from '../../context/TranslationContext';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const { showSuccess } = useToast();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    showSuccess('Logged out successfully');
  };

  const menuItems = [
    { name: t('dashboard'), path: '/admin/dashboard', icon: FiHome },
    { name: t('products'), path: '/admin/products', icon: FiPackage },
    { name: t('orders'), path: '/admin/orders', icon: FiShoppingBag },
    { name: t('users'), path: '/admin/users', icon: FiUsers },
    { name: t('settings'), path: '/admin/settings', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="p-4">
          <h1 className={`text-2xl font-bold text-[#C585D7] ${!isSidebarOpen && 'hidden'}`}>
            {t('adminPanel')}
          </h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-700 hover:bg-[#C585D7] hover:text-white transition-colors ${
                  isActive ? 'bg-[#C585D7] text-white' : ''
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-500 hover:text-white transition-colors w-full"
          >
            <FiLogOut className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-3">{t('logout')}</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-[#C585D7]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{t('welcomeAdmin')}</span>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 