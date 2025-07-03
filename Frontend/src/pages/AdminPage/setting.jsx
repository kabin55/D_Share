import React, { useState, useEffect } from "react";

const DEFAULTS = {
  systemName: "D-Share",
  storageLimit: "50 GB",
  fileRetention: "90 days",
  require2FA: false,
  passwordComplexity: "Medium",
  sessionTimeout: "1 hour",
  emailAlerts: true,
  systemNotifications: true,
  autoDeactivateUsers: false,
  maxLoginAttempts: 5,
  darkMode: false,
  apiAccessEnabled: true,
};

const Settings = () => {
  // State with localStorage init
  const [systemName, setSystemName] = useState(
    () => localStorage.getItem("systemName") || DEFAULTS.systemName
  );
  const [storageLimit, setStorageLimit] = useState(
    () => localStorage.getItem("storageLimit") || DEFAULTS.storageLimit
  );
  const [fileRetention, setFileRetention] = useState(
    () => localStorage.getItem("fileRetention") || DEFAULTS.fileRetention
  );
  const [require2FA, setRequire2FA] = useState(
    () => JSON.parse(localStorage.getItem("require2FA")) ?? DEFAULTS.require2FA
  );
  const [passwordComplexity, setPasswordComplexity] = useState(
    () =>
      localStorage.getItem("passwordComplexity") || DEFAULTS.passwordComplexity
  );
  const [sessionTimeout, setSessionTimeout] = useState(
    () => localStorage.getItem("sessionTimeout") || DEFAULTS.sessionTimeout
  );

  // New settings state
  const [emailAlerts, setEmailAlerts] = useState(
    () =>
      JSON.parse(localStorage.getItem("emailAlerts")) ?? DEFAULTS.emailAlerts
  );
  const [systemNotifications, setSystemNotifications] = useState(
    () =>
      JSON.parse(localStorage.getItem("systemNotifications")) ??
      DEFAULTS.systemNotifications
  );
  const [autoDeactivateUsers, setAutoDeactivateUsers] = useState(
    () =>
      JSON.parse(localStorage.getItem("autoDeactivateUsers")) ??
      DEFAULTS.autoDeactivateUsers
  );
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(
    () =>
      parseInt(localStorage.getItem("maxLoginAttempts")) ||
      DEFAULTS.maxLoginAttempts
  );
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) ?? DEFAULTS.darkMode
  );
  const [apiAccessEnabled, setApiAccessEnabled] = useState(
    () =>
      JSON.parse(localStorage.getItem("apiAccessEnabled")) ??
      DEFAULTS.apiAccessEnabled
  );

  // Save to localStorage
  useEffect(() => localStorage.setItem("systemName", systemName), [systemName]);
  useEffect(
    () => localStorage.setItem("storageLimit", storageLimit),
    [storageLimit]
  );
  useEffect(
    () => localStorage.setItem("fileRetention", fileRetention),
    [fileRetention]
  );
  useEffect(
    () => localStorage.setItem("require2FA", JSON.stringify(require2FA)),
    [require2FA]
  );
  useEffect(
    () => localStorage.setItem("passwordComplexity", passwordComplexity),
    [passwordComplexity]
  );
  useEffect(
    () => localStorage.setItem("sessionTimeout", sessionTimeout),
    [sessionTimeout]
  );
  useEffect(
    () => localStorage.setItem("emailAlerts", JSON.stringify(emailAlerts)),
    [emailAlerts]
  );
  useEffect(
    () =>
      localStorage.setItem(
        "systemNotifications",
        JSON.stringify(systemNotifications)
      ),
    [systemNotifications]
  );
  useEffect(
    () =>
      localStorage.setItem(
        "autoDeactivateUsers",
        JSON.stringify(autoDeactivateUsers)
      ),
    [autoDeactivateUsers]
  );
  useEffect(
    () => localStorage.setItem("maxLoginAttempts", maxLoginAttempts.toString()),
    [maxLoginAttempts]
  );
  useEffect(
    () => localStorage.setItem("darkMode", JSON.stringify(darkMode)),
    [darkMode]
  );
  useEffect(
    () =>
      localStorage.setItem(
        "apiAccessEnabled",
        JSON.stringify(apiAccessEnabled)
      ),
    [apiAccessEnabled]
  );

  // Sync changes across tabs
  useEffect(() => {
    function onStorageChange(e) {
      switch (e.key) {
        case "systemName":
          if (e.newValue !== systemName)
            setSystemName(e.newValue || DEFAULTS.systemName);
          break;
        case "storageLimit":
          if (e.newValue !== storageLimit)
            setStorageLimit(e.newValue || DEFAULTS.storageLimit);
          break;
        case "fileRetention":
          if (e.newValue !== fileRetention)
            setFileRetention(e.newValue || DEFAULTS.fileRetention);
          break;
        case "require2FA": {
          const val =
            e.newValue !== null ? JSON.parse(e.newValue) : DEFAULTS.require2FA;
          if (val !== require2FA) setRequire2FA(val);
          break;
        }
        case "passwordComplexity":
          if (e.newValue !== passwordComplexity)
            setPasswordComplexity(e.newValue || DEFAULTS.passwordComplexity);
          break;
        case "sessionTimeout":
          if (e.newValue !== sessionTimeout)
            setSessionTimeout(e.newValue || DEFAULTS.sessionTimeout);
          break;
        case "emailAlerts": {
          const val =
            e.newValue !== null ? JSON.parse(e.newValue) : DEFAULTS.emailAlerts;
          if (val !== emailAlerts) setEmailAlerts(val);
          break;
        }
        case "systemNotifications": {
          const val =
            e.newValue !== null
              ? JSON.parse(e.newValue)
              : DEFAULTS.systemNotifications;
          if (val !== systemNotifications) setSystemNotifications(val);
          break;
        }
        case "autoDeactivateUsers": {
          const val =
            e.newValue !== null
              ? JSON.parse(e.newValue)
              : DEFAULTS.autoDeactivateUsers;
          if (val !== autoDeactivateUsers) setAutoDeactivateUsers(val);
          break;
        }
        case "maxLoginAttempts": {
          const val = parseInt(e.newValue) || DEFAULTS.maxLoginAttempts;
          if (val !== maxLoginAttempts) setMaxLoginAttempts(val);
          break;
        }
        case "darkMode": {
          const val =
            e.newValue !== null ? JSON.parse(e.newValue) : DEFAULTS.darkMode;
          if (val !== darkMode) setDarkMode(val);
          break;
        }
        case "apiAccessEnabled": {
          const val =
            e.newValue !== null
              ? JSON.parse(e.newValue)
              : DEFAULTS.apiAccessEnabled;
          if (val !== apiAccessEnabled) setApiAccessEnabled(val);
          break;
        }
        default:
          break;
      }
    }
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [
    systemName,
    storageLimit,
    fileRetention,
    require2FA,
    passwordComplexity,
    sessionTimeout,
    emailAlerts,
    systemNotifications,
    autoDeactivateUsers,
    maxLoginAttempts,
    darkMode,
    apiAccessEnabled,
  ]);

  // Reset all settings to defaults
  const resetSettings = () => {
    setSystemName(DEFAULTS.systemName);
    setStorageLimit(DEFAULTS.storageLimit);
    setFileRetention(DEFAULTS.fileRetention);
    setRequire2FA(DEFAULTS.require2FA);
    setPasswordComplexity(DEFAULTS.passwordComplexity);
    setSessionTimeout(DEFAULTS.sessionTimeout);
    setEmailAlerts(DEFAULTS.emailAlerts);
    setSystemNotifications(DEFAULTS.systemNotifications);
    setAutoDeactivateUsers(DEFAULTS.autoDeactivateUsers);
    setMaxLoginAttempts(DEFAULTS.maxLoginAttempts);
    setDarkMode(DEFAULTS.darkMode);
    setApiAccessEnabled(DEFAULTS.apiAccessEnabled);
  };

  // Handlers for buttons (simulate actions)
  const handleBackupNow = () => alert("Backup started (simulated).");
  const handleRestore = () => alert("Restore started (simulated).");
  const handleClearCaches = () => alert("Caches cleared (simulated).");
  const handleRebuildIndex = () => alert("Search index rebuilt (simulated).");
  const handleRestartSystem = () => alert("System restarting (simulated).");
  const handlePurgeData = () => {
    if (
      window.confirm("Are you sure? This will permanently delete user data!")
    ) {
      alert("Data purged (simulated).");
    }
  };

  return (
    <div className="space-y-6">
      {/* System Settings */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          System Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General */}
          <div>
            <h3 className="font-medium mb-3 border-b border-gray-700 pb-2 text-white">
              General
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">System Name</label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="border border-gray-600 rounded px-3 py-1 text-sm bg-gray-700 text-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  Default Storage Limit
                </label>
                <select
                  value={storageLimit}
                  onChange={(e) => setStorageLimit(e.target.value)}
                  className="border border-gray-600 rounded px-3 py-1 text-sm bg-gray-700 text-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option>10 GB</option>
                  <option>25 GB</option>
                  <option>50 GB</option>
                  <option>100 GB</option>
                </select>
              </div>

              <div className="flex justify-between items-center hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  File Retention Policy
                </label>
                <select
                  value={fileRetention}
                  onChange={(e) => setFileRetention(e.target.value)}
                  className="border border-gray-600 rounded px-3 py-1 text-sm bg-gray-700 text-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                  <option>Indefinite</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="font-medium mb-3 border-b border-gray-700 pb-2 text-white">
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">Require 2FA</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={require2FA}
                    onChange={() => setRequire2FA(!require2FA)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  Password Complexity
                </label>
                <select
                  value={passwordComplexity}
                  onChange={(e) => setPasswordComplexity(e.target.value)}
                  className="border border-gray-600 rounded px-3 py-1 text-sm bg-gray-700 text-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">Session Timeout</label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="border border-gray-600 rounded px-3 py-1 text-sm bg-gray-700 text-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option>15 minutes</option>
                  <option>1 hour</option>
                  <option>8 hours</option>
                  <option>24 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="font-medium mb-3 border-b border-gray-700 pb-2 text-white">
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">Email Alerts</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  System Notifications
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemNotifications}
                    onChange={() =>
                      setSystemNotifications(!systemNotifications)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div>
            <h3 className="font-medium mb-3 border-b border-gray-700 pb-2 text-white">
              User Management
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  Auto Deactivate Users
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoDeactivateUsers}
                    onChange={() =>
                      setAutoDeactivateUsers(!autoDeactivateUsers)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex justify-between items-center hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={maxLoginAttempts}
                  onChange={(e) =>
                    setMaxLoginAttempts(
                      Math.min(20, Math.max(1, parseInt(e.target.value) || 1))
                    )
                  }
                  className="border border-gray-600 rounded px-3 py-1 text-sm bg-gray-700 text-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-20 text-center"
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="font-medium mb-3 border-b border-gray-700 pb-2 text-white">
              Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">Dark Mode</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* API Access */}
          <div>
            <h3 className="font-medium mb-3 border-b border-gray-700 pb-2 text-white">
              API Access
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <label className="text-sm text-gray-400">
                  Enable API Access
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={apiAccessEnabled}
                    onChange={() => setApiAccessEnabled(!apiAccessEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white text-sm mt-1"
                onClick={() => alert("API key regenerated (simulated)")}
              >
                Regenerate API Key
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center">
          <h3 className="font-medium mb-3 text-white">Danger Zone</h3>
          <div className="space-x-3">
            <button
              onClick={handleClearCaches}
              className="text-red-400 border border-red-500 hover:bg-red-500 hover:bg-opacity-10 px-4 py-2 rounded text-sm"
            >
              Clear All Caches
            </button>
            <button
              onClick={handleRebuildIndex}
              className="text-red-400 border border-red-500 hover:bg-red-500 hover:bg-opacity-10 px-4 py-2 rounded text-sm"
            >
              Rebuild Search Index
            </button>
            <button
              onClick={handleRestartSystem}
              className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded text-sm"
            >
              System Restart
            </button>
            <button
              onClick={handlePurgeData}
              className="bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded text-sm"
            >
              Purge All User Data
            </button>
            <button
              onClick={resetSettings}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
              title="Reset all settings to defaults"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Backup & Restore
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm">
            <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full mb-3">
              <span className="text-blue-400 text-xl">⏱️</span>
            </div>
            <h3 className="font-medium mb-1 text-white hover:text-blue-400">
              Auto Backup
            </h3>
            <p className="text-sm text-gray-400 mb-3 hover:text-gray-300">
              Configure automatic backups
            </p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
              Configure
            </button>
          </div>

          <div className="border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm">
            <div className="bg-green-500 bg-opacity-20 p-3 rounded-full mb-3">
              <span className="text-green-400 text-xl">💾</span>
            </div>
            <h3 className="font-medium mb-1 text-white hover:text-green-400">
              Manual Backup
            </h3>
            <p className="text-sm text-gray-400 mb-3 hover:text-gray-300">
              Create backup now
            </p>
            <button
              onClick={handleBackupNow}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Backup Now
            </button>
          </div>

          <div className="border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm">
            <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full mb-3">
              <span className="text-purple-400 text-xl">🔄</span>
            </div>
            <h3 className="font-medium mb-1 text-white hover:text-purple-400">
              Restore
            </h3>
            <p className="text-sm text-gray-400 mb-3 hover:text-gray-300">
              Restore from backup
            </p>
            <button
              onClick={handleRestore}
              className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
            >
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
