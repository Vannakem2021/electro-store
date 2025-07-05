"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Navbar, Footer } from "@/components";
import {
  Button,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@/components/ui";
import { formatPrice } from "@/lib/utils";

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const {
    items: cartItems,
    subtotal,
    discount,
    shipping: shippingCost,
    total: grandTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

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
          <span className="text-gray-900 font-medium">{t("cart.title")}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1
            className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-2 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("cart.title")}
          </h1>
          <p
            className={`text-gray-600 ${isKhmer ? "font-khmer" : "font-rubik"}`}
          >
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? t("cart.itemInCart")
              : t("cart.itemsInCart")}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-md p-12 border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
                <ShoppingCartIcon className="w-10 h-10 text-teal-600" />
              </div>
              <h3
                className={`text-xl font-bold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("cart.empty")}
              </h3>
              <p
                className={`text-gray-600 mb-8 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("cart.emptyDescription")}
              </p>
              <Link href="/products">
                <Button
                  className={`bg-teal-700 hover:bg-teal-800 font-medium ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("cart.continueShopping")}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-md border border-gray-200 p-6 hover:border-teal-400 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 bg-gray-50 rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3
                          className={`text-lg font-bold text-gray-900 mb-1 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {item.product.name}
                        </h3>
                        <p
                          className={`text-sm text-gray-600 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {t("product.brand")}: {item.product.brand}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Price */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-lg font-bold text-teal-700 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.originalPrice && (
                            <span
                              className={`text-sm text-gray-500 line-through ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-md border border-gray-300 hover:border-teal-400 flex items-center justify-center font-bold text-gray-700 hover:text-teal-700 transition-colors duration-200"
                          >
                            -
                          </button>
                          <span
                            className={`w-10 h-8 rounded-md border border-gray-300 flex items-center justify-center font-bold text-gray-900 bg-gray-50 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-md border border-gray-300 hover:border-teal-400 flex items-center justify-center font-bold text-gray-700 hover:text-teal-700 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm transition-colors duration-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span
                            className={`${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {t("cart.remove")}
                          </span>
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span
                            className={`text-sm text-gray-600 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {t("cart.itemTotal")}:
                          </span>
                          <span
                            className={`text-lg font-bold text-gray-900 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md border border-gray-200 p-6 lg:sticky lg:top-8">
                <h3
                  className={`text-xl font-bold text-gray-900 mb-6 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("cart.title")}
                </h3>

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
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
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
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}

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
                      {formatPrice(shippingCost)}
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
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block mt-6">
                    <Button
                      className={`w-full h-12 font-medium bg-teal-700 hover:bg-teal-800 transition-colors duration-200 flex items-center justify-center gap-2 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      <ShoppingBagIcon className="w-5 h-5" />
                      {t("cart.proceedToCheckout")}
                    </Button>
                  </Link>

                  {/* Continue Shopping Link */}
                  <Link href="/products" className="block text-center">
                    <span
                      className={`text-teal-700 hover:text-teal-800 font-medium text-sm transition-colors duration-200 hover:underline ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {t("cart.continueShopping")}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
