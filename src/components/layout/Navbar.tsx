"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navigationItems } from "@/data";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-800 hover:text-blue-900 transition-colors font-poppins"
            >
              Elecxo
            </Link>
          </div>

          {/* Search Bar - Repositioned after logo */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200 text-gray-900 placeholder-gray-600 font-poppins min-h-[40px]"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Moved after search */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-900 hover:text-blue-800 px-3 py-2 text-sm font-semibold transition-colors duration-200 font-poppins border-b-2 border-transparent hover:border-blue-800 min-h-[44px] flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-3 ml-6">
            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="p-3 text-gray-900 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg
                className="h-6 w-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-3 text-gray-900 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 relative group min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg
                className="h-6 w-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold font-poppins shadow-lg">
                3
              </span>
            </Link>

            {/* Account */}
            <Link
              href="/auth/login"
              className="p-3 text-gray-900 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg
                className="h-6 w-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Login Button */}
            <Link
              href="/auth/login"
              className="hidden md:inline-flex items-center px-4 py-2 border-2 border-blue-800 text-blue-800 font-poppins font-semibold rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 min-h-[44px]"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="p-3 text-gray-900 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-4 space-y-2 border-t-2 border-gray-200 bg-gray-50">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-900 hover:text-blue-800 hover:bg-blue-50 flex items-center px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200 font-poppins border-l-4 border-transparent hover:border-blue-800 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200 text-gray-900 placeholder-gray-600 font-poppins min-h-[44px]"
                />
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-800 text-white font-poppins font-semibold rounded-lg hover:bg-blue-900 transition-all duration-200 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-blue-800 text-blue-800 font-poppins font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
