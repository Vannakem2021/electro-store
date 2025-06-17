"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer } from "@/components";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [billingAddress, setBillingAddress] = useState("same");
  const [discountCode, setDiscountCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to success page
    window.location.href = "/success";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-mono">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/cart"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Cart
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/checkout"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Checkout
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">Payment</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-mono tracking-tight">
            Payment
          </h1>
          <p className="text-gray-600 font-mono">
            Complete your purchase securely
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8 md:mb-12 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 min-w-max px-4">
            {/* Cart Step */}
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
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
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-green-600 font-mono">
                Cart
              </span>
            </div>

            {/* Line */}
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-green-600 rounded-full"></div>

            {/* Checkout Step */}
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
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
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-green-600 font-mono hidden sm:inline">
                Checkout
              </span>
            </div>

            {/* Line */}
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-blue-700 rounded-full"></div>

            {/* Payment Step */}
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-blue-700 font-mono hidden sm:inline">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-mono mb-6">
                    Payment Method
                  </h3>
                  <div className="space-y-4">
                    {/* Credit Cards */}
                    <div
                      className={`p-6 border-2 rounded-2xl transition-all duration-300 ease-in-out ${
                        paymentMethod === "credit-card"
                          ? "border-blue-700 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="credit-card"
                            name="paymentMethod"
                            type="radio"
                            value="credit-card"
                            checked={paymentMethod === "credit-card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                          />
                          <div className="ml-4">
                            <label
                              htmlFor="credit-card"
                              className="text-sm font-bold text-gray-900 font-mono cursor-pointer"
                            >
                              Credit / Debit Card
                            </label>
                            <p className="text-sm text-gray-600 font-mono">
                              Secure payment with SSL encryption
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="px-3 py-1 bg-blue-700 text-white text-xs font-bold rounded-lg font-mono">
                            VISA
                          </div>
                          <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg font-mono">
                            MC
                          </div>
                          <div className="px-3 py-1 bg-blue-800 text-white text-xs font-bold rounded-lg font-mono">
                            AMEX
                          </div>
                        </div>
                      </div>

                      {/* Credit Card Form */}
                      {paymentMethod === "credit-card" && (
                        <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-900 font-mono mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-bold text-gray-900 font-mono mb-2">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 font-mono mb-2">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-900 font-mono mb-2">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PayPal */}
                    <div
                      className={`p-6 border-2 rounded-2xl transition-all duration-300 ease-in-out ${
                        paymentMethod === "paypal"
                          ? "border-blue-700 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                          />
                          <div className="ml-4">
                            <label
                              htmlFor="paypal"
                              className="text-sm font-bold text-gray-900 font-mono cursor-pointer"
                            >
                              PayPal
                            </label>
                            <p className="text-sm text-gray-600 font-mono">
                              Pay with your PayPal account
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg font-mono">
                          PayPal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 font-mono">
                      Billing Address
                    </h3>
                    <button
                      type="button"
                      className="text-blue-700 hover:text-blue-800 font-mono text-sm font-semibold transition-colors duration-200"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-mono">
                        Same as shipping address
                      </p>
                      <p className="text-gray-600 font-mono text-sm mt-1">
                        Headgear, 25 First Street, Cambridge MA 02141, United
                        States
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-green-900 font-mono mb-1">
                        Secure Payment
                      </h4>
                      <p className="text-sm text-green-700 font-mono">
                        Your payment information is encrypted and secure. We
                        never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                  <Link
                    href="/checkout"
                    className="text-blue-700 hover:text-blue-800 font-mono text-sm font-semibold transition-colors duration-200 hover:underline"
                  >
                    ← Return to Checkout
                  </Link>
                  <div className="flex-1">
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-mono font-bold bg-blue-700 hover:bg-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                    >
                      Complete Payment
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 lg:sticky lg:top-8">
              <h3 className="text-xl font-bold text-gray-900 font-mono mb-6">
                Order Summary
              </h3>

              {/* Product Items */}
              <div className="space-y-4 mb-6">
                {/* MacBook Pro */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop"
                      alt="MacBook Pro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 font-mono">
                      MacBook Pro M2 MNEJ3 2022
                    </h4>
                    <p className="text-xs text-gray-600 font-mono">Qty: 1</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500 line-through font-mono">
                        $1,093.00
                      </span>
                      <span className="text-sm font-bold text-blue-700 font-mono">
                        $433.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Case Sleeve */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop"
                      alt="Case Sleeve"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 font-mono">
                      Inateck Laptop Case Sleeve
                    </h4>
                    <p className="text-xs text-gray-600 font-mono">Qty: 1</p>
                    <span className="text-sm font-bold text-blue-700 font-mono">
                      $63.26
                    </span>
                  </div>
                </div>

                {/* Privacy Screen */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=60&h=60&fit=crop"
                      alt="Privacy Screen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 font-mono">
                      Laptop Privacy Screen 13"
                    </h4>
                    <p className="text-xs text-gray-600 font-mono">Qty: 1</p>
                    <span className="text-sm font-bold text-blue-700 font-mono">
                      $23.26
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Totals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-mono">Subtotal</span>
                  <span className="font-semibold text-gray-900 font-mono">
                    $519.52
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-mono">Discount</span>
                  <span className="font-semibold text-red-600 font-mono">
                    -$111.87
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-mono">Shipping</span>
                  <span className="font-semibold text-gray-900 font-mono">
                    $22.50
                  </span>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 font-mono">
                      Total
                    </span>
                    <span className="text-xl font-bold text-blue-700 font-mono">
                      $543.02
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Security */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm font-bold text-green-700 font-mono">
                    256-bit SSL Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
