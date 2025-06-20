"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Product } from "@/types";
import { products, categories } from "@/data";
import { useToast } from "./ToastContext";

// Search state interface
interface SearchState {
  query: string;
  results: Product[];
  isLoading: boolean;
  searchHistory: string[];
  suggestions: string[];
  hasSearched: boolean;
  resultCount: number;
}

// Search actions interface
interface SearchActions {
  search: (query: string, redirect?: boolean) => void;
  clearSearch: () => void;
  clearHistory: () => void;
  setQuery: (query: string) => void;
  getSuggestions: (input: string) => string[];
}

// Combined search context interface
interface SearchContextType extends SearchState, SearchActions {}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to use search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Search provider props
interface SearchProviderProps {
  children: React.ReactNode;
}

// Local storage keys
const SEARCH_HISTORY_KEY = "elecxo-search-history";
const MAX_HISTORY_ITEMS = 5;

// Search scoring function
const calculateSearchScore = (product: Product, query: string): number => {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  // Exact name match (highest priority)
  if (product.name.toLowerCase() === lowerQuery) {
    score += 100;
  }
  // Name starts with query
  else if (product.name.toLowerCase().startsWith(lowerQuery)) {
    score += 80;
  }
  // Name contains query
  else if (product.name.toLowerCase().includes(lowerQuery)) {
    score += 60;
  }

  // Brand exact match
  if (product.brand.toLowerCase() === lowerQuery) {
    score += 70;
  }
  // Brand contains query
  else if (product.brand.toLowerCase().includes(lowerQuery)) {
    score += 40;
  }

  // Category exact match
  if (product.category.toLowerCase() === lowerQuery) {
    score += 50;
  }
  // Category contains query
  else if (product.category.toLowerCase().includes(lowerQuery)) {
    score += 30;
  }

  // Description contains query
  if (product.description.toLowerCase().includes(lowerQuery)) {
    score += 20;
  }

  // Tags match (if available)
  if (product.tags) {
    product.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        score += 15;
      }
    });
  }

  // Boost for popular products
  if (product.isBestSeller) score += 10;
  if (product.isFeatured) score += 5;
  if (product.isNew) score += 3;

  return score;
};

// Fuzzy search function
const performSearch = (query: string): Product[] => {
  if (!query.trim()) return [];

  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0);

  const scoredProducts = products.map((product) => {
    let totalScore = 0;

    searchTerms.forEach((term) => {
      totalScore += calculateSearchScore(product, term);
    });

    return { product, score: totalScore };
  });

  // Filter products with score > 0 and sort by score
  return scoredProducts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();

  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    searchHistory: [],
    suggestions: [],
    hasSearched: false,
    resultCount: 0,
  });

  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setSearchState((prev) => ({
          ...prev,
          searchHistory: parsedHistory,
        }));
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  }, []);

  // Save search history to localStorage
  const saveSearchHistory = useCallback((history: string[]) => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  }, []);

  // Generate suggestions based on products and categories
  const getSuggestions = useCallback((input: string): string[] => {
    if (!input.trim()) return [];

    const lowerInput = input.toLowerCase();
    const suggestions = new Set<string>();

    // Add product names that match
    products.forEach((product) => {
      if (product.name.toLowerCase().includes(lowerInput)) {
        suggestions.add(product.name);
      }
      if (product.brand.toLowerCase().includes(lowerInput)) {
        suggestions.add(product.brand);
      }
    });

    // Add category names that match
    categories.forEach((category) => {
      if (category.name.toLowerCase().includes(lowerInput)) {
        suggestions.add(category.name);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }, []);

  // Debounced search function
  const search = useCallback(
    (query: string, redirect: boolean = true) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setSearchState((prev) => ({
          ...prev,
          query: "",
          results: [],
          hasSearched: false,
          resultCount: 0,
        }));
        return;
      }

      setSearchState((prev) => ({
        ...prev,
        isLoading: true,
        query: trimmedQuery,
      }));

      // Simulate API delay for better UX
      setTimeout(() => {
        try {
          const results = performSearch(trimmedQuery);

          setSearchState((prev) => {
            // Update search history
            const newHistory = [
              trimmedQuery,
              ...prev.searchHistory.filter((h) => h !== trimmedQuery),
            ].slice(0, MAX_HISTORY_ITEMS);

            saveSearchHistory(newHistory);

            return {
              ...prev,
              results,
              isLoading: false,
              hasSearched: true,
              resultCount: results.length,
              searchHistory: newHistory,
            };
          });

          // Show appropriate toast notification
          if (results.length > 0) {
            showSuccess(
              t("toast.searchCompleted"),
              `Found ${results.length} results`
            );
          }

          // Redirect to search results page
          if (redirect) {
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
          }
        } catch (error) {
          console.error("Search error:", error);
          setSearchState((prev) => ({
            ...prev,
            isLoading: false,
            hasSearched: true,
            results: [],
            resultCount: 0,
          }));

          showError(
            t("toast.searchFailed"),
            "Please try again or check your connection."
          );
        }
      }, 300); // 300ms debounce
    },
    [router, saveSearchHistory, showSuccess, showError, t]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchState((prev) => ({
      ...prev,
      query: "",
      results: [],
      hasSearched: false,
      resultCount: 0,
    }));
  }, []);

  // Clear search history
  const clearHistory = useCallback(() => {
    setSearchState((prev) => ({
      ...prev,
      searchHistory: [],
    }));
    saveSearchHistory([]);
  }, [saveSearchHistory]);

  // Set query without searching
  const setQuery = useCallback((query: string) => {
    setSearchState((prev) => ({
      ...prev,
      query,
    }));
  }, []);

  const contextValue: SearchContextType = {
    ...searchState,
    search,
    clearSearch,
    clearHistory,
    setQuery,
    getSuggestions,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
