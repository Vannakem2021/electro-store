"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar, Footer } from "@/components";
import {
  Button,
  ChevronRightIcon,
  ShoppingBagIcon,
  MapPinIcon,
} from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const SuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();

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
        <nav
          className={`flex items-center space-x-2 text-sm mb-8 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            {t("nav.home")}
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <Link
            href="/cart"
            className="text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            {t("cart.title")}
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <Link
            href="/checkout"
            className="text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            {t("checkout.title")}
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <Link
            href="/payment"
            className="text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            {t("payment.title")}
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            {t("success.title")}
          </span>
        </nav>
        {/* Success Icon and Message */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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
          <h1
            className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-4 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("success.title")}
          </h1>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto mb-6 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("success.description")}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-md border border-green-200">
            <svg
              className="w-4 h-4 text-green-600"
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
            <span
              className={`text-sm font-bold text-green-700 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("success.confirmationEmailSent")}
            </span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-md border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Information */}
            <div>
              <h2
                className={`text-xl font-bold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("success.orderInformation")}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.orderNumber")}
                  </span>
                  <span
                    className={`font-bold text-teal-700 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.orderDate")}
                  </span>
                  <span
                    className={`font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.paymentMethod")}
                  </span>
                  <span
                    className={`font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.creditCard")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.shippingMethod")}
                  </span>
                  <span
                    className={`font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.expressShipping")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("success.totalAmount")}
                  </span>
                  <span
                    className={`text-xl font-bold text-teal-700 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {formatPrice(543.02)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h2
                className={`text-xl font-bold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("success.deliveryInformation")}
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-gray-900 mb-2 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("success.shippingAddress")}
                      </h3>
                      <p
                        className={`text-gray-600 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
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
                <div className="bg-green-50 rounded-md p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-green-700"
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
                      <h3
                        className={`font-bold text-gray-900 mb-2 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("success.estimatedDelivery")}
                      </h3>
                      <p
                        className={`text-green-700 font-bold ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {estimatedDelivery}
                      </p>
                      <p
                        className={`text-green-600 text-sm mt-1 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("success.expressShipping")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-md border border-gray-200 p-6 mb-8">
          <h2
            className={`text-xl font-bold text-gray-900 mb-4 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("success.orderItems")}
          </h2>
          <div className="space-y-3">
            {/* MacBook Pro */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
              <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop"
                  alt="MacBook Pro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch
                </h3>
                <p
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Black • {t("success.qty")}: 1
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`text-sm text-gray-500 line-through ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    $1,093.00
                  </span>
                  <span
                    className={`font-bold text-teal-700 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    $433.00
                  </span>
                </div>
              </div>
            </div>

            {/* Case Sleeve */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
              <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop"
                  alt="Case Sleeve"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Inateck 12.3-13 inch Laptop Case Sleeve
                </h3>
                <p
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Blue • {t("success.qty")}: 1
                </p>
                <span
                  className={`font-bold text-teal-700 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  $63.26
                </span>
              </div>
            </div>

            {/* Privacy Screen */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
              <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=80&h=80&fit=crop"
                  alt="Privacy Screen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Laptop Privacy Screen for 13 inch MacBook
                </h3>
                <p
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  13" • {t("success.qty")}: 1
                </p>
                <span
                  className={`font-bold text-teal-700 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  $23.26
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-teal-50 rounded-md p-6 mb-8 border border-teal-200">
          <h2
            className={`text-xl font-bold text-gray-900 mb-4 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("success.whatsNext")}
          </h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span
                  className={`text-white text-xs font-bold ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  1
                </span>
              </div>
              <p
                className={`text-gray-700 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("success.orderConfirmation")}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span
                  className={`text-white text-xs font-bold ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  2
                </span>
              </div>
              <p
                className={`text-gray-700 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("success.processing")}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span
                  className={`text-white text-xs font-bold ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  3
                </span>
              </div>
              <p
                className={`text-gray-700 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("success.shipping")}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span
                  className={`text-white text-xs font-bold ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  4
                </span>
              </div>
              <p
                className={`text-gray-700 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("success.delivery")} {estimatedDelivery}.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/account/orders">
            <Button
              className={`w-full sm:w-auto px-6 py-3 font-medium bg-teal-700 hover:bg-teal-800 transition-colors duration-200 flex items-center justify-center gap-2 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {t("success.trackYourOrder")}
            </Button>
          </Link>
          <Link href="/">
            <Button
              className={`w-full sm:w-auto px-6 py-3 font-medium border border-teal-700 text-teal-700 bg-white hover:bg-teal-50 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("success.continueShopping")}
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="text-center bg-gray-50 rounded-md p-6 border border-gray-200">
          <div className="w-12 h-12 mx-auto mb-3 bg-teal-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-teal-700"
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
          <h3
            className={`text-lg font-bold text-gray-900 mb-3 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("success.needHelp")}
          </h3>
          <p
            className={`text-gray-600 mb-4 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("success.supportDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/contact"
              className={`text-teal-700 hover:text-teal-800 font-medium transition-colors duration-200 hover:underline ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("success.contactSupport")}
            </Link>
            <Link
              href="/help"
              className={`text-teal-700 hover:text-teal-800 font-medium transition-colors duration-200 hover:underline ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("success.helpCenter")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessPage;
