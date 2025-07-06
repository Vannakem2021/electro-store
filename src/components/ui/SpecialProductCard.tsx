"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useWishlist } from "@/contexts/WishlistContext";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { ShoppingBagIcon, HeartIcon, LoaderIcon } from "@/components/ui/Icons";

interface SpecialProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  variant?: "discount" | "new";
  showLink?: boolean; // Optional prop to control whether to show link or not
}

const SpecialProductCard: React.FC<SpecialProductCardProps> = ({
  product,
  onAddToCart,
  variant = "discount",
  showLink = true,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event bubbling

    if (isAddingToCart || !onAddToCart) return; // Prevent multiple clicks

    setIsAddingToCart(true);

    try {
      onAddToCart(product);
      // Simulate async operation for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
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

  const isDiscount = variant === "discount";
  const isNew = variant === "new";

  const cardContent = (
    <div className="bg-white rounded-md shadow-md overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="relative w-full sm:w-40 h-40 sm:h-32 overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            sizes="(max-width: 640px) 100vw, 160px"
          />

          {/* Clean Badges */}
          {isDiscount && product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-md">
              -{product.discount}%
            </div>
          )}
          {isNew && product.isNew && (
            <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-md">
              NEW
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 bg-white flex flex-col justify-between">
          <div>
            {/* Product Name - Always use Rubik for brand consistency
                Note: Product names are NOT translated to maintain brand recognition */}
            <h3 className="font-medium text-gray-900 mb-1 text-sm leading-tight line-clamp-2 font-rubik">
              {truncateText(product.name, 50)}
            </h3>

            {/* Model/Category - Translate if generic terms */}
            <p className="text-xs text-gray-500 mb-3">{product.category}</p>
          </div>

          {/* Price and Actions Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Add to Cart Icon */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className={`w-8 h-8 hover:text-white disabled:bg-gray-200 text-gray-600 rounded-lg transition-all duration-200 ease-in-out disabled:cursor-not-allowed flex items-center justify-center group/btn ${
                  isDiscount
                    ? "bg-gray-100 hover:bg-red-500"
                    : "bg-gray-100 hover:bg-blue-500"
                }`}
                title={
                  !product.inStock
                    ? "Out of Stock"
                    : isAddingToCart
                    ? "Adding..."
                    : "Add to Cart"
                }
              >
                {isAddingToCart ? (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingBagIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110" />
                )}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={handleWishlistToggle}
                disabled={isTogglingWishlist}
                className={`w-8 h-8 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center group/heart disabled:cursor-not-allowed ${
                  isInWishlist(product.id)
                    ? "bg-red-50 text-red-500 hover:bg-red-100"
                    : "bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-600"
                }`}
                title={
                  isTogglingWishlist
                    ? "Processing..."
                    : isInWishlist(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
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
            </div>
          </div>
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

export default SpecialProductCard;
