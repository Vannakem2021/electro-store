"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { ShoppingBagIcon, HeartIcon, LoaderIcon } from "@/components/ui";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showLink?: boolean; // Optional prop to control whether to show link or not
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  showLink = true,
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event bubbling

    if (isAddingToCart) return; // Prevent multiple clicks

    setIsAddingToCart(true);

    try {
      if (onAddToCart) {
        // When onAddToCart is provided, let the parent handle the operation and toasts
        onAddToCart(product);
        // Simulate async operation for better UX
        await new Promise((resolve) => setTimeout(resolve, 300));
      } else {
        // Use cart context as fallback (this will show its own toast)
        addToCart(product, 1);
        // Simulate async operation for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking wishlist
    e.stopPropagation(); // Stop event bubbling

    if (isTogglingWishlist) return; // Prevent multiple clicks

    setIsTogglingWishlist(true);

    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
      // Simulate async operation for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const cardContent = (
    <div className="bg-white rounded-md shadow-md overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl h-full flex flex-col">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        {/* Wishlist Icon - Replaces discount percentage */}
        <button
          onClick={handleWishlistToggle}
          disabled={isTogglingWishlist}
          className={`absolute top-3 left-3 w-8 h-8 backdrop-blur-sm rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center group/heart shadow-sm disabled:cursor-not-allowed ${
            isInWishlist(product.id)
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-white/90 hover:bg-red-50 hover:text-red-500 text-gray-600"
          }`}
          title={
            isTogglingWishlist
              ? "Processing..."
              : isInWishlist(product.id)
              ? t("wishlist.removeFromWishlist")
              : t("wishlist.addToWishlist")
          }
        >
          {isTogglingWishlist ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : (
            <HeartIcon
              className={`w-4 h-4 transition-transform duration-200 group-hover/heart:scale-110 ${
                isInWishlist(product.id) ? "fill-current" : ""
              }`}
            />
          )}
        </button>

        {product.isNew && (
          <div
            className={`absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-md ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("product.new")}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white flex flex-col flex-grow">
        {/* Product Content - Flexible area */}
        <div className="flex-grow">
          {/* Product Name - Always use Rubik for brand consistency
              Note: Product names are NOT translated to maintain brand recognition */}
          <h3 className="font-medium text-gray-900 mb-1 text-sm leading-tight line-clamp-2 font-rubik">
            {truncateText(product.name, 60)}
          </h3>

          {/* Model/Category - Translate if generic terms */}
          <p
            className={`text-xs text-gray-500 mb-3 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {product.category}
          </p>
        </div>

        {/* Price and Cart Section - Fixed at bottom */}
        <div className="flex items-end justify-between mt-auto">
          <div className="space-y-1">
            {product.originalPrice && (
              <span
                className={`text-xs text-gray-400 line-through block ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span
              className={`text-base sm:text-lg font-bold text-gray-900 block ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart Icon - Aligned with price */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="w-8 h-8 bg-gray-100 hover:bg-teal-600 hover:text-white disabled:bg-gray-200 text-gray-600 rounded-lg transition-all duration-200 ease-in-out disabled:cursor-not-allowed flex items-center justify-center group/btn flex-shrink-0"
            title={
              !product.inStock
                ? t("product.outOfStock")
                : isAddingToCart
                ? "Adding..."
                : t("product.addToCart")
            }
          >
            {isAddingToCart ? (
              <LoaderIcon className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingBagIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Return with or without Link wrapper based on showLink prop
  if (showLink) {
    return (
      <Link href={`/products/${product.id}`} className="h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ProductCard;
