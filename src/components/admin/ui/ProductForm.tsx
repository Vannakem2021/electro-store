"use client";

import React, { useState, useEffect } from "react";

import { useToast } from "@/contexts/ToastContext";
import { categories } from "@/data";
import { AdminProduct, ProductFormData } from "@/types/admin-product";
import { SimpleVariantOptions } from "@/types";
import { FormField, ImageUpload } from "./";
import SimpleVariantForm from "./SimpleVariantForm";
import SpecificationsForm from "./SpecificationsForm";
import { SaveIcon, Loader2Icon } from "@/components/ui/Icons";

interface ProductFormProps {
  product?: AdminProduct;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  mode: "create" | "edit";
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  loading = false,
  mode,
}) => {
  const { showError } = useToast();

  // Form state (simplified)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    sku: "",
    price: 0,
    comparePrice: 0,
    trackInventory: true,
    stockCount: 0,
    lowStockThreshold: 10,
    allowBackorder: false,
    categoryId: "",
    brand: "",
    tags: [],
    image: "",
    images: [],
    isActive: true,
    isVisible: true,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    variantOptions: {},
    specifications: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when product changes (simplified)
  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        name: product.name,
        description: product.description,
        sku: product.sku || "",
        price: product.price,
        comparePrice: product.comparePrice || 0,
        trackInventory: product.trackInventory ?? true,
        stockCount: product.stockCount,
        lowStockThreshold: product.lowStockThreshold || 10,
        allowBackorder: product.allowBackorder ?? false,
        categoryId: product.categoryId,
        brand: product.brand,
        tags: product.tags || [],
        image: product.image,
        images: product.images || [product.image],
        isActive: product.isActive ?? true,
        isVisible: product.isVisible ?? true,
        isFeatured: product.isFeatured ?? false,
        isBestSeller: product.isBestSeller ?? false,
        isNew: product.isNew ?? false,
        variantOptions: product.variantOptions || {},
        specifications: product.specifications || {},
      });
    }
  }, [product, mode]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    if (formData.trackInventory && formData.stockCount < 0) {
      newErrors.stockCount = "Stock count cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showError(
        "Validation Error",
        "Please fix the errors below and try again."
      );
      return;
    }

    try {
      // Set primary image from images array
      const updatedFormData = {
        ...formData,
        image: formData.images[0] || "",
      };

      await onSubmit(updatedFormData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle array inputs (tags)
  const handleArrayInput = (field: "tags", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    handleInputChange(field, items);
  };

  // Simplified form - no tabs needed

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Simplified Single Form */}
      <div className="space-y-8">
        {/* Basic Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Product Name" required error={errors.name}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter product name"
              />
            </FormField>

            <FormField label="Brand" required error={errors.brand}>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter brand name"
              />
            </FormField>

            <FormField
              label="Category"
              required
              error={errors.categoryId}
              className="lg:col-span-2"
            >
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  handleInputChange("categoryId", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Description"
              required
              error={errors.description}
              className="lg:col-span-2"
            >
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter product description"
              />
            </FormField>

            <FormField label="SKU" helpText="Stock Keeping Unit (optional)">
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter SKU"
              />
            </FormField>

            <FormField label="Tags" helpText="Separate tags with commas">
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) => handleArrayInput("tags", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="e.g., electronics, smartphone, apple"
              />
            </FormField>
          </div>
        </div>

        {/* Pricing & Inventory Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Pricing & Inventory
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Price" required error={errors.price}>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500-accessible">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  placeholder="0.00"
                />
              </div>
            </FormField>

            <FormField
              label="Compare at Price"
              helpText="Original price for discount display"
            >
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500-accessible">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.comparePrice}
                  onChange={(e) =>
                    handleInputChange(
                      "comparePrice",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  placeholder="0.00"
                />
              </div>
            </FormField>

            <div className="lg:col-span-2">
              <FormField label="Track Inventory">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.trackInventory}
                    onChange={(e) =>
                      handleInputChange("trackInventory", e.target.checked)
                    }
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700-accessible">
                    Track quantity for this product
                  </span>
                </label>
              </FormField>
            </div>

            {formData.trackInventory && (
              <>
                <FormField label="Stock Count" error={errors.stockCount}>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockCount}
                    onChange={(e) =>
                      handleInputChange(
                        "stockCount",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    placeholder="0"
                  />
                </FormField>

                <FormField
                  label="Low Stock Threshold"
                  helpText="Alert when stock falls below this number"
                >
                  <input
                    type="number"
                    min="0"
                    value={formData.lowStockThreshold}
                    onChange={(e) =>
                      handleInputChange(
                        "lowStockThreshold",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    placeholder="10"
                  />
                </FormField>

                <div className="lg:col-span-2">
                  <FormField label="Allow Backorders">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.allowBackorder}
                        onChange={(e) =>
                          handleInputChange("allowBackorder", e.target.checked)
                        }
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-gray-700-accessible">
                        Allow customers to purchase when out of stock
                      </span>
                    </label>
                  </FormField>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Images Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Product Images
          </h3>
          <FormField
            label="Product Images"
            required
            error={errors.images}
            helpText="First image will be used as the primary image"
          >
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange("images", images)}
              maxImages={10}
              maxFileSize={5}
            />
          </FormField>
        </div>

        {/* Product Variants Section */}
        {formData.categoryId && (
          <SimpleVariantForm
            categoryId={formData.categoryId}
            variantOptions={formData.variantOptions}
            onChange={(variantOptions) =>
              handleInputChange("variantOptions", variantOptions)
            }
          />
        )}

        {/* Product Specifications Section */}
        <SpecificationsForm
          specifications={formData.specifications}
          onChange={(specifications) =>
            handleInputChange("specifications", specifications)
          }
        />

        {/* Product Status & Features Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Product Status & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField label="Active">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700-accessible">
                  Product is active
                </span>
              </label>
            </FormField>

            <FormField label="Visible">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) =>
                    handleInputChange("isVisible", e.target.checked)
                  }
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700-accessible">
                  Visible in store
                </span>
              </label>
            </FormField>

            <FormField label="Featured">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    handleInputChange("isFeatured", e.target.checked)
                  }
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700-accessible">
                  Featured product
                </span>
              </label>
            </FormField>

            <FormField label="Best Seller">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) =>
                    handleInputChange("isBestSeller", e.target.checked)
                  }
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700-accessible">
                  Best seller badge
                </span>
              </label>
            </FormField>

            <FormField label="New Product">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => handleInputChange("isNew", e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700-accessible">
                  New product badge
                </span>
              </label>
            </FormField>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus-accessible transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              {mode === "create" ? "Creating..." : "Updating..."}
            </>
          ) : (
            <>
              <SaveIcon className="w-4 h-4 mr-2" />
              {mode === "create" ? "Create Product" : "Update Product"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
