"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryById, getProductsByCategory } from "@/data";
import { Category, Product } from "@/types";
import { Navbar, Footer } from "@/components";
import { ProductCard } from "@/components/ui";

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadCategory = async () => {
      const resolvedParams = await params;
      const fetchedCategory = getCategoryById(resolvedParams.id);
      if (!fetchedCategory) {
        notFound();
      }

      setCategory(fetchedCategory);
      const categoryProducts = getProductsByCategory(resolvedParams.id);
      setProducts(categoryProducts);
    };

    loadCategory();
  }, [params]);

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
    // Handle add to cart logic here
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600 font-mono">Loading category...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
          <Link
            href="/products"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-mono tracking-tight">
            {category.name}
          </h1>
          <p className="text-gray-800 max-w-2xl mx-auto font-mono leading-relaxed text-lg font-medium">
            {category.description}
          </p>
          <p className="text-blue-700 font-mono font-semibold mt-4">
            {products.length} products available
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 font-mono text-lg">
              No products found in this category.
            </p>
            <Link
              href="/products"
              className="inline-block mt-4 text-blue-700 hover:text-blue-800 font-mono font-semibold transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
