"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer } from "@/components";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "Jimmy Smith",
    lastName: "",
    address: "Headgear, 25 First Street, Cambridge MA 02141, United States",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    saveInfo: false,
  });

  const [shippingMethod, setShippingMethod] = useState("express");
  const [discountCode, setDiscountCode] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout submitted:", formData);
    // Handle checkout logic here
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
          <span className="text-gray-900 font-semibold">Checkout</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-mono tracking-tight">
            Checkout
          </h1>
          <p className="text-gray-600 font-mono">
            Review your order and complete your purchase
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
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-blue-700 rounded-full"></div>

            {/* Checkout Step */}
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-blue-700 font-mono hidden sm:inline">
                Checkout
              </span>
            </div>

            {/* Line */}
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-gray-300 rounded-full"></div>

            {/* Payment Step */}
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-gray-500 font-mono hidden sm:inline">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* User Section */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 font-mono mb-4">
                    Customer Information
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-mono font-semibold">
                        {formData.firstName}
                      </p>
                      <p className="text-gray-600 font-mono text-sm">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ship to Section */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 font-mono">
                      Shipping Address
                    </h3>
                    <button
                      type="button"
                      className="text-blue-700 hover:text-blue-800 font-mono text-sm font-semibold transition-colors duration-200"
                    >
                      Edit
                    </button>
                  </div>
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
                        {formData.address}
                      </p>
                      <p className="text-gray-600 font-mono text-sm mt-1">
                        Default shipping address
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-mono mb-6">
                    Shipping Method
                  </h3>
                  <div className="space-y-4">
                    {/* Free Shipping */}
                    <div
                      className={`flex items-center justify-between p-4 border-2 rounded-2xl transition-all duration-300 ease-in-out ${
                        shippingMethod === "free"
                          ? "border-blue-700 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          id="free-shipping"
                          name="shippingMethod"
                          type="radio"
                          value="free"
                          checked={shippingMethod === "free"}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                        />
                        <div className="ml-4">
                          <label
                            htmlFor="free-shipping"
                            className="text-sm font-bold text-gray-900 font-mono cursor-pointer"
                          >
                            Free Shipping
                          </label>
                          <p className="text-sm text-gray-600 font-mono">
                            7-30 business days
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900 font-mono">
                        FREE
                      </span>
                    </div>

                    {/* Regular Shipping */}
                    <div
                      className={`flex items-center justify-between p-4 border-2 rounded-2xl transition-all duration-300 ease-in-out ${
                        shippingMethod === "regular"
                          ? "border-blue-700 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          id="regular-shipping"
                          name="shippingMethod"
                          type="radio"
                          value="regular"
                          checked={shippingMethod === "regular"}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                        />
                        <div className="ml-4">
                          <label
                            htmlFor="regular-shipping"
                            className="text-sm font-bold text-gray-900 font-mono cursor-pointer"
                          >
                            Regular Shipping
                          </label>
                          <p className="text-sm text-gray-600 font-mono">
                            3-14 business days
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900 font-mono">
                        $7.50
                      </span>
                    </div>

                    {/* Express Shipping */}
                    <div
                      className={`flex items-center justify-between p-4 border-2 rounded-2xl transition-all duration-300 ease-in-out ${
                        shippingMethod === "express"
                          ? "border-blue-700 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          id="express-shipping"
                          name="shippingMethod"
                          type="radio"
                          value="express"
                          checked={shippingMethod === "express"}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                        />
                        <div className="ml-4">
                          <label
                            htmlFor="express-shipping"
                            className="text-sm font-bold text-gray-900 font-mono cursor-pointer"
                          >
                            Express Shipping
                          </label>
                          <p className="text-sm text-gray-600 font-mono">
                            1-3 business days
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                            <span className="text-xs text-orange-600 font-mono font-semibold">
                              RECOMMENDED
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-blue-700 font-mono">
                        $22.50
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                  <Link
                    href="/cart"
                    className="text-blue-700 hover:text-blue-800 font-mono text-sm font-semibold transition-colors duration-200 hover:underline"
                  >
                    ← Return to Cart
                  </Link>
                  <div className="flex-1">
                    <Link href="/payment" className="block">
                      <Button
                        type="button"
                        className="w-full h-14 text-lg font-mono font-bold bg-blue-700 hover:bg-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                      >
                        Continue to Payment
                      </Button>
                    </Link>
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

              {/* Discount Code */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 font-mono mb-3">
                  Discount Code
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all duration-200"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-blue-700 text-white text-sm font-mono font-bold rounded-xl hover:bg-blue-800 transition-all duration-200 hover:scale-105"
                  >
                    Apply
                  </button>
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
                  <span className="text-gray-600 font-mono">
                    Shipping ({shippingMethod})
                  </span>
                  <span className="font-semibold text-gray-900 font-mono">
                    {shippingMethod === "free"
                      ? "FREE"
                      : shippingMethod === "regular"
                      ? "$7.50"
                      : "$22.50"}
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
