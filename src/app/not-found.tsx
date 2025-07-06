"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useCart } from "@/contexts/CartContext";
import { getFeaturedProducts, categories } from "@/data";
import { Product } from "@/types";
import { Navbar, Footer } from "@/components";
import {
  ProductCard,
  SearchInput,
  HomeIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@/components/ui";

const NotFoundPage: React.FC = () => {
  const { addToCart } = useCart();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get some featured products as suggestions
    const featured = getFeaturedProducts().slice(0, 4);
    setSuggestedProducts(featured);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 404 Hero Section */}
        <div className="text-center py-16">
          <div className="mb-8">
            <ExclamationTriangleIcon className="w-24 h-24 text-teal-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors duration-200 font-medium"
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-700 text-teal-700 rounded-md hover:bg-teal-700 hover:text-white transition-colors duration-200 font-medium"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Browse Products
            </Link>
          </div>

          {/* Search Section */}
          <div className="max-w-md mx-auto mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Search Products
            </h3>
            <SearchInput
              placeholder="Search for products..."
              className="w-full"
            />
          </div>

          {/* Popular Categories */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group p-4 bg-gray-50 rounded-md hover:bg-teal-50 hover:border-teal-200 border border-gray-200 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-md flex items-center justify-center mx-auto mb-2 group-hover:bg-teal-200 transition-colors duration-200">
                      <span className="text-teal-600 text-xl">📱</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Suggested Products
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {suggestedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  showLink={true}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
