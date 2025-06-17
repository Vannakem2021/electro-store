"use client";

import React from "react";
import Link from "next/link";
import { getFeaturedProducts } from "@/data";
import { ProductCard } from "@/components/ui";
import { Product } from "@/types";

const ProductSection: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = (product: Product) => {
    // Here you would typically update a global cart state or call an API
    console.log("Added to cart:", product);
    // You could show a toast notification here
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-mono tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-800 max-w-2xl font-mono leading-relaxed text-lg font-medium">
              Discover our featured collection of premium electronics and
              gadgets. Each product is carefully selected for quality and
              innovation.
            </p>

            {/* Decorative line */}
            <div className="mt-6 flex">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
            </div>
          </div>
          <Link
            href="/products"
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Headphones Banner */}
          <div className="bg-gray-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl border-2 border-gray-700 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-3 font-mono text-white transform transition-all duration-300 ease-in-out group-hover:text-blue-300">
                boAt Bassheads 900
              </h3>
              <p className="text-gray-300 mb-4 font-mono font-medium transform transition-all duration-300 ease-in-out group-hover:text-gray-200">
                Wired On Ear Headphones with Mic
              </p>
              <p className="text-2xl font-bold mb-6 font-mono text-blue-400 transform transition-all duration-300 ease-in-out group-hover:scale-110">
                at Just $39
              </p>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-mono font-bold transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                SHOP NOW
              </button>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 group-hover:opacity-30 transition-all duration-300 ease-in-out">
              <div className="w-full h-full bg-gradient-to-l from-blue-600 to-transparent"></div>
            </div>
          </div>

          {/* AirPods Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl border-2 border-blue-500 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-3 font-mono text-white transform transition-all duration-300 ease-in-out group-hover:text-blue-100">
                AirPods Pro
              </h3>
              <p className="text-blue-100 mb-2 font-mono font-medium transform transition-all duration-300 ease-in-out group-hover:text-white">
                From $3095.00/mo. Per Month
              </p>
              <p className="text-blue-100 mb-2 font-mono font-medium transform transition-all duration-300 ease-in-out group-hover:text-white">
                with EMI
              </p>
              <p className="text-blue-100 mb-1 font-mono font-medium transform transition-all duration-300 ease-in-out group-hover:text-white">
                or
              </p>
              <p className="text-xl font-bold mb-4 font-mono text-white transform transition-all duration-300 ease-in-out group-hover:scale-110">
                MRP $238.00
              </p>
              <p className="text-sm text-blue-100 font-mono transform transition-all duration-300 ease-in-out group-hover:text-white">
                (Incl. of all taxes)
              </p>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-110">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center transform transition-all duration-300 ease-in-out group-hover:bg-opacity-30">
                <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full transform transition-all duration-300 ease-in-out group-hover:bg-opacity-40"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile More Products Link */}
        <div className="text-center mt-12 md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-700 hover:text-blue-800 font-mono font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 group"
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
      </div>
    </section>
  );
};

export default ProductSection;
