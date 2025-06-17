"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";

interface NotificationSettings {
  emails: boolean;
  pushToDevice: boolean;
  orderDelivered: boolean;
  productAvailability: boolean;
}

const AccountPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emails: true,
    pushToDevice: true,
    orderDelivered: true,
    productAvailability: true,
  });

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sidebarItems = [
    { icon: "👤", label: "Personal Data", href: "/account/personal", active: false },
    { icon: "💳", label: "Payment & Installments", href: "/account/payment", active: false },
    { icon: "📦", label: "Orders", href: "/account/orders", active: false },
    { icon: "❤️", label: "Wish list", href: "/account/wishlist", active: false },
    { icon: "🏷️", label: "Discounts", href: "/account/discounts", active: false },
    { icon: "🔒", label: "Security & access", href: "/account/security", active: false },
    { icon: "🔔", label: "Notification", href: "/account/notification", active: true },
    { icon: "📞", label: "Contact us", href: "/account/contact", active: false },
    { icon: "🚪", label: "Log out", href: "/logout", active: false, isLogout: true },
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
          <span className="text-gray-900 font-medium">Notification</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              {/* User Profile Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-poppins">Ayman ahmed</h3>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="p-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-poppins text-sm ${
                      item.active
                        ? "bg-blue-50 text-blue-800 border-r-4 border-blue-800"
                        : item.isLogout
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Notification</h1>
                <p className="text-gray-600 font-poppins">Manage your notification settings</p>
              </div>

              {/* Notification Settings */}
              <div className="space-y-6">
                {/* Emails */}
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-800 text-lg">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">Emails</h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        We send emails to let you know what's important, like new orders, confirmations, and more.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emails}
                      onChange={() => handleNotificationToggle('emails')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Push to your Device */}
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-800 text-lg">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">Push to your Device</h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        Receive notifications about important updates, promotions and other updates.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.pushToDevice}
                      onChange={() => handleNotificationToggle('pushToDevice')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Order Delivered */}
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-800 text-lg">📦</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">Order Delivered</h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        You will be notified once the order is delivered.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.orderDelivered}
                      onChange={() => handleNotificationToggle('orderDelivered')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Product's availability */}
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-800 text-lg">🛍️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">Product's availability</h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        You will be notified when out of stock products gets available again.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.productAvailability}
                      onChange={() => handleNotificationToggle('productAvailability')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
