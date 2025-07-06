"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useCart } from "@/contexts/CartContext";
import { getNewProducts } from "@/data";
import { SpecialProductCard, SkeletonCard } from "@/components/ui";
import { Product } from "@/types";

const NewProductsSection: React.FC = () => {
  const { addToCart } = useCart();
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const products = getNewProducts().slice(0, 4); // Show only 4 products
      setNewProducts(products);
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
                New Arrivals
              </h2>
              <p className="text-gray-600 text-sm">
                Latest electronics just arrived
              </p>
            </div>
            <Link
              href="/products?filter=new"
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
          ) : newProducts.length > 0 ? (
            newProducts.map((product) => (
              <SpecialProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                variant="new"
                showLink={true}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 font-rubik text-sm">
                No new products available
              </p>
            </div>
          )}
        </div>

        {/* Mobile View All Link */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/products?filter=new"
            className="inline-flex items-center text-teal-800 hover:text-teal-900 font-medium transition-colors duration-200 group"
          >
            View All New Products
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

export default NewProductsSection;
