"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Navbar, Footer } from "@/components";
import {
  Button,
  ShoppingBagIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const PaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const router = useRouter();
  const { clearCart } = useCart();
  const { showSuccess, showError } = useToast();

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [billingAddress, setBillingAddress] = useState("same");
  const [discountCode, setDiscountCode] = useState("");
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load checkout data from localStorage
  useEffect(() => {
    try {
      const savedCheckoutData = localStorage.getItem("elecxo-checkout-data");
      if (savedCheckoutData) {
        const parsedData = JSON.parse(savedCheckoutData);
        setCheckoutData(parsedData);
      } else {
        // If no checkout data, redirect back to checkout
        showError("No checkout data found. Please complete checkout first.");
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Error loading checkout data:", error);
      showError("Error loading checkout data. Please try again.");
      router.push("/checkout");
    }
  }, [router, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkoutData) {
      showError("No checkout data available. Please complete checkout first.");
      router.push("/checkout");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and checkout data
      clearCart();
      localStorage.removeItem("elecxo-checkout-data");

      showSuccess("Payment successful! Your order has been placed.");

      // Redirect to success page
      router.push("/success");
    } catch (error) {
      console.error("Payment processing failed:", error);
      showError("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <span className="text-gray-900 font-medium">
            {t("payment.title")}
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1
            className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-2 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("payment.title")}
          </h1>
          <p
            className={`text-gray-600 ${isKhmer ? "font-khmer" : "font-rubik"}`}
          >
            {t("payment.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h3
                    className={`text-lg font-bold text-gray-900 mb-4 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("payment.paymentMethod")}
                  </h3>
                  <div className="space-y-3">
                    {/* Credit Cards */}
                    <div
                      className={`p-4 border rounded-md transition-all duration-200 ${
                        paymentMethod === "credit-card"
                          ? "border-teal-700 bg-teal-50"
                          : "border-gray-200 hover:border-teal-400"
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
                            className="h-4 w-4 text-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 border-gray-300"
                          />
                          <div className="ml-3">
                            <label
                              htmlFor="credit-card"
                              className={`text-sm font-medium text-gray-900 cursor-pointer ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {t("payment.creditDebitCard")}
                            </label>
                            <p
                              className={`text-sm text-gray-600 ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {t("payment.creditCardDescription")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="px-2 py-1 bg-teal-700 text-white text-xs font-bold rounded-md">
                            VISA
                          </div>
                          <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                            MC
                          </div>
                          <div className="px-2 py-1 bg-teal-800 text-white text-xs font-bold rounded-md">
                            AMEX
                          </div>
                        </div>
                      </div>

                      {/* Credit Card Form */}
                      {paymentMethod === "credit-card" && (
                        <div className="mt-4 space-y-3">
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label
                                className={`block text-sm font-medium text-gray-900 mb-2 ${
                                  isKhmer ? "font-khmer" : "font-rubik"
                                }`}
                              >
                                {t("payment.cardNumber")}
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-colors duration-200 ${
                                  isKhmer ? "font-khmer" : "font-rubik"
                                }`}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label
                                  className={`block text-sm font-medium text-gray-900 mb-2 ${
                                    isKhmer ? "font-khmer" : "font-rubik"
                                  }`}
                                >
                                  {t("payment.expiryDate")}
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-colors duration-200 ${
                                    isKhmer ? "font-khmer" : "font-rubik"
                                  }`}
                                />
                              </div>
                              <div>
                                <label
                                  className={`block text-sm font-medium text-gray-900 mb-2 ${
                                    isKhmer ? "font-khmer" : "font-rubik"
                                  }`}
                                >
                                  {t("payment.cvv")}
                                </label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-colors duration-200 ${
                                    isKhmer ? "font-khmer" : "font-rubik"
                                  }`}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                className={`block text-sm font-medium text-gray-900 mb-2 ${
                                  isKhmer ? "font-khmer" : "font-rubik"
                                }`}
                              >
                                {t("payment.cardholderName")}
                              </label>
                              <input
                                type="text"
                                placeholder="John Doe"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-colors duration-200 ${
                                  isKhmer ? "font-khmer" : "font-rubik"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ABA Pay */}
                    <div
                      className={`p-4 border rounded-md transition-all duration-200 ${
                        paymentMethod === "aba-pay"
                          ? "border-teal-700 bg-teal-50"
                          : "border-gray-200 hover:border-teal-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="aba-pay"
                            name="paymentMethod"
                            type="radio"
                            value="aba-pay"
                            checked={paymentMethod === "aba-pay"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-4 w-4 text-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 border-gray-300"
                          />
                          <div className="ml-3">
                            <label
                              htmlFor="aba-pay"
                              className={`text-sm font-medium text-gray-900 cursor-pointer ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              ABA PAY
                            </label>
                            <p
                              className={`text-sm text-gray-600 ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {t("payment.abaPayDescription")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-teal-700 rounded-md flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              ABA
                            </span>
                          </div>
                          <span className="text-sm font-medium text-teal-700">
                            PAY
                          </span>
                        </div>
                      </div>

                      {/* ABA Pay QR Code */}
                      {paymentMethod === "aba-pay" && (
                        <div className="mt-4 flex justify-center">
                          <div className="bg-white p-4 rounded-md border border-gray-200">
                            <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-teal-700 rounded-md mx-auto mb-2 flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    QR
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">
                                  Scan with ABA Mobile
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className={`text-lg font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("payment.billingAddress")}
                    </h3>
                    <button
                      type="button"
                      className={`text-teal-700 hover:text-teal-800 text-sm font-medium transition-colors duration-200 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("payment.edit")}
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <p
                        className={`text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("payment.sameAsShipping")}
                      </p>
                      <p
                        className={`text-gray-600 text-sm mt-1 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Headgear, 25 First Street, Cambridge MA 02141, United
                        States
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold text-green-900 mb-1 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("payment.securePayment")}
                      </h4>
                      <p
                        className={`text-sm text-green-700 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("payment.securityNotice")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/checkout"
                    className={`text-teal-700 hover:text-teal-800 text-sm font-medium transition-colors duration-200 hover:underline ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    ← {t("payment.returnToCheckout")}
                  </Link>
                  <div className="flex-1">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !checkoutData}
                      className={`w-full h-12 font-medium bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <ShoppingBagIcon className="w-5 h-5" />
                          {t("payment.completePayment")}
                        </>
                      )}
                    </Button>
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
                {checkoutData?.cartItems?.map((item: any) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
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
                        {item.product.name}
                      </h4>
                      <p
                        className={`text-xs text-gray-600 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {t("checkout.qty")}: {item.quantity}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {item.product.originalPrice &&
                          item.product.originalPrice > item.product.price && (
                            <span
                              className={`text-sm text-gray-500 line-through ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        <span
                          className={`text-sm font-bold text-teal-700 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
                    {checkoutData
                      ? formatPrice(checkoutData.subtotal)
                      : "$0.00"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("cart.shipping")}
                  </span>
                  <span
                    className={`font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {checkoutData
                      ? formatPrice(checkoutData.deliveryPrice)
                      : "$0.00"}
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
                      {checkoutData ? formatPrice(checkoutData.total) : "$0.00"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Security */}
              <div className="mt-6 p-3 bg-green-50 rounded-md border border-green-200">
                <div className="flex items-center gap-2">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span
                    className={`text-sm font-bold text-green-700 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("payment.sslSecured")}
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
