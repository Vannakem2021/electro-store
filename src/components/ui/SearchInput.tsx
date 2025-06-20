"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { SearchIcon, LoaderIcon, ClockIcon, ChevronDownIcon } from "./Icons";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  isMobile?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className = "",
  placeholder,
  isMobile = false,
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const {
    query,
    search,
    setQuery,
    isLoading,
    searchHistory,
    clearHistory,
    getSuggestions,
  } = useSearch();

  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize input value from context query only once on mount
  useEffect(() => {
    setInputValue(query);
  }, []); // Empty dependency array - only run on mount

  // Only sync input with context when context query changes and input is empty or matches
  useEffect(() => {
    if (query && (inputValue === "" || inputValue === query)) {
      setInputValue(query);
    }
  }, [query]); // Only depend on query, not inputValue to avoid loops

  // Handle input change with debouncing for suggestions
  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for suggestions
    const timer = setTimeout(() => {
      if (value.trim()) {
        const newSuggestions = getSuggestions(value);
        setSuggestions(newSuggestions);
        setShowDropdown(newSuggestions.length > 0 || searchHistory.length > 0);
      } else {
        setSuggestions([]);
        setShowDropdown(searchHistory.length > 0);
      }
    }, 150);

    setDebounceTimer(timer);
  };

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const queryToSearch = searchQuery || inputValue.trim();
    if (queryToSearch) {
      search(queryToSearch);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  // Handle focus
  const handleFocus = () => {
    if (inputValue.trim()) {
      const newSuggestions = getSuggestions(inputValue);
      setSuggestions(newSuggestions);
    }
    setShowDropdown(suggestions.length > 0 || searchHistory.length > 0);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const displayPlaceholder = placeholder || t("nav.search");

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          placeholder={displayPlaceholder}
          className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-tr-lg rounded-bl-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {isLoading ? (
            <LoaderIcon className="h-5 w-5 text-teal-600 animate-spin mr-3" />
          ) : (
            <button
              onClick={() => handleSearch()}
              className="p-2 text-gray-400 hover:text-teal-600 transition-colors duration-200"
              type="button"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div
                className={`px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("search.suggestions")}
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <SearchIcon className="w-4 h-4 text-gray-400 inline mr-2" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="flex items-center justify-between px-3 py-2">
                <span
                  className={`text-xs font-medium text-gray-500 uppercase tracking-wide ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("search.recentSearches")}
                </span>
                <button
                  onClick={clearHistory}
                  className={`text-xs text-teal-600 hover:text-teal-700 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("search.clear")}
                </button>
              </div>
              {searchHistory.map((historyItem, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(historyItem)}
                  className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <ClockIcon className="w-4 h-4 text-gray-400 inline mr-2" />
                  {historyItem}
                </button>
              ))}
            </div>
          )}

          {/* No suggestions or history */}
          {suggestions.length === 0 &&
            searchHistory.length === 0 &&
            inputValue.trim() && (
              <div className="p-4 text-center">
                <p
                  className={`text-sm text-gray-500 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("search.noSuggestions")}
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
