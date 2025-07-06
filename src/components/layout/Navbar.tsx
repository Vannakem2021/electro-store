"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { navigationItems } from "@/data";
import {
  SearchIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/Icons";
import { SearchInput } from "@/components/ui";

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-teal-800 hover:text-teal-900 transition-colors font-rubik"
            >
              Elecxo
            </Link>
          </div>

          {/* Search Bar - Clean and prominent */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchInput />
          </div>

          {/* Desktop Navigation - Clean and minimal */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200 font-rubik"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions - Clean and minimal */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            {/* Language toggle removed - simplified interface */}

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200 relative"
              title="Wishlist"
            >
              <HeartIcon className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200 relative"
              title="Shopping Cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/auth/login"
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
            >
              <UserIcon className="h-5 w-5" />
            </Link>

            {/* Login Button - Simplified */}
            <Link
              href="/auth/login"
              className="ml-4 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Clean and minimal */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-4 space-y-3 border-t border-gray-200 bg-white">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-teal-600 flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 font-rubik"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {/* Language toggle removed - simplified interface */}

                <SearchInput isMobile={true} />
                <div className="flex space-x-3">
                  <Link
                    href="/account/wishlist"
                    className="flex-1 flex items-center justify-center py-3 text-gray-600 hover:text-teal-600 transition-colors duration-200 relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HeartIcon className="h-5 w-5 mr-2" />
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="absolute top-1 right-8 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                        {wishlistCount > 99 ? "99+" : wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className="flex-1 flex items-center justify-center py-3 text-gray-600 hover:text-teal-600 transition-colors duration-200 relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    Cart
                    {itemCount > 0 && (
                      <span className="absolute top-1 right-8 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    )}
                  </Link>
                </div>
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
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
