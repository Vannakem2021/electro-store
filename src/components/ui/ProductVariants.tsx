"use client";

import React, { useState, useEffect } from "react";

import { CheckIcon } from "./Icons";

export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "size" | "storage" | "memory" | "style";
  value: string;
  displayValue: string;
  colorCode?: string;
  priceModifier: number; // Price difference from base price
  stockCount: number;
  inStock: boolean;
  images?: string[]; // Optional variant-specific images
}

export interface VariantGroup {
  type: "color" | "size" | "storage" | "memory" | "style";
  name: string;
  variants: ProductVariant[];
  required: boolean;
}

interface ProductVariantsProps {
  variantGroups: VariantGroup[];
  onVariantChange: (selectedVariants: {
    [key: string]: ProductVariant;
  }) => void;
  className?: string;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({
  variantGroups,
  onVariantChange,
  className = "",
}) => {
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: ProductVariant;
  }>({});

  // Initialize with first available variant for each required group
  useEffect(() => {
    const initialVariants: { [key: string]: ProductVariant } = {};

    variantGroups.forEach((group) => {
      if (group.required && group.variants.length > 0) {
        const firstAvailable =
          group.variants.find((v) => v.inStock) || group.variants[0];
        initialVariants[group.type] = firstAvailable;
      }
    });

    setSelectedVariants(initialVariants);
    onVariantChange(initialVariants);
  }, [variantGroups, onVariantChange]);

  const handleVariantSelect = (groupType: string, variant: ProductVariant) => {
    const newSelectedVariants = {
      ...selectedVariants,
      [groupType]: variant,
    };

    setSelectedVariants(newSelectedVariants);
    onVariantChange(newSelectedVariants);
  };

  const renderColorVariants = (group: VariantGroup) => (
    <div className="flex flex-wrap gap-3">
      {group.variants.map((variant) => {
        const isSelected = selectedVariants[group.type]?.id === variant.id;
        const isDisabled = !variant.inStock;

        return (
          <button
            key={variant.id}
            onClick={() =>
              !isDisabled && handleVariantSelect(group.type, variant)
            }
            disabled={isDisabled}
            className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
              isSelected
                ? "border-teal-600 ring-2 ring-teal-200"
                : "border-gray-300 hover:border-gray-400"
            } ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            title={`${variant.displayValue} ${
              isDisabled ? "(Out of Stock)" : ""
            }`}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: variant.colorCode || "#ccc" }}
            />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white drop-shadow-md" />
              </div>
            )}
            {isDisabled && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-0.5 bg-red-500 rotate-45"></div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderSizeVariants = (group: VariantGroup) => (
    <div className="flex flex-wrap gap-2">
      {group.variants.map((variant) => {
        const isSelected = selectedVariants[group.type]?.id === variant.id;
        const isDisabled = !variant.inStock;

        return (
          <button
            key={variant.id}
            onClick={() =>
              !isDisabled && handleVariantSelect(group.type, variant)
            }
            disabled={isDisabled}
            className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "border-teal-600 bg-teal-50 text-teal-700"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            } ${
              isDisabled
                ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                : "cursor-pointer"
            }`}
          >
            {variant.displayValue}
            {isDisabled && (
              <span className="ml-1 text-xs text-red-500">(Out of Stock)</span>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderDropdownVariants = (group: VariantGroup) => {
    const selectedVariant = selectedVariants[group.type];

    return (
      <select
        value={selectedVariant?.id || ""}
        onChange={(e) => {
          const variant = group.variants.find((v) => v.id === e.target.value);
          if (variant) {
            handleVariantSelect(group.type, variant);
          }
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      >
        {!selectedVariant && <option value="">Select {group.name}</option>}
        {group.variants.map((variant) => (
          <option
            key={variant.id}
            value={variant.id}
            disabled={!variant.inStock}
          >
            {variant.displayValue}
            {variant.priceModifier !== 0 &&
              ` (${variant.priceModifier > 0 ? "+" : ""}$${Math.abs(
                variant.priceModifier
              )})`}
            {!variant.inStock && ` - Out of Stock`}
          </option>
        ))}
      </select>
    );
  };

  const renderVariantGroup = (group: VariantGroup) => {
    switch (group.type) {
      case "color":
        return renderColorVariants(group);
      case "size":
        return renderSizeVariants(group);
      case "storage":
      case "memory":
      case "style":
        return renderDropdownVariants(group);
      default:
        return renderSizeVariants(group);
    }
  };

  if (variantGroups.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {variantGroups.map((group) => (
        <div key={group.type}>
          {/* Group Label */}
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-900">
              {group.name}
              {group.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Selected Variant Info */}
            {selectedVariants[group.type] && (
              <span className="text-sm text-gray-600">
                {selectedVariants[group.type].displayValue}
                {selectedVariants[group.type].priceModifier !== 0 && (
                  <span className="ml-1 font-medium">
                    ({selectedVariants[group.type].priceModifier > 0 ? "+" : ""}
                    ${Math.abs(selectedVariants[group.type].priceModifier)})
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Variant Options */}
          {renderVariantGroup(group)}

          {/* Stock Info */}
          {selectedVariants[group.type] && (
            <div className="mt-2 text-xs text-gray-500">
              {selectedVariants[group.type].inStock ? (
                selectedVariants[group.type].stockCount <= 5 ? (
                  <span className="text-orange-600">
                    Low Stock ({selectedVariants[group.type].stockCount} left)
                  </span>
                ) : (
                  <span className="text-green-600">In Stock</span>
                )
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
