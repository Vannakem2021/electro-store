"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useCart } from "@/contexts/CartContext";
import { getDiscountProducts } from "@/data";
import { SpecialProductCard, SkeletonCard } from "@/components/ui";
import { Product } from "@/types";

const DiscountProductsSection: React.FC = () => {
  const { addToCart } = useCart();
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const products = getDiscountProducts().slice(0, 4); // Show only 4 products
      setDiscountProducts(products);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Special Discounts
              </h2>
              <p className="text-gray-600 text-sm">
                Limited time offers on selected electronics
              </p>
            </div>
            <Link
              href="/products?filter=discount"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            // Show skeleton loading
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} variant="special" />
            ))
          ) : discountProducts.length > 0 ? (
            discountProducts.map((product) => (
              <SpecialProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                variant="discount"
                showLink={true}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 font-rubik text-sm">
                No discount products available
              </p>
            </div>
          )}
        </div>

        {/* Mobile View All Link */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/products?filter=discount"
            className="inline-flex items-center text-teal-800 hover:text-teal-900 font-medium transition-colors duration-200 group"
          >
            View All Discounts
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

export default DiscountProductsSection;
