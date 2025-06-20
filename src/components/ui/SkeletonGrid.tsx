"use client";

import React from "react";
import SkeletonCard from "./SkeletonCard";

interface SkeletonGridProps {
  count?: number;
  variant?: "default" | "special";
  className?: string;
  gridCols?: "2" | "3" | "4"; // For different grid layouts
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  count = 8,
  variant = "default",
  className = "",
  gridCols = "4",
}) => {
  const gridClasses = {
    "2": "grid-cols-2",
    "3": "grid-cols-2 sm:grid-cols-3",
    "4": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClasses[gridCols]} gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} variant={variant} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
