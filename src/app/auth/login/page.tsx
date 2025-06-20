"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import Button from "@/components/ui/Button";
import { ShoppingBagIcon, EyeIcon, EyeOffIcon } from "@/components/ui/Icons";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Handle Google OAuth
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Handle Facebook OAuth
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8">
        <div className="w-full space-y-6">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-teal-800 rounded-md flex items-center justify-center mr-3">
                <ShoppingBagIcon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-2xl font-bold text-teal-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Elecxo
              </span>
            </div>
            <h2
              className={`text-2xl font-bold text-gray-900 mb-2 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Welcome back
            </h2>
            <p
              className={`text-gray-700 text-sm ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Please enter your details to sign in
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              className={`flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700">Google</span>
            </button>

            <button
              onClick={handleFacebookLogin}
              className={`flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-3 bg-white text-gray-600 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                or
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium text-gray-800 mb-1 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:bg-white transition-all duration-200 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className={`block text-sm font-medium text-gray-800 mb-1 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:bg-white transition-all duration-200 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-teal-700 focus:ring-teal-600 border-gray-400 rounded"
                />
                <span
                  className={`ml-2 text-sm text-gray-700 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Remember for 30 days
                </span>
              </label>
              <Link
                href="/auth/forgot-password"
                className={`text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors duration-200 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 text-base font-semibold bg-teal-800 hover:bg-teal-900 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 text-white rounded-md transition-all duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Sign in
            </Button>
          </form>

          <div className="text-center mt-6">
            <span
              className={`text-sm text-gray-700 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className={`font-medium text-teal-700 hover:text-teal-800 transition-colors duration-200 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Create account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
