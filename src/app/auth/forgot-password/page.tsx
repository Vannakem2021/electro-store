"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import Button from "@/components/ui/Button";
import { ShoppingBagIcon } from "@/components/ui/Icons";

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8">
        <div className="w-full space-y-6">
          {/* Logo and Header */}
          <div className="text-center">
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
              Forgot Password?
            </h2>
            <p
              className={`text-gray-700 text-sm ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {isSubmitted
                ? "Check your email for reset instructions"
                : "No worries, we'll send you reset instructions"}
            </p>
          </div>

          {!isSubmitted ? (
            <>
              {/* Forgot Password Form */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:bg-white transition-all duration-200 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full h-12 text-base font-semibold bg-teal-800 hover:bg-teal-900 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 text-white rounded-md transition-all duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Send Reset Link
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className={`text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  ← Back to login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3
                    className={`text-lg font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Reset link sent!
                  </h3>
                  <p
                    className={`text-sm text-gray-700 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    We&apos;ve sent a password reset link to{" "}
                    <strong>{email}</strong>
                  </p>
                  <p
                    className={`text-xs text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Didn&apos;t receive the email? Check your spam folder or try
                    again.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className={`w-full h-12 font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-md transition-all duration-200 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Try Again
                  </Button>

                  <Link
                    href="/auth/login"
                    className={`block text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors duration-200 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    ← Back to login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
