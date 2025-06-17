"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer } from "@/components";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const SuccessPage: React.FC = () => {
  // Generate a random order number
  const orderNumber = `TH${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
  const estimatedDelivery = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <Link
            href="/payment"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Payment
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">Success</span>
        </nav>
        {/* Success Icon and Message */}
        <div className="text-center mb-16">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
            <svg
              className="w-12 h-12 text-green-600"
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
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-mono mb-6 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 font-mono max-w-2xl mx-auto mb-6">
            Thank you for your purchase. Your order has been successfully placed
            and is being processed.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-2xl border border-green-200">
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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-bold text-green-700 font-mono">
              Confirmation email sent
            </span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-mono mb-6">
                Order Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                  <span className="text-gray-600 font-mono">Order Number</span>
                  <span className="font-bold text-blue-700 font-mono">
                    {orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                  <span className="text-gray-600 font-mono">Order Date</span>
                  <span className="font-semibold text-gray-900 font-mono">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                  <span className="text-gray-600 font-mono">
                    Payment Method
                  </span>
                  <span className="font-semibold text-gray-900 font-mono">
                    Credit Card
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                  <span className="text-gray-600 font-mono">
                    Shipping Method
                  </span>
                  <span className="font-semibold text-gray-900 font-mono">
                    Express Shipping
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-mono">Total Amount</span>
                  <span className="text-xl font-bold text-blue-700 font-mono">
                    {formatPrice(543.02)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-mono mb-6">
                Delivery Information
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
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
                      <h3 className="font-bold text-gray-900 font-mono mb-2">
                        Shipping Address
                      </h3>
                      <p className="text-gray-600 font-mono">
                        Jimmy Smith
                        <br />
                        Headgear, 25 First Street
                        <br />
                        Cambridge MA 02141
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 font-mono mb-2">
                        Estimated Delivery
                      </h3>
                      <p className="text-green-700 font-mono font-bold">
                        {estimatedDelivery}
                      </p>
                      <p className="text-green-600 font-mono text-sm mt-1">
                        Express shipping (1-3 business days)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 font-mono mb-6">
            Order Items
          </h2>
          <div className="space-y-4">
            {/* MacBook Pro */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop"
                  alt="MacBook Pro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 font-mono">
                  MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch
                </h3>
                <p className="text-sm text-gray-600 font-mono">
                  Black • Qty: 1
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500 line-through font-mono">
                    $1,093.00
                  </span>
                  <span className="font-bold text-blue-700 font-mono">
                    $433.00
                  </span>
                </div>
              </div>
            </div>

            {/* Case Sleeve */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop"
                  alt="Case Sleeve"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 font-mono">
                  Inateck 12.3-13 inch Laptop Case Sleeve
                </h3>
                <p className="text-sm text-gray-600 font-mono">Blue • Qty: 1</p>
                <span className="font-bold text-blue-700 font-mono">
                  $63.26
                </span>
              </div>
            </div>

            {/* Privacy Screen */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=80&h=80&fit=crop"
                  alt="Privacy Screen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 font-mono">
                  Laptop Privacy Screen for 13 inch MacBook
                </h3>
                <p className="text-sm text-gray-600 font-mono">13" • Qty: 1</p>
                <span className="font-bold text-blue-700 font-mono">
                  $23.26
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 font-mono mb-6">
            What's Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold font-mono">
                  1
                </span>
              </div>
              <p className="text-gray-700 font-mono">
                <strong>Order Confirmation:</strong> You'll receive an email
                confirmation shortly with your order details.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold font-mono">
                  2
                </span>
              </div>
              <p className="text-gray-700 font-mono">
                <strong>Processing:</strong> Your order will be processed and
                prepared for shipment within 1 business day.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold font-mono">
                  3
                </span>
              </div>
              <p className="text-gray-700 font-mono">
                <strong>Shipping:</strong> You'll receive tracking information
                once your order ships.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold font-mono">
                  4
                </span>
              </div>
              <p className="text-gray-700 font-mono">
                <strong>Delivery:</strong> Your order will arrive by{" "}
                {estimatedDelivery}.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link href="/account/orders">
            <Button className="w-full sm:w-auto px-8 py-4 text-lg font-mono font-bold bg-blue-700 hover:bg-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
              Track Your Order
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto px-8 py-4 text-lg font-mono font-bold border-2 border-blue-700 text-blue-700 bg-white hover:bg-blue-50 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-mono mb-3">
            Need Help?
          </h3>
          <p className="text-gray-600 font-mono mb-6">
            If you have any questions about your order, our customer support
            team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/contact"
              className="text-blue-700 hover:text-blue-800 font-mono font-semibold transition-colors duration-200 hover:underline"
            >
              Contact Support
            </Link>
            <Link
              href="/help"
              className="text-blue-700 hover:text-blue-800 font-mono font-semibold transition-colors duration-200 hover:underline"
            >
              Help Center
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessPage;
