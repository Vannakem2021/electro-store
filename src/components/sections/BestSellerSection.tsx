"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useCart } from "@/contexts/CartContext";
import { getBestSellerProducts } from "@/data";
import { ProductCard, SkeletonCard } from "@/components/ui";
import { Product } from "@/types";

const BestSellerSection: React.FC = () => {
  const { addToCart } = useCart();
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const products = getBestSellerProducts();
      setBestSellerProducts(products);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Best Sellers
              </h2>
              <p className="text-gray-600 text-sm">
                Most popular electronics this month
              </p>
            </div>
            <Link
              href="/products?filter=bestseller"
              className="text-teal-800 hover:text-teal-900 font-medium text-sm transition-colors duration-200 flex items-center gap-1 group"
            >
              View All
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {isLoading
            ? // Show skeleton loading
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} variant="default" />
              ))
            : bestSellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  showLink={true}
                />
              ))}
        </div>

        {/* Mobile More Products Link */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/products?filter=bestseller"
            className="inline-flex items-center text-teal-700 hover:text-teal-800 font-rubik font-medium transition-colors duration-200 group"
          >
            View All Best Sellers
            <svg
              className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
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
