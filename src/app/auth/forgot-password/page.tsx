"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-blue-800 font-poppins">
              Elecxo
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 font-poppins">
              Forgot your password?
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-poppins">
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a link to reset your password"
              }
            </p>
          </div>

          {!isSubmitted ? (
            <>
              {/* Forgot Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 min-h-[48px]"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-poppins font-bold bg-blue-800 hover:bg-blue-900 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 font-poppins"
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
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                    Reset link sent!
                  </h3>
                  <p className="text-sm text-gray-600 font-poppins">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-xs text-gray-500 font-poppins">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full h-12 font-poppins font-semibold"
                  >
                    Try Again
                  </Button>
                  
                  <Link
                    href="/auth/login"
                    className="block text-sm font-medium text-blue-600 hover:text-blue-500 font-poppins"
                  >
                    ← Back to login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center text-white p-12 relative z-10">
          {/* Product Images */}
          <div className="mb-8 relative">
            <div className="relative w-80 h-80">
              {/* Earbuds */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎧</span>
                </div>
              </div>
              
              {/* Smartwatch */}
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-3xl">⌚</span>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold font-poppins">
              Secure account recovery
            </h1>
            <p className="text-lg text-blue-100 font-poppins max-w-md">
              We'll help you get back to shopping your favorite electronics
            </p>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 border border-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
