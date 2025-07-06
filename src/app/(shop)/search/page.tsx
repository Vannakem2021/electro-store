"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { categories } from "@/data";
import { Navbar, Footer } from "@/components";
import {
  ProductCard,
  Button,
  FilterIcon,
  SearchIcon,
  SkeletonGrid,
} from "@/components/ui";

type SortOption =
  | "relevance"
  | "price-low"
  | "price-high"
  | "newest"
  | "rating";

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { addToCart } = useCart();
  const { results, query, search, setQuery, isLoading, resultCount } =
    useSearch();
  const searchParams = useSearchParams();

  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
    inStock: false,
    onSale: false,
  });

  // Get unique brands from search results
  const availableBrands = useMemo(() => {
    const brands = new Set(results.map((product) => product.brand));
    return Array.from(brands).sort();
  }, [results]);

  // Get unique categories from search results
  const availableCategories = useMemo(() => {
    const categoryIds = new Set(results.map((product) => product.categoryId));
    return categories.filter((cat) => categoryIds.has(cat.id));
  }, [results]);

  // Handle URL search parameter
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery && urlQuery !== query) {
      // Use setQuery to update context without triggering search redirect
      setQuery(urlQuery);
      // Then perform search without redirect
      search(urlQuery, false);
    }
  }, [searchParams, search, setQuery, query]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

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

    // Apply in stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Apply on sale filter
    if (filters.onSale) {
      filtered = filtered.filter(
        (product) =>
          product.originalPrice && product.originalPrice > product.price
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "relevance":
      default:
        // Results are already sorted by relevance from search
        break;
    }

    setFilteredResults(filtered);
  }, [results, filters, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 2000],
      inStock: false,
      onSale: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SearchIcon className="w-6 h-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              {query ? "Search Results for" : "Search Products"}
              {query && <span className="text-teal-600 ml-2">"{query}"</span>}
            </h1>
          </div>

          {query && (
            <p className="text-gray-600">
              {isLoading
                ? "Searching..."
                : `Found ${filteredResults.length} of ${resultCount} results`}
            </p>
          )}
        </div>

        {isLoading ? (
          /* Loading State */
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
                <div className="h-6 bg-gray-200 rounded-md w-20 mb-4 animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Skeleton */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-md w-40 animate-pulse"></div>
              </div>
              <SkeletonGrid count={6} variant="default" gridCols="3" />
            </div>
          </div>
        ) : !query ? (
          /* No Search Query */
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Enter Search Query
            </h2>
            <p className="text-gray-500">
              Use the search bar above to find products
            </p>
          </div>
        ) : filteredResults.length === 0 ? (
          /* No Results */
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              No Results Found
            </h2>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          /* Search Results */
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                  >
                    <FilterIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div
                  className={`space-y-6 ${
                    showFilters ? "block" : "hidden lg:block"
                  }`}
                >
                  {/* Category Filter */}
                  {availableCategories.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Category
                      </h4>
                      <div className="space-y-2">
                        {availableCategories.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              checked={filters.categories.includes(category.id)}
                              onChange={(e) => {
                                const newCategories = e.target.checked
                                  ? [...filters.categories, category.id]
                                  : filters.categories.filter(
                                      (id) => id !== category.id
                                    );
                                handleFilterChange("categories", newCategories);
                              }}
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {category.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brand Filter */}
                  {availableBrands.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                      <div className="space-y-2">
                        {availableBrands.map((brand) => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.brands.includes(brand)}
                              onChange={(e) => {
                                const newBrands = e.target.checked
                                  ? [...filters.brands, brand]
                                  : filters.brands.filter((b) => b !== brand);
                                handleFilterChange("brands", newBrands);
                              }}
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span
                              className={`ml-2 text-sm text-gray-700 ${
                                isKhmer ? "font-khmer" : "font-rubik"
                              }`}
                            >
                              {brand}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clear Filters */}
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">
                  Showing {filteredResults.length} results
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    showLink={true}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
