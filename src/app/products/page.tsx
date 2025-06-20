"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { products, categories } from "@/data";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Navbar, Footer } from "@/components";
import {
  ProductCard,
  Button,
  FilterIcon,
  PackageIcon,
  UnplugIcon,
  CameraIcon,
  LaptopMinimalIcon,
  TabletSmartphoneIcon,
  Gamepad2Icon,
  WatchIcon,
  SkeletonGrid,
  LoadingButton,
} from "@/components/ui";

// Helper function to get category icon
const getCategoryIcon = (categoryId: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    "1": UnplugIcon, // Accessories
    "2": CameraIcon, // Camera
    "3": LaptopMinimalIcon, // Laptop
    "4": TabletSmartphoneIcon, // Smart Phone
    "5": Gamepad2Icon, // Gaming
    "6": WatchIcon, // Smart Watch
  };

  return iconMap[categoryId] || UnplugIcon;
};

// Filter and sort interfaces
interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "name";

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
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

  // Initial loading effect
  useEffect(() => {
    const loadInitialProducts = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFilteredProducts(products);
      setIsLoading(false);
    };

    loadInitialProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    if (isLoading) return; // Don't filter while initial loading

    const applyFilters = async () => {
      setIsFiltering(true);
      // Simulate filter processing delay
      await new Promise((resolve) => setTimeout(resolve, 300));

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
            return 0;
          });
          break;
      }

      setFilteredProducts(filtered);
      setIsFiltering(false);
    };

    applyFilters();
  }, [filters, sortBy, isLoading]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleFilterChange = (
    key: keyof FilterState,
    value: FilterState[keyof FilterState]
  ) => {
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
      inStock: false,
      onSale: false,
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
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
        <nav className="flex items-center space-x-2 text-sm mb-8 font-mono">
          <Link
            href="/"
            className="text-gray-800 hover:text-teal-800 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-semibold">Products</span>
        </nav>

        {/* Filters and Sort Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full font-mono font-semibold border-2 border-gray-400 text-gray-900 hover:border-teal-600 hover:text-teal-800 min-h-[44px]"
            >
              <FilterIcon className="w-5 h-5 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 font-mono">
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="text-teal-800 hover:text-teal-900 font-mono font-semibold min-h-[32px]"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Categories Filter */}
              <div className="mb-6 bg-gray-100/30 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 font-mono mb-4">
                  Categories
                </h4>
                <div className="space-y-3">
                  <button
                    onClick={() => handleFilterChange("categories", [])}
                    className={`w-full flex items-center gap-3 p-3 transition-all duration-200 text-left ${
                      filters.categories.length === 0
                        ? "text-teal-700"
                        : "text-gray-700 hover:text-teal-700"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        filters.categories.length === 0
                          ? "bg-teal-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <PackageIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium font-mono">
                      All Products
                    </span>
                  </button>

                  {categories.map((category) => {
                    const IconComponent = getCategoryIcon(category.id);
                    const isSelected = filters.categories.includes(category.id);

                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          const newCategories = isSelected
                            ? filters.categories.filter(
                                (id) => id !== category.id
                              )
                            : [...filters.categories, category.id];
                          handleFilterChange("categories", newCategories);
                        }}
                        className={`w-full flex items-center gap-3 p-3 transition-all duration-200 text-left ${
                          isSelected
                            ? "text-teal-700"
                            : "text-gray-700 hover:text-teal-700"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isSelected ? "bg-teal-100" : "bg-gray-100"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium font-mono">
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6 bg-gray-200/30 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 font-mono mb-3">
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
                        className="w-4 h-4 text-teal-700 bg-gray-100 border-gray-400 rounded focus:ring-teal-600 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-900 font-mono font-medium group-hover:text-teal-800 transition-colors duration-200">
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
              <div className="mb-6 bg-gray-300/30 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 font-mono mb-3">
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
                      className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg font-mono text-sm text-gray-900 focus:border-teal-600 focus:outline-none transition-colors duration-200 min-h-[40px]"
                    />
                    <span className="text-gray-600 font-mono font-medium">
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
                      className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg font-mono text-sm text-gray-900 focus:border-teal-600 focus:outline-none transition-colors duration-200 min-h-[40px]"
                    />
                  </div>
                  <div className="text-xs text-gray-700 font-mono font-medium">
                    Range: ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-4 bg-gray-400/30 p-4 rounded-lg">
                <label className="flex items-center cursor-pointer group min-h-[24px]">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) =>
                      handleFilterChange("inStock", e.target.checked)
                    }
                    className="w-4 h-4 text-teal-700 bg-gray-100 border-gray-400 rounded focus:ring-teal-600 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-900 font-mono font-medium group-hover:text-teal-800 transition-colors duration-200">
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
                    className="w-4 h-4 text-teal-700 bg-gray-100 border-gray-400 rounded focus:ring-teal-600 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-900 font-mono font-medium group-hover:text-teal-800 transition-colors duration-200">
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
                <h2 className="text-xl font-bold text-gray-900 font-mono">
                  Products
                </h2>
                <span className="text-gray-700 font-mono font-medium">
                  ({filteredProducts.length} results)
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-900 font-mono">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border-2 border-gray-400 rounded-lg font-mono text-sm text-gray-900 focus:border-teal-600 focus:outline-none transition-colors duration-200 bg-white min-h-[40px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <SkeletonGrid
                count={12}
                variant="default"
                gridCols="3"
                className="mb-12"
              />
            ) : isFiltering ? (
              <div className="relative">
                <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600 font-mono">
                      Filtering products...
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 mb-12 items-stretch opacity-50">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      showLink={true}
                    />
                  ))}
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 mb-12 items-stretch">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    showLink={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <PackageIcon
                    className="w-24 h-24 mx-auto text-gray-300"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-mono mb-2">
                  No products found
                </h3>
                <p className="text-gray-700 font-mono font-medium mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="font-mono font-semibold bg-teal-800 hover:bg-teal-900 min-h-[44px]"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More / Pagination Info */}
            {filteredProducts.length > 0 && (
              <div className="text-center border-t-2 border-gray-300 pt-8">
                <p className="text-gray-800 font-mono font-medium mb-4">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
                {filteredProducts.length < products.length && (
                  <p className="text-sm text-gray-600 font-mono">
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
