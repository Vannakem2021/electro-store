"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Navbar, Footer } from "@/components";
import {
  ProductCard,
  LoadingButton,
  HeartIcon,
  ShoppingBagIcon,
  ShareIcon,
  TrashIcon,
  CheckIcon,
  HomeIcon,
} from "@/components/ui";

const WishlistPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const {
    items,
    itemCount,
    removeFromWishlist,
    clearWishlist,
    shareWishlist,
    bulkMoveToCart,
  } = useWishlist();
  const { addToCart } = useCart();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMovingToCart, setIsMovingToCart] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Handle individual item selection
  const handleItemSelect = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle select all/none
  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.product.id));
    }
  };

  // Handle move selected to cart
  const handleMoveSelectedToCart = async () => {
    if (selectedItems.length === 0) return;

    setIsMovingToCart(true);
    try {
      // Add selected items to cart
      selectedItems.forEach((productId) => {
        const wishlistItem = items.find(
          (item) => item.product.id === productId
        );
        if (wishlistItem) {
          addToCart(wishlistItem.product, 1);
        }
      });

      // Remove from wishlist
      bulkMoveToCart(selectedItems);
      setSelectedItems([]);

      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsMovingToCart(false);
    }
  };

  // Handle remove selected items
  const handleRemoveSelected = () => {
    selectedItems.forEach((productId) => {
      removeFromWishlist(productId);
    });
    setSelectedItems([]);
  };

  // Handle clear wishlist
  const handleClearWishlist = async () => {
    setIsClearing(true);
    try {
      clearWishlist();
      setSelectedItems([]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsClearing(false);
    }
  };

  // Handle share wishlist
  const handleShareWishlist = async () => {
    setIsSharing(true);
    try {
      shareWishlist();
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsSharing(false);
    }
  };

  // Handle add to cart from wishlist
  const handleAddToCart = (productId: string) => {
    const wishlistItem = items.find((item) => item.product.id === productId);
    if (wishlistItem) {
      addToCart(wishlistItem.product, 1);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-teal-600 transition-colors duration-200"
          >
            {t("nav.home")}
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/account"
            className="text-gray-500 hover:text-teal-600 transition-colors duration-200"
          >
            {t("nav.account")}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">
            {t("wishlist.title")}
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1
              className={`text-3xl font-bold text-gray-900 mb-2 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("wishlist.title")}
            </h1>
            <p
              className={`text-gray-600 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("wishlist.itemCount", { count: itemCount })}
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <LoadingButton
                onClick={handleShareWishlist}
                loading={isSharing}
                loadingText={t("wishlist.sharing")}
                variant="outline"
                className={`inline-flex items-center gap-2 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                <ShareIcon className="w-4 h-4" />
                {t("wishlist.shareWishlist")}
              </LoadingButton>

              <LoadingButton
                onClick={handleClearWishlist}
                loading={isClearing}
                loadingText={t("common.loading")}
                variant="outline"
                className={`inline-flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                <TrashIcon className="w-4 h-4" />
                {t("wishlist.clearWishlist")}
              </LoadingButton>
            </div>
          )}
        </div>
        {/* Wishlist Content */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <HeartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2
              className={`text-2xl font-semibold text-gray-900 mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("wishlist.empty")}
            </h2>
            <p
              className={`text-gray-600 mb-8 max-w-md mx-auto ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("wishlist.emptyDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors duration-200 font-medium ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                <HomeIcon className="w-5 h-5" />
                {t("wishlist.continueShopping")}
              </Link>
              <Link
                href="/products"
                className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-700 text-teal-700 rounded-md hover:bg-teal-700 hover:text-white transition-colors duration-200 font-medium ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("wishlist.browseProducts")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Bulk Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-md p-4 mb-6">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <button
                  onClick={handleSelectAll}
                  className={`inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <div
                    className={`w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center ${
                      selectedItems.length === items.length
                        ? "bg-teal-600 border-teal-600"
                        : ""
                    }`}
                  >
                    {selectedItems.length === items.length && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                  {selectedItems.length === items.length
                    ? t("wishlist.selectNone")
                    : t("wishlist.selectAll")}
                </button>

                {selectedItems.length > 0 && (
                  <span
                    className={`text-sm text-gray-600 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {t("wishlist.selectedItems", {
                      count: selectedItems.length,
                    })}
                  </span>
                )}
              </div>

              {selectedItems.length > 0 && (
                <div className="flex gap-3">
                  <LoadingButton
                    onClick={handleMoveSelectedToCart}
                    loading={isMovingToCart}
                    loadingText={t("wishlist.moveToCart")}
                    variant="primary"
                    size="sm"
                    className={`inline-flex items-center gap-2 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    {t("wishlist.moveSelected")}
                  </LoadingButton>

                  <button
                    onClick={handleRemoveSelected}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    <TrashIcon className="w-4 h-4" />
                    {t("wishlist.removeSelected")}
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {items.map((item) => (
                <div key={item.product.id} className="relative">
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => handleItemSelect(item.product.id)}
                    className="absolute top-2 left-2 z-10 w-6 h-6 bg-white/90 backdrop-blur-sm rounded border-2 border-gray-300 flex items-center justify-center hover:border-teal-600 transition-colors duration-200"
                  >
                    {selectedItems.includes(item.product.id) && (
                      <CheckIcon className="w-4 h-4 text-teal-600" />
                    )}
                  </button>

                  {/* Product Card */}
                  <ProductCard
                    product={item.product}
                    onAddToCart={() => handleAddToCart(item.product.id)}
                    showLink={true}
                  />

                  {/* Added Date */}
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    <span className={isKhmer ? "font-khmer" : "font-rubik"}>
                      {t("wishlist.addedOn")}{" "}
                      {new Date(item.addedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
