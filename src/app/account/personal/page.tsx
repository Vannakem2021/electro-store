"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Button from "@/components/ui/Button";

const PersonalDataPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "Ayman",
    lastName: "Ahmed",
    email: "ayman.ahmed@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "male",
    address: "123 Main Street",
    city: "New York",
    zipCode: "10001",
    country: "United States"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const sidebarItems = [
    { icon: "👤", label: "Personal Data", href: "/account/personal", active: true },
    { icon: "💳", label: "Payment & Installments", href: "/account/payment", active: false },
    { icon: "📦", label: "Orders", href: "/account/orders", active: false },
    { icon: "❤️", label: "Wish list", href: "/account/wishlist", active: false },
    { icon: "🏷️", label: "Discounts", href: "/account/discounts", active: false },
    { icon: "🔒", label: "Security & access", href: "/account/security", active: false },
    { icon: "🔔", label: "Notification", href: "/account", active: false },
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
          <span className="text-gray-900 font-medium">Personal Data</span>
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
                <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Personal Data</h1>
                <p className="text-gray-600 font-poppins">Manage your personal information</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 py-3 font-poppins font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-8 py-3 font-poppins font-semibold bg-blue-800 hover:bg-blue-900"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataPage;
