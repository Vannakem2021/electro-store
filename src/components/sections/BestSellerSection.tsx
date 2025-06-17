"use client";

import React from "react";
import Link from "next/link";
import { getBestSellerProducts } from "@/data";
import { ProductCard } from "@/components/ui";
import { Product } from "@/types";

const BestSellerSection: React.FC = () => {
  const bestSellerProducts = getBestSellerProducts();

  const handleAddToCart = (product: Product) => {
    // Here you would typically update a global cart state or call an API
    console.log("Added to cart:", product);
    // You could show a toast notification here
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-mono tracking-tight">
              Best Selling Products
            </h2>
            <p className="text-gray-800 max-w-2xl font-mono leading-relaxed text-lg font-medium">
              Our most popular products loved by customers worldwide. These
              top-rated items combine quality, innovation, and value.
            </p>

            {/* Decorative line */}
            <div className="mt-6 flex">
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 rounded-full"></div>
            </div>
          </div>
          <Link
            href="/products?filter=bestseller"
            className="hidden md:flex items-center text-blue-700 hover:text-blue-800 font-mono font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 group"
          >
            MORE PRODUCTS
            <svg
              className="w-5 h-5 ml-2 transform transition-all duration-300 ease-in-out group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Best Seller Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            BEST SELLERS
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellerProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* Best Seller Ribbon */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-red-600 text-white px-4 py-2 text-xs font-bold rounded-full shadow-xl font-mono tracking-wide transform transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-700">
                  #1 SELLER
                </div>
              </div>

              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-3xl font-bold text-blue-700 mb-2 font-mono transform transition-all duration-300 ease-in-out group-hover:text-blue-800 group-hover:scale-125">
                10K+
              </div>
              <div className="text-gray-700 font-mono font-semibold transform transition-all duration-300 ease-in-out group-hover:text-blue-600 group-hover:font-bold">
                Happy Customers
              </div>
            </div>
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-3xl font-bold text-green-600 mb-2 font-mono transform transition-all duration-300 ease-in-out group-hover:text-green-700 group-hover:scale-125">
                500+
              </div>
              <div className="text-gray-700 font-mono font-semibold transform transition-all duration-300 ease-in-out group-hover:text-green-600 group-hover:font-bold">
                Products Sold Daily
              </div>
            </div>
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-3xl font-bold text-purple-600 mb-2 font-mono transform transition-all duration-300 ease-in-out group-hover:text-purple-700 group-hover:scale-125">
                4.8★
              </div>
              <div className="text-gray-700 font-mono font-semibold transform transition-all duration-300 ease-in-out group-hover:text-purple-600 group-hover:font-bold">
                Average Rating
              </div>
            </div>
          </div>
        </div>

        {/* Mobile More Products Link */}
        <div className="text-center mt-12 md:hidden">
          <Link
            href="/products?filter=bestseller"
            className="inline-flex items-center text-blue-700 hover:text-blue-800 font-mono font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 group"
          >
            MORE BEST SELLERS
            <svg
              className="w-5 h-5 ml-2 transform transition-all duration-300 ease-in-out group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
