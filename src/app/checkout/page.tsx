"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar, Footer } from "@/components";
import {
  Button,
  CheckIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  UserIcon,
  MapPinIcon,
} from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();

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
          <span className="text-gray-900 font-medium">
            {t("checkout.title")}
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1
            className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-2 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("checkout.title")}
          </h1>
          <p
            className={`text-gray-600 ${isKhmer ? "font-khmer" : "font-rubik"}`}
          >
            {t("checkout.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <h3
                    className={`text-lg font-bold text-gray-900 mb-3 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("checkout.customerInfo")}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-900 font-semibold ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {formData.firstName}
                      </p>
                      <p
                        className={`text-gray-600 text-sm ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("checkout.verifiedCustomer")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className={`text-lg font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("checkout.shippingAddress")}
                    </h3>
                    <button
                      type="button"
                      className={`text-teal-700 hover:text-teal-800 text-sm font-medium transition-colors duration-200 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("checkout.edit")}
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {formData.address}
                      </p>
                      <p
                        className={`text-gray-600 text-sm mt-1 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("checkout.defaultAddress")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3
                    className={`text-lg font-bold text-gray-900 mb-4 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("checkout.shippingMethod")}
                  </h3>
                  <div className="space-y-3">
                    {/* Free Shipping */}
                    <div
                      className={`flex items-center justify-between p-3 border rounded-md transition-all duration-200 ${
                        shippingMethod === "free"
                          ? "border-teal-700 bg-teal-50"
                          : "border-gray-200 hover:border-teal-400"
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
                          className="h-4 w-4 text-teal-700 focus:ring-teal-700 border-gray-300"
                        />
                        <div className="ml-3">
                          <label
                            htmlFor="free-shipping"
                            className={`text-sm font-medium text-gray-900 cursor-pointer ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {t("checkout.freeShipping")}
                          </label>
                          <p
                            className={`text-sm text-gray-600 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            7-30 {t("checkout.businessDays")}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-lg font-bold text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        FREE
                      </span>
                    </div>

                    {/* Regular Shipping */}
                    <div
                      className={`flex items-center justify-between p-3 border rounded-md transition-all duration-200 ${
                        shippingMethod === "regular"
                          ? "border-teal-700 bg-teal-50"
                          : "border-gray-200 hover:border-teal-400"
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
                          className="h-4 w-4 text-teal-700 focus:ring-teal-700 border-gray-300"
                        />
                        <div className="ml-3">
                          <label
                            htmlFor="regular-shipping"
                            className={`text-sm font-medium text-gray-900 cursor-pointer ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {t("checkout.regularShipping")}
                          </label>
                          <p
                            className={`text-sm text-gray-600 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            3-14 {t("checkout.businessDays")}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-lg font-bold text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        $7.50
                      </span>
                    </div>

                    {/* Express Shipping */}
                    <div
                      className={`flex items-center justify-between p-3 border rounded-md transition-all duration-200 ${
                        shippingMethod === "express"
                          ? "border-teal-700 bg-teal-50"
                          : "border-gray-200 hover:border-teal-400"
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
                          className="h-4 w-4 text-teal-700 focus:ring-teal-700 border-gray-300"
                        />
                        <div className="ml-3">
                          <label
                            htmlFor="express-shipping"
                            className={`text-sm font-medium text-gray-900 cursor-pointer ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {t("checkout.expressShipping")}
                          </label>
                          <p
                            className={`text-sm text-gray-600 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            1-3 {t("checkout.businessDays")}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                            <span
                              className={`text-xs text-orange-600 font-medium ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {t("checkout.recommended")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-lg font-bold text-teal-700 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        $22.50
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/cart"
                    className={`text-teal-700 hover:text-teal-800 text-sm font-medium transition-colors duration-200 hover:underline ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    ← {t("checkout.returnToCart")}
                  </Link>
                  <div className="flex-1">
                    <Link href="/payment" className="block">
                      <Button
                        type="button"
                        className={`w-full h-12 font-medium bg-teal-700 hover:bg-teal-800 transition-colors duration-200 flex items-center justify-center gap-2 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        <ShoppingBagIcon className="w-5 h-5" />
                        {t("checkout.continueToPayment")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border border-gray-200 p-6 lg:sticky lg:top-8">
              <h3
                className={`text-xl font-bold text-gray-900 mb-6 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("checkout.orderSummary")}
              </h3>

              {/* Product Items */}
              <div className="space-y-3 mb-6">
                {/* MacBook Pro */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop"
                      alt="MacBook Pro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      MacBook Pro M2 MNEJ3 2022
                    </h4>
                    <p
                      className={`text-xs text-gray-600 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("checkout.qty")}: 1
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
                        className={`text-sm font-bold text-teal-700 ${
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
                  <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop"
                      alt="Case Sleeve"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Inateck Laptop Case Sleeve
                    </h4>
                    <p
                      className={`text-xs text-gray-600 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("checkout.qty")}: 1
                    </p>
                    <span
                      className={`text-sm font-bold text-teal-700 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      $63.26
                    </span>
                  </div>
                </div>

                {/* Privacy Screen */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=60&h=60&fit=crop"
                      alt="Privacy Screen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Laptop Privacy Screen 13"
                    </h4>
                    <p
                      className={`text-xs text-gray-600 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("checkout.qty")}: 1
                    </p>
                    <span
                      className={`text-sm font-bold text-teal-700 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      $23.26
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Totals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("cart.subtotal")}
                  </span>
                  <span
                    className={`font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    $519.52
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("cart.discount")}
                  </span>
                  <span
                    className={`font-semibold text-red-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    -$111.87
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("cart.shipping")} ({shippingMethod})
                  </span>
                  <span
                    className={`font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {shippingMethod === "free"
                      ? "FREE"
                      : shippingMethod === "regular"
                      ? "$7.50"
                      : "$22.50"}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-lg font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("cart.total")}
                    </span>
                    <span
                      className={`text-xl font-bold text-teal-700 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
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
