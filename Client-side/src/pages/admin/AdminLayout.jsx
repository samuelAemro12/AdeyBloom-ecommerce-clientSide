import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiLogOut, FiPackage, FiSettings, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from '../../context/TranslationContext';
import { useAuth } from '../../context/useAuth';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
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
    { name: t('settings'), path: '/admin/settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#fff 38%,#f7f7fb_100%)] text-slate-900">
      <div className="flex min-h-screen">
        <aside
          className={`border-r border-white/60 bg-slate-950 text-white shadow-2xl shadow-slate-900/10 transition-all duration-300 ${
            isSidebarOpen ? 'w-72' : 'w-24'
          }`}
        >
          <div className="border-b border-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-200">AdeyBloom</p>
            <h1 className={`mt-3 text-2xl font-semibold ${!isSidebarOpen ? 'hidden' : ''}`}>{t('adminPanel')}</h1>
          </div>

          <nav className="space-y-2 p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen ? <span>{item.name}</span> : null}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-rose-500 hover:text-white"
            >
              <FiLogOut className="h-5 w-5 shrink-0" />
              {isSidebarOpen ? <span>{t('logout')}</span> : null}
            </button>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen((current) => !current)}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Operations hub</p>
                  <p className="mt-1 text-sm text-slate-600">{t('welcomeAdmin')}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-right shadow-sm">
                <p className="text-sm font-medium text-slate-900">{user?.name || 'Admin'}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">{user?.role || 'admin'}</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
