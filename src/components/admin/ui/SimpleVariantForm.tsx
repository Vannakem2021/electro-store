"use client";

import React, { useState, useEffect } from "react";

import { SimpleVariant, SimpleVariantOptions } from "@/types";
import FormField from "./FormField";
import { PlusIcon, TrashIcon } from "@/components/ui/Icons";

interface SimpleVariantFormProps {
  categoryId: string;
  variantOptions?: SimpleVariantOptions;
  onChange: (variantOptions: SimpleVariantOptions) => void;
  className?: string;
}

const SimpleVariantForm: React.FC<SimpleVariantFormProps> = ({
  categoryId,
  variantOptions = {},
  onChange,
  className = "",
}) => {
  const [localVariants, setLocalVariants] =
    useState<SimpleVariantOptions>(variantOptions);

  // Update local state when props change
  useEffect(() => {
    setLocalVariants(variantOptions);
  }, [variantOptions]);

  // Determine which variant types to show based on category
  const getVariantTypesForCategory = (
    categoryId: string
  ): Array<keyof SimpleVariantOptions> => {
    switch (categoryId) {
      case "4": // Smart Phone
        return ["storage", "color"];
      case "3": // Laptop
        return ["memory", "storage", "color"];
      case "1": // Accessories (Headphones)
        return ["color"];
      case "6": // Smart Watch
        return ["color"];
      case "2": // Camera
        return ["color"];
      case "5": // Gaming
        return ["color"];
      default:
        return ["color"];
    }
  };

  const variantTypes = getVariantTypesForCategory(categoryId);

  // Add new variant to a type
  const addVariant = (type: keyof SimpleVariantOptions) => {
    const newVariant: SimpleVariant = {
      id: `${type}-${Date.now()}`,
      name: "",
      value: "",
      price: 0,
      stockCount: 0,
      isDefault: false,
    };

    const updatedVariants = {
      ...localVariants,
      [type]: [...(localVariants[type] || []), newVariant],
    };

    setLocalVariants(updatedVariants);
    onChange(updatedVariants);
  };

  // Remove variant
  const removeVariant = (
    type: keyof SimpleVariantOptions,
    variantId: string
  ) => {
    const updatedVariants = {
      ...localVariants,
      [type]: localVariants[type]?.filter((v) => v.id !== variantId) || [],
    };

    setLocalVariants(updatedVariants);
    onChange(updatedVariants);
  };

  // Update variant
  const updateVariant = (
    type: keyof SimpleVariantOptions,
    variantId: string,
    field: keyof SimpleVariant,
    value: any
  ) => {
    const updatedVariants = {
      ...localVariants,
      [type]:
        localVariants[type]?.map((v) =>
          v.id === variantId ? { ...v, [field]: value } : v
        ) || [],
    };

    setLocalVariants(updatedVariants);
    onChange(updatedVariants);
  };

  // Set as default variant
  const setAsDefault = (
    type: keyof SimpleVariantOptions,
    variantId: string
  ) => {
    const updatedVariants = {
      ...localVariants,
      [type]:
        localVariants[type]?.map((v) => ({
          ...v,
          isDefault: v.id === variantId,
        })) || [],
    };

    setLocalVariants(updatedVariants);
    onChange(updatedVariants);
  };

  const getVariantTypeLabel = (type: keyof SimpleVariantOptions): string => {
    switch (type) {
      case "storage":
        return "Storage Options";
      case "color":
        return "Color Options";
      case "memory":
        return "Memory Options";
      default:
        return `${
          String(type).charAt(0).toUpperCase() + String(type).slice(1)
        } Options`;
    }
  };

  const getVariantPlaceholder = (type: keyof SimpleVariantOptions): string => {
    switch (type) {
      case "storage":
        return "e.g., 128GB, 256GB, 512GB";
      case "color":
        return "e.g., Space Black, Silver, Gold";
      case "memory":
        return "e.g., 8GB RAM, 16GB RAM, 32GB RAM";
      default:
        return "Enter variant name";
    }
  };

  if (variantTypes.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product Variants
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Configure different options for this product. Each variant can have
          its own price and stock level.
        </p>
      </div>

      {variantTypes.map((type) => (
        <div key={type} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">
              {getVariantTypeLabel(type)}
            </h4>
            <button
              type="button"
              onClick={() => addVariant(type)}
              className="inline-flex items-center px-3 py-1 border border-teal-600 text-sm font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add {type}
            </button>
          </div>

          <div className="space-y-3">
            {localVariants[type]?.map((variant, index) => (
              <div
                key={variant.id}
                className="grid grid-cols-12 gap-3 items-end"
              >
                <div className="col-span-3">
                  <FormField label={index === 0 ? "Name" : ""}>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) =>
                        updateVariant(type, variant.id, "name", e.target.value)
                      }
                      placeholder={getVariantPlaceholder(type)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </FormField>
                </div>

                <div className="col-span-2">
                  <FormField label={index === 0 ? "Price ($)" : ""}>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(
                          type,
                          variant.id,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </FormField>
                </div>

                <div className="col-span-2">
                  <FormField label={index === 0 ? "Stock" : ""}>
                    <input
                      type="number"
                      min="0"
                      value={variant.stockCount}
                      onChange={(e) =>
                        updateVariant(
                          type,
                          variant.id,
                          "stockCount",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </FormField>
                </div>

                {type === "color" && (
                  <div className="col-span-2">
                    <FormField label={index === 0 ? "Color Code" : ""}>
                      <input
                        type="color"
                        value={variant.colorCode || "#000000"}
                        onChange={(e) =>
                          updateVariant(
                            type,
                            variant.id,
                            "colorCode",
                            e.target.value
                          )
                        }
                        className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </FormField>
                  </div>
                )}

                <div
                  className={`${
                    type === "color" ? "col-span-2" : "col-span-4"
                  } flex items-center space-x-2`}
                >
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`default-${type}`}
                      checked={variant.isDefault}
                      onChange={() => setAsDefault(type, variant.id)}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-1 text-xs text-gray-600">Default</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => removeVariant(type, variant.id)}
                    className="p-1 text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) || (
              <div className="text-center py-4 text-gray-500 text-sm">
                No {type} variants added yet. Click "Add {type}" to get started.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleVariantForm;
