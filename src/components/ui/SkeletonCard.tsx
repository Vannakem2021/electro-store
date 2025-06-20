"use client";

import React from "react";

interface SkeletonCardProps {
  className?: string;
  variant?: "default" | "special"; // For different card types
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = "",
  variant = "default",
}) => {
  return (
    <div
      className={`bg-white rounded-md border border-gray-200 overflow-hidden animate-pulse ${className}`}
    >
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
        </div>

        {/* Category */}
        <div className="h-3 bg-gray-200 rounded-md w-1/3"></div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-300 rounded-md w-20"></div>
          {variant === "special" && (
            <div className="h-4 bg-gray-200 rounded-md w-16"></div>
          )}
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
