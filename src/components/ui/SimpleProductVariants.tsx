"use client";

import React, { useState, useEffect } from "react";

import { SimpleVariantOptions, SelectedVariants, SimpleVariant } from "@/types";
import {
  getDefaultVariants,
  calculateSimpleVariantPrice,
  calculateSimpleVariantStock,
} from "@/lib/simpleVariants";
import { CheckIcon } from "./Icons";

interface SimpleProductVariantsProps {
  variantOptions: SimpleVariantOptions;
  onVariantChange: (
    selectedVariants: SelectedVariants,
    price: number,
    stock: number
  ) => void;
  className?: string;
}

const SimpleProductVariants: React.FC<SimpleProductVariantsProps> = ({
  variantOptions,
  onVariantChange,
  className = "",
}) => {
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>(
    {}
  );

  // Initialize with default variants
  useEffect(() => {
    const defaults = getDefaultVariants(variantOptions);
    setSelectedVariants(defaults);

    // Calculate initial price and stock
    const price = calculateSimpleVariantPrice({ price: 0 } as any, defaults);
    const stock = calculateSimpleVariantStock(defaults);

    onVariantChange(defaults, price, stock);
  }, [variantOptions, onVariantChange]);

  // Handle variant selection
  const handleVariantSelect = (
    type: keyof SimpleVariantOptions,
    variant: SimpleVariant
  ) => {
    const newSelectedVariants = {
      ...selectedVariants,
      [type]: variant,
    };

    setSelectedVariants(newSelectedVariants);

    // Calculate new price and stock
    const price = calculateSimpleVariantPrice(
      { price: 0 } as any,
      newSelectedVariants
    );
    const stock = calculateSimpleVariantStock(newSelectedVariants);

    onVariantChange(newSelectedVariants, price, stock);
  };

  // Render color variants with color swatches
  const renderColorVariants = (variants: SimpleVariant[]) => (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => {
        const isSelected = selectedVariants.color?.id === variant.id;
        const isDisabled = variant.stockCount === 0;

        return (
          <button
            key={variant.id}
            onClick={() => !isDisabled && handleVariantSelect("color", variant)}
            disabled={isDisabled}
            className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
              isSelected
                ? "border-teal-600 ring-2 ring-teal-200"
                : "border-gray-300 hover:border-gray-400"
            } ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            title={`${variant.name} ${isDisabled ? "(Out of Stock)" : ""}`}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: variant.colorCode || "#ccc" }}
            />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-white drop-shadow-md" />
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

  // Render button-style variants (storage, memory)
  const renderButtonVariants = (variants: SimpleVariant[]) => (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => {
        const isSelected =
          selectedVariants.storage?.id === variant.id ||
          selectedVariants.memory?.id === variant.id;
        const isDisabled = variant.stockCount === 0;

        return (
          <button
            key={variant.id}
            onClick={() => {
              if (!isDisabled) {
                // Determine variant type based on which array this variant belongs to
                const type = variantOptions.storage?.includes(variant)
                  ? "storage"
                  : "memory";
                handleVariantSelect(type, variant);
              }
            }}
            disabled={isDisabled}
            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "border-teal-600 bg-teal-50 text-teal-700"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            } ${
              isDisabled
                ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                : "cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{variant.name}</span>
              {variant.price > 0 && (
                <span className="ml-2 text-xs font-semibold">
                  ${variant.price}
                </span>
              )}
            </div>
            {isDisabled && (
              <div className="text-xs text-red-500 mt-1">Out of Stock</div>
            )}
          </button>
        );
      })}
    </div>
  );

  // Get variant type label
  const getVariantTypeLabel = (type: keyof SimpleVariantOptions): string => {
    switch (type) {
      case "storage":
        return "Storage";
      case "color":
        return "Color";
      case "memory":
        return "Memory";
      default:
        return String(type).charAt(0).toUpperCase() + String(type).slice(1);
    }
  };

  // Check if there are any variants to display
  const hasVariants = Object.values(variantOptions).some(
    (variants) => variants && variants.length > 0
  );

  if (!hasVariants) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Storage Options */}
      {variantOptions.storage && variantOptions.storage.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {getVariantTypeLabel("storage")}
          </h4>
          {renderButtonVariants(variantOptions.storage)}
        </div>
      )}

      {/* Memory Options */}
      {variantOptions.memory && variantOptions.memory.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {getVariantTypeLabel("memory")}
          </h4>
          {renderButtonVariants(variantOptions.memory)}
        </div>
      )}

      {/* Color Options */}
      {variantOptions.color && variantOptions.color.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {getVariantTypeLabel("color")}
          </h4>
          {renderColorVariants(variantOptions.color)}

          {/* Show selected color name */}
          {selectedVariants.color && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {selectedVariants.color.name}
            </p>
          )}
        </div>
      )}

      {/* Variant Summary */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Configuration:</p>
            <p className="text-sm font-medium text-gray-900">
              {Object.values(selectedVariants)
                .filter(Boolean)
                .map((variant) => variant!.name)
                .join(" • ")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              $
              {calculateSimpleVariantPrice(
                { price: 0 } as any,
                selectedVariants
              )}
            </p>
            <p className="text-sm text-gray-600">
              {calculateSimpleVariantStock(selectedVariants)} in stock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProductVariants;
