import React, { useState, useEffect } from 'react';
import { FiSave, FiSettings, FiBell, FiGlobe, FiAlertTriangle } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import adminService from '../../services/admin.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useTranslation } from '../../context/TranslationContext';

const Settings = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    adminEmail: '',
    currency: 'ETB',
    timezone: 'UTC',
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    maintenanceMode: false
  });

  useEffect(() => {
    let mounted = true;
    const loadSettings = async () => {
      try {
        const resp = await adminService.getSettings();
        const payload = resp.settings || resp;
        if (mounted) setSettings((prev) => ({ ...prev, ...payload }));
      } catch (err) {
        console.error(t('adminCopy.settingsLoadFailed'), err);
        showError(t('adminCopy.settingsLoadFailed'));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadSettings();
    return () => { mounted = false; };
  }, []);

  const update = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await adminService.updateSettings(settings);
      showSuccess(t('adminCopy.settingsSaved'));
    } catch (err) {
      console.error(t('adminCopy.settingsSaveFailed'), err);
      showError(t('adminCopy.settingsSaveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: t('adminCopy.general'), icon: FiSettings },
    { id: 'notifications', label: t('adminCopy.notifications'), icon: FiBell },
    { id: 'system', label: t('adminCopy.system'), icon: FiGlobe },
  ];

  const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#C585D7] focus:ring-2 focus:ring-[#C585D7]/20';

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-rose-200">{t('adminCopy.configuration')}</p>
            <h1 className="mt-2 text-3xl font-semibold">{t('settings')}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              {t('adminCopy.settingsDescription')}
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-rose-50 disabled:opacity-60"
          >
            <FiSave className="h-4 w-4" />
            {isSaving ? t('adminCopy.saving') : t('saveChanges')}
          </button>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm">
        {/* Tab bar */}
        <div className="flex gap-2 border-b border-slate-100 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* General */}
        {activeTab === 'general' && (
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{t('adminCopy.siteName')}</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => update('siteName', e.target.value)}
                placeholder="AdeyBloom"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{t('adminCopy.siteDescription')}</label>
              <textarea
                rows={3}
                value={settings.siteDescription}
                onChange={(e) => update('siteDescription', e.target.value)}
                placeholder={t('adminCopy.storeDescriptionPlaceholder')}
                className={inputClass}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t('adminCopy.adminEmail')}</label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => update('adminEmail', e.target.value)}
                  placeholder="admin@adeybloom.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t('adminCopy.currency')}</label>
                <select
                  value={settings.currency}
                  onChange={(e) => update('currency', e.target.value)}
                  className={inputClass}
                >
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="mt-6 space-y-1">
            {[
              { key: 'emailNotifications', label: t('adminCopy.emailNotifications'), desc: t('adminCopy.emailNotificationsDescription') },
              { key: 'orderNotifications', label: t('adminCopy.orderNotifications'), desc: t('adminCopy.orderNotificationsDescription') },
              { key: 'lowStockAlerts', label: t('adminCopy.lowStockAlerts'), desc: t('adminCopy.lowStockAlertsDescription') },
            ].map(({ key, label, desc }) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-2xl px-4 py-4 transition hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings[key]}
                  onClick={() => update(key, !settings[key])}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                    settings[key] ? 'bg-[#C585D7]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                      settings[key] ? 'translate-x-[22px]' : 'translate-x-[2px]'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        )}

        {/* System */}
        {activeTab === 'system' && (
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{t('adminCopy.timezone')}</label>
              <select
                value={settings.timezone}
                onChange={(e) => update('timezone', e.target.value)}
                className={inputClass}
              >
                <option value="UTC">UTC</option>
                <option value="Africa/Addis_Ababa">Africa/Addis Ababa</option>
                <option value="America/New_York">America/New York</option>
                <option value="Europe/London">Europe/London</option>
              </select>
            </div>

            {/* Maintenance mode */}
            <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{t('adminCopy.maintenanceMode')}</p>
                  <p className="text-xs text-slate-500">{t('adminCopy.maintenanceModeDescription')}</p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.maintenanceMode}
                onClick={() => update('maintenanceMode', !settings.maintenanceMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                  settings.maintenanceMode ? 'bg-amber-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                    settings.maintenanceMode ? 'translate-x-[22px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Settings;
