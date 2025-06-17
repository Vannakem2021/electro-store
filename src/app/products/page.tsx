"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { products, categories } from "@/data";
import { Product, Category } from "@/types";
import { Navbar, Footer } from "@/components";
import { ProductCard, Button } from "@/components/ui";

// Filter and sort interfaces
interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
}

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest"
  | "name";

const ProductsPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
    rating: 0,
    inStock: false,
    onSale: false,
  });

  // Get unique brands from products
  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(products.map((p) => p.brand))].sort();
    return brands;
  }, []);

  // Get price range
  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Apply sale filter
    if (filters.onSale) {
      filtered = filtered.filter(
        (product) => product.discount && product.discount > 0
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    console.log("Added to cart:", product);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [priceRange[0], priceRange[1]],
      rating: 0,
      inStock: false,
      onSale: false,
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.priceRange[0] !== priceRange[0] ||
    filters.priceRange[1] !== priceRange[1]
      ? 1
      : 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-poppins">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-800 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-semibold">Products</span>
        </nav>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
            <Link
              href="/products"
              className={`px-6 py-3 rounded-lg font-poppins font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 min-h-[44px] flex items-center ${
                filters.categories.length === 0
                  ? "bg-blue-800 text-white shadow-lg hover:bg-blue-900"
                  : "bg-white text-gray-900 hover:bg-blue-50 hover:text-blue-800 border-2 border-gray-300 hover:border-blue-500"
              }`}
              onClick={() => handleFilterChange("categories", [])}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  const isSelected = filters.categories.includes(category.id);
                  const newCategories = isSelected
                    ? filters.categories.filter((id) => id !== category.id)
                    : [...filters.categories, category.id];
                  handleFilterChange("categories", newCategories);
                }}
                className={`px-6 py-3 rounded-lg font-poppins font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 min-h-[44px] flex items-center ${
                  filters.categories.includes(category.id)
                    ? "bg-blue-800 text-white shadow-lg hover:bg-blue-900"
                    : "bg-white text-gray-900 hover:bg-blue-50 hover:text-blue-800 border-2 border-gray-300 hover:border-blue-500"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-80">
                  ({products.filter((p) => p.categoryId === category.id).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Sort Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full font-poppins font-semibold border-2 border-gray-400 text-gray-900 hover:border-blue-600 hover:text-blue-800 min-h-[44px]"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 font-poppins">
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="text-blue-800 hover:text-blue-900 font-poppins font-semibold min-h-[32px]"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 font-poppins mb-3">
                  Brand
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {uniqueBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center cursor-pointer group min-h-[24px]"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={(e) => {
                          const newBrands = e.target.checked
                            ? [...filters.brands, brand]
                            : filters.brands.filter((b) => b !== brand);
                          handleFilterChange("brands", newBrands);
                        }}
                        className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-400 rounded focus:ring-blue-600 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-900 font-poppins font-medium group-hover:text-blue-800 transition-colors duration-200">
                        {brand}
                        <span className="ml-1 text-xs text-gray-600">
                          ({products.filter((p) => p.brand === brand).length})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 font-poppins mb-3">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          parseInt(e.target.value) || 0
                        );
                        handleFilterChange("priceRange", [
                          value,
                          filters.priceRange[1],
                        ]);
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg font-poppins text-sm text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[40px]"
                    />
                    <span className="text-gray-600 font-poppins font-medium">
                      -
                    </span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const value = Math.min(
                          10000,
                          parseInt(e.target.value) || 10000
                        );
                        handleFilterChange("priceRange", [
                          filters.priceRange[0],
                          value,
                        ]);
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg font-poppins text-sm text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[40px]"
                    />
                  </div>
                  <div className="text-xs text-gray-700 font-poppins font-medium">
                    Range: ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 font-poppins mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-3">
                  {[4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center cursor-pointer group min-h-[24px]"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange("rating", rating)}
                        className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-400 focus:ring-blue-600 focus:ring-2"
                      />
                      <div className="ml-3 flex items-center">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < rating ? "text-yellow-500" : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-900 font-poppins font-medium group-hover:text-blue-800 transition-colors duration-200">
                          & up (
                          {products.filter((p) => p.rating >= rating).length})
                        </span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer group min-h-[24px]">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === 0}
                      onChange={() => handleFilterChange("rating", 0)}
                      className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-400 focus:ring-blue-600 focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-gray-900 font-poppins font-medium group-hover:text-blue-800 transition-colors duration-200">
                      All Ratings
                    </span>
                  </label>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-4">
                <label className="flex items-center cursor-pointer group min-h-[24px]">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) =>
                      handleFilterChange("inStock", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-400 rounded focus:ring-blue-600 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-900 font-poppins font-medium group-hover:text-blue-800 transition-colors duration-200">
                    In Stock Only ({products.filter((p) => p.inStock).length})
                  </span>
                </label>

                <label className="flex items-center cursor-pointer group min-h-[24px]">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) =>
                      handleFilterChange("onSale", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-400 rounded focus:ring-blue-600 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-900 font-poppins font-medium group-hover:text-blue-800 transition-colors duration-200">
                    On Sale (
                    {
                      products.filter((p) => p.discount && p.discount > 0)
                        .length
                    }
                    )
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900 font-poppins">
                  Products
                </h2>
                <span className="text-gray-700 font-poppins font-medium">
                  ({filteredProducts.length} results)
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-900 font-poppins">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border-2 border-gray-400 rounded-lg font-poppins text-sm text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 bg-white min-h-[40px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-blue-900 font-poppins">
                    Active Filters:
                  </span>
                  {filters.categories.map((categoryId) => {
                    const category = categories.find(
                      (c) => c.id === categoryId
                    );
                    return category ? (
                      <span
                        key={categoryId}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-blue-800 text-white min-h-[28px]"
                      >
                        {category.name}
                        <button
                          onClick={() => {
                            const newCategories = filters.categories.filter(
                              (id) => id !== categoryId
                            );
                            handleFilterChange("categories", newCategories);
                          }}
                          className="ml-2 hover:text-blue-200 transition-colors duration-200 w-4 h-4 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </span>
                    ) : null;
                  })}
                  {filters.brands.map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-blue-800 text-white min-h-[28px]"
                    >
                      {brand}
                      <button
                        onClick={() => {
                          const newBrands = filters.brands.filter(
                            (b) => b !== brand
                          );
                          handleFilterChange("brands", newBrands);
                        }}
                        className="ml-2 hover:text-blue-200 transition-colors duration-200 w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.rating > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-blue-800 text-white min-h-[28px]">
                      {filters.rating}+ Stars
                      <button
                        onClick={() => handleFilterChange("rating", 0)}
                        className="ml-2 hover:text-blue-200 transition-colors duration-200 w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.inStock && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-blue-800 text-white min-h-[28px]">
                      In Stock
                      <button
                        onClick={() => handleFilterChange("inStock", false)}
                        className="ml-2 hover:text-blue-200 transition-colors duration-200 w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.onSale && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-blue-800 text-white min-h-[28px]">
                      On Sale
                      <button
                        onClick={() => handleFilterChange("onSale", false)}
                        className="ml-2 hover:text-blue-200 transition-colors duration-200 w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mb-12">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-poppins mb-2">
                  No products found
                </h3>
                <p className="text-gray-700 font-poppins font-medium mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="font-poppins font-semibold bg-blue-800 hover:bg-blue-900 min-h-[44px]"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More / Pagination Info */}
            {filteredProducts.length > 0 && (
              <div className="text-center border-t-2 border-gray-300 pt-8">
                <p className="text-gray-800 font-poppins font-medium mb-4">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
                {filteredProducts.length < products.length && (
                  <p className="text-sm text-gray-600 font-poppins">
                    Use filters above to refine your search
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
