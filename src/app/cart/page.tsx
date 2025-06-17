"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer } from "@/components";
import { Button } from "@/components/ui";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";

const CartPage: React.FC = () => {
  // Mock cart data based on the screenshot
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
        id: "1",
        name: "MacBook Pro M2 MNEJ3 2022 LLA 13.3 Inch",
        price: 433.0,
        originalPrice: 1093.0,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        category: "Laptops",
        categoryId: "1",
        brand: "Apple",
        rating: 4.8,
        reviewCount: 245,
        inStock: true,
        stockCount: 15,
        description: "MacBook Pro with M2 chip",
        specifications: {},
        discount: 60,
        isBestSeller: true,
        isNew: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      quantity: 1,
    },
    {
      product: {
        id: "2",
        name: "Inateck 12.3-13 inch MacBook Case Sleeve",
        price: 63.26,
        originalPrice: 89.0,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        category: "Accessories",
        categoryId: "2",
        brand: "Inateck",
        rating: 4.5,
        reviewCount: 89,
        inStock: true,
        stockCount: 25,
        description: "Premium laptop sleeve for MacBook",
        specifications: {},
        discount: 29,
        isBestSeller: false,
        isNew: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      quantity: 1,
    },
    {
      product: {
        id: "3",
        name: "Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air",
        price: 23.26,
        originalPrice: 23.26,
        image:
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
        category: "Accessories",
        categoryId: "2",
        brand: "PrivacyTech",
        rating: 4.2,
        reviewCount: 156,
        inStock: true,
        stockCount: 40,
        description: "Privacy screen protector for MacBook",
        specifications: {},
        discount: 0,
        isBestSeller: false,
        isNew: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      quantity: 1,
    },
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = cartItems.reduce((sum, item) => {
    const originalPrice = item.product.originalPrice || item.product.price;
    const discountAmount = (originalPrice - item.product.price) * item.quantity;
    return sum + discountAmount;
  }, 0);
  const shippingCost = 72.5;
  const grandTotal = subtotal + shippingCost;

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
          <span className="text-gray-900 font-semibold">Shopping Cart</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-mono tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-600 font-mono">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8 md:mb-12 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 min-w-max px-4">
            {/* Cart Step */}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-blue-700 font-mono">
                Cart
              </span>
            </div>

            {/* Line */}
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-gray-300 rounded-full"></div>

            {/* Checkout Step */}
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 713.138-3.138z"
                  />
                </svg>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-gray-500 font-mono hidden sm:inline">
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-gray-500 font-mono hidden sm:inline">
                Payment
              </span>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-2xl p-12 border-2 border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-mono">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-8 font-mono">
                Add some products to get started
              </p>
              <Link href="/products">
                <Button className="bg-blue-700 hover:bg-blue-800 font-mono font-bold">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 font-mono mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-mono">
                          by {item.product.brand}
                        </p>
                        <p className="text-sm text-gray-600 font-mono">
                          Category: {item.product.category}
                        </p>
                      </div>

                      {/* Product Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-700 font-mono">
                            Free Shipping
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm text-gray-700 font-mono">
                            {item.product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-sm text-gray-700 font-mono">
                            1 Year Warranty
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span className="text-sm text-gray-700 font-mono">
                            Easy Returns
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Price */}
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-blue-700 font-mono">
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-mono">
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
                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-400 flex items-center justify-center font-mono font-bold text-gray-700 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                          >
                            -
                          </button>
                          <span className="w-12 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-gray-900 bg-gray-50">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-400 flex items-center justify-center font-mono font-bold text-gray-700 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 font-mono font-semibold text-sm transition-colors duration-200 hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-mono">
                            Item Total:
                          </span>
                          <span className="text-lg font-bold text-gray-900 font-mono">
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
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 lg:sticky lg:top-8">
                <h3 className="text-xl font-bold text-gray-900 font-mono mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-mono">Subtotal</span>
                    <span className="font-semibold text-gray-900 font-mono">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-mono">Discount</span>
                    <span className="font-semibold text-red-600 font-mono">
                      -{formatPrice(discount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-mono">Shipping</span>
                    <span className="font-semibold text-gray-900 font-mono">
                      {formatPrice(shippingCost)}
                    </span>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 font-mono">
                        Total
                      </span>
                      <span className="text-xl font-bold text-blue-700 font-mono">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full h-14 text-lg font-mono font-bold bg-blue-700 hover:bg-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Continue Shopping Link */}
                  <Link href="/products" className="block text-center">
                    <span className="text-blue-700 hover:text-blue-800 font-mono font-semibold text-sm transition-colors duration-200 hover:underline">
                      Continue Shopping
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
