"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Product } from "@/types";

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Audio",
      brand: "TechSound",
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      categoryId: "1",
      description: "Premium wireless headphones with noise cancellation",
      specifications: {},
      discount: 25,
      isBestSeller: true,
      isNew: false,
      stockCount: 50,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Smart Watch Series 8",
      price: 399.99,
      originalPrice: 499.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Wearables",
      brand: "SmartTech",
      rating: 4.8,
      reviewCount: 256,
      inStock: true,
      categoryId: "2",
      description: "Advanced smartwatch with health monitoring",
      specifications: {},
      discount: 20,
      isBestSeller: false,
      isNew: true,
      stockCount: 30,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "4K Action Camera",
      price: 1299.99,
      originalPrice: 1599.99,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
      category: "Cameras",
      brand: "ProCam",
      rating: 4.7,
      reviewCount: 89,
      inStock: false,
      categoryId: "3",
      description: "Professional 4K action camera for adventures",
      specifications: {},
      discount: 19,
      isBestSeller: false,
      isNew: false,
      stockCount: 0,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ]);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    // Handle add to cart logic
  };

  const sidebarItems = [
    {
      icon: "👤",
      label: "Personal Data",
      href: "/account/personal",
      active: false,
    },
    {
      icon: "💳",
      label: "Payment & Installments",
      href: "/account/payment",
      active: false,
    },
    { icon: "📦", label: "Orders", href: "/account/orders", active: false },
    { icon: "❤️", label: "Wish list", href: "/account/wishlist", active: true },
    {
      icon: "🏷️",
      label: "Discounts",
      href: "/account/discounts",
      active: false,
    },
    {
      icon: "🔒",
      label: "Security & access",
      href: "/account/security",
      active: false,
    },
    { icon: "🔔", label: "Notification", href: "/account", active: false },
    {
      icon: "📞",
      label: "Contact us",
      href: "/account/contact",
      active: false,
    },
    {
      icon: "🚪",
      label: "Log out",
      href: "/logout",
      active: false,
      isLogout: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-poppins">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-800 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href="/account"
            className="text-gray-600 hover:text-blue-800 transition-colors duration-200"
          >
            Account
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Wish list</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              {/* User Profile Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-poppins">
                      Ayman ahmed
                    </h3>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="p-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-poppins text-sm ${
                      item.active
                        ? "bg-blue-50 text-blue-800 border-r-4 border-blue-800"
                        : item.isLogout
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">
                  Wish List
                </h1>
                <p className="text-gray-600 font-poppins">
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"} in your
                  wishlist
                </p>
              </div>

              {/* Wishlist Items */}
              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors duration-200 group"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <span className="text-red-500 text-lg">×</span>
                        </button>
                        {product.discount && (
                          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded font-poppins">
                            -{product.discount}%
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold font-poppins">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="mb-2">
                          <p className="text-xs text-gray-600 font-poppins font-medium">
                            {product.category}
                          </p>
                          <h3 className="font-semibold text-gray-900 font-poppins text-sm line-clamp-2">
                            {product.name}
                          </h3>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 font-poppins">
                            ({product.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-bold text-blue-800 font-poppins">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-poppins">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className="w-full font-poppins font-semibold text-sm"
                          >
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold text-sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-3xl">❤️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-600 font-poppins mb-6">
                    Save items you love to your wishlist and shop them later.
                  </p>
                  <Link href="/products">
                    <Button className="font-poppins font-semibold">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              )}

              {/* Actions */}
              {wishlistItems.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      className="font-poppins font-semibold"
                      onClick={() => setWishlistItems([])}
                    >
                      Clear Wishlist
                    </Button>
                    <Button
                      className="font-poppins font-semibold"
                      onClick={() => {
                        wishlistItems
                          .filter((item) => item.inStock)
                          .forEach((item) => addToCart(item));
                      }}
                    >
                      Add All to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
