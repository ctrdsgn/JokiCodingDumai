'use client';

import { useState } from 'react';
import { Save, Bell, Mail, Globe, Lock } from 'lucide-react';
import { AdminCard } from '../../components/admin';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Joki Coding Dumai',
    siteEmail: 'contact@jokicodingdumai.com',
    sitePhone: '+62 812 3456 7890',
    notificationsEnabled: true,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    // In a real app, this would save to the database
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your site settings and preferences
        </p>
      </div>

      {/* General Settings */}
      <AdminCard title="General Settings">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={settings.sitePhone}
                onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Notifications */}
      <AdminCard title="Notifications">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-teal-400" />
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Receive browser notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-gray-400 text-sm">Get notified via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </div>
      </AdminCard>

      {/* Site Status */}
      <AdminCard title="Site Status">
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800 border border-gray-700">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-white font-medium">Maintenance Mode</p>
              <p className="text-gray-400 text-sm">Show maintenance page to visitors</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </AdminCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
