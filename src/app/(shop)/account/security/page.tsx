"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AccountSidebar from "@/components/account/AccountSidebar";

const SecurityPage: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password change submitted:", passwordData);
    // Handle password change logic
  };

  const activeSessions = [
    {
      device: "MacBook Pro",
      location: "New York, NY",
      lastActive: "Current session",
      isCurrent: true
    },
    {
      device: "iPhone 14",
      location: "New York, NY",
      lastActive: "2 hours ago",
      isCurrent: false
    },
    {
      device: "Chrome on Windows",
      location: "Los Angeles, CA",
      lastActive: "1 day ago",
      isCurrent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-poppins">
          <Link href="/" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/account" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            Account
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Security & access</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar activeItem="security" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Change Password</h2>
                <p className="text-gray-600 font-poppins">Update your password to keep your account secure</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="font-poppins font-semibold bg-blue-800 hover:bg-blue-900"
                >
                  Update Password
                </Button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Two-Factor Authentication</h2>
                <p className="text-gray-600 font-poppins">Add an extra layer of security to your account</p>
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-800 text-lg">🔐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-poppins">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 font-poppins">
                      {twoFactorEnabled ? "Enabled" : "Disabled"} - Secure your account with 2FA
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Security Preferences */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Security Preferences</h2>
                <p className="text-gray-600 font-poppins">Manage your security notification settings</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-800 text-lg">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">Email Security Alerts</h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        Get notified about security events via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-800 text-lg">🚨</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">Login Alerts</h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginAlerts}
                      onChange={(e) => setLoginAlerts(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Active Sessions</h2>
                <p className="text-gray-600 font-poppins">Manage devices that are currently logged into your account</p>
              </div>

              <div className="space-y-4">
                {activeSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 text-lg">💻</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 font-poppins">{session.device}</h3>
                        <p className="text-sm text-gray-600 font-poppins">
                          {session.location} • {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-poppins font-semibold text-red-600 border-red-300 hover:bg-red-50"
                      >
                        End Session
                      </Button>
                    )}
                    {session.isCurrent && (
                      <span className="text-sm text-green-600 font-poppins font-semibold">Current</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
