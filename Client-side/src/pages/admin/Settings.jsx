import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import { FiSave, FiSettings, FiUser, FiMail, FiLock, FiGlobe } from 'react-icons/fi';

const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    adminEmail: '',
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    maintenanceMode: false
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadSettings = async () => {
      try {
        const resp = await (await import('../../services/admin.service')).default.getSettings();
        const payload = resp.settings || resp;
        if (mounted) setSettings(prev => ({ ...prev, ...payload }));
      } catch (err) {
        console.error('Failed to load settings', err);
      }
    };
    loadSettings();
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    (async () => {
      try {
        const adminService = (await import('../../services/admin.service')).default;
        await adminService.updateSettings(settings);
        // Optionally show toast
      } catch (err) {
        console.error('Failed to save settings', err);
      } finally {
        setIsSaving(false);
      }
    })();
  };

  const tabs = [
    { id: 'general', name: t('general') || 'General', icon: FiSettings },
    { id: 'admin', name: t('adminSettings') || 'Admin', icon: FiUser },
    { id: 'notifications', name: t('notifications') || 'Notifications', icon: FiMail },
    { id: 'system', name: t('system') || 'System', icon: FiGlobe }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('settings') || 'Settings'}</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#C585D7] disabled:opacity-60 text-white px-6 py-2 rounded-lg hover:bg-[#B574C6] transition-colors flex items-center gap-2"
        >
          <FiSave className="w-4 h-4" />
          {isSaving ? (t('saving') || 'Saving...') : (t('save') || 'Save Changes')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#C585D7] text-[#C585D7]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('siteName') || 'Site Name'}
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C585D7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('currency') || 'Currency'}
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C585D7]"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="ETB">ETB</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('siteDescription') || 'Site Description'}
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C585D7]"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('adminEmail') || 'Admin Email'}
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C585D7]"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {t('emailNotifications') || 'Email Notifications'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('emailNotificationsDesc') || 'Receive email notifications for important events'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="h-4 w-4 text-[#C585D7] focus:ring-[#C585D7] border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {t('orderNotifications') || 'Order Notifications'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('orderNotificationsDesc') || 'Get notified when new orders are placed'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.orderNotifications}
                    onChange={(e) => handleInputChange('orderNotifications', e.target.checked)}
                    className="h-4 w-4 text-[#C585D7] focus:ring-[#C585D7] border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {t('lowStockAlerts') || 'Low Stock Alerts'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('lowStockAlertsDesc') || 'Get alerted when products are running low'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.lowStockAlerts}
                    onChange={(e) => handleInputChange('lowStockAlerts', e.target.checked)}
                    className="h-4 w-4 text-[#C585D7] focus:ring-[#C585D7] border-gray-300 rounded"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('language') || 'Language'}
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C585D7]"
                  >
                    <option value="en">English</option>
                    <option value="am">አማርኛ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('timezone') || 'Timezone'}
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C585D7]"
                  >
                    <option value="UTC">UTC</option>
                    <option value="Africa/Addis_Ababa">Africa/Addis_Ababa</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {t('maintenanceMode') || 'Maintenance Mode'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('maintenanceModeDesc') || 'Put the site in maintenance mode'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  className="h-4 w-4 text-[#C585D7] focus:ring-[#C585D7] border-gray-300 rounded"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
