"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { categories } from "@/data";
import { AdminProduct, ProductFormData } from "@/types/admin-product";
import { FormField, ImageUpload } from "./";
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
  const { isKhmer } = useLanguage();
  const { showError } = useToast();

  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    sku: "",
    price: 0,
    comparePrice: 0,
    costPrice: 0,
    trackInventory: true,
    stockCount: 0,
    lowStockThreshold: 10,
    allowBackorder: false,
    categoryId: "",
    brand: "",
    vendor: "",
    tags: [],
    image: "",
    images: [],
    requiresShipping: true,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      unit: "cm",
    },
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],
    isActive: true,
    isVisible: true,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    variants: [],
    specifications: {},
    taxable: true,
    barcode: "",
    hsCode: "",
    countryOfOrigin: "",
    metafields: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form data when product changes
  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        name: product.name,
        description: product.description,
        sku: product.sku || "",
        price: product.price,
        comparePrice: product.comparePrice || 0,
        costPrice: product.costPrice || 0,
        trackInventory: product.trackInventory ?? true,
        stockCount: product.stockCount,
        lowStockThreshold: product.lowStockThreshold || 10,
        allowBackorder: product.allowBackorder ?? false,
        categoryId: product.categoryId,
        brand: product.brand,
        vendor: product.vendor || "",
        tags: product.tags || [],
        image: product.image,
        images: product.images || [product.image],
        requiresShipping: product.requiresShipping ?? true,
        weight: product.weight || 0,
        dimensions: product.dimensions || {
          length: 0,
          width: 0,
          height: 0,
          unit: "cm",
        },
        seoTitle: product.seoTitle || "",
        seoDescription: product.seoDescription || "",
        seoKeywords: product.seoKeywords || [],
        isActive: product.isActive ?? true,
        isVisible: product.isVisible ?? true,
        isFeatured: product.isFeatured ?? false,
        isBestSeller: product.isBestSeller ?? false,
        isNew: product.isNew ?? false,
        variants: product.variants || [],
        specifications: product.specifications || {},
        taxable: product.taxable ?? true,
        barcode: product.barcode || "",
        hsCode: product.hsCode || "",
        countryOfOrigin: product.countryOfOrigin || "",
        metafields: product.metafields || {},
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

  // Handle array inputs (tags, keywords)
  const handleArrayInput = (field: "tags" | "seoKeywords", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    handleInputChange(field, items);
  };

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "pricing", label: "Pricing & Inventory" },
    { id: "media", label: "Images" },
    { id: "shipping", label: "Shipping & Dimensions" },
    { id: "seo", label: "SEO & Metadata" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500-accessible hover:text-gray-700-accessible hover:border-gray-300"
              } ${isKhmer ? "font-khmer" : "font-rubik"}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
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

            <FormField label="SKU" error={errors.sku}>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter SKU (optional)"
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

            <FormField label="Brand" required error={errors.brand}>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter brand name"
              />
            </FormField>

            <FormField label="Vendor" error={errors.vendor}>
              <input
                type="text"
                value={formData.vendor}
                onChange={(e) => handleInputChange("vendor", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter vendor name"
              />
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

            <FormField
              label="Tags"
              helpText="Separate tags with commas"
              className="lg:col-span-2"
            >
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) => handleArrayInput("tags", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="e.g., electronics, smartphone, apple"
              />
            </FormField>
          </div>
        )}

        {/* Pricing & Inventory Tab */}
        {activeTab === "pricing" && (
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

            <FormField label="Cost Price" helpText="Your cost for this product">
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500-accessible">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.costPrice}
                  onChange={(e) =>
                    handleInputChange(
                      "costPrice",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  placeholder="0.00"
                />
              </div>
            </FormField>

            <FormField label="Barcode" helpText="Product barcode/UPC">
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter barcode"
              />
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
                  <span
                    className={`ml-2 text-sm text-gray-700-accessible ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
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
                      <span
                        className={`ml-2 text-sm text-gray-700-accessible ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Allow customers to purchase when out of stock
                      </span>
                    </label>
                  </FormField>
                </div>
              </>
            )}
          </div>
        )}

        {/* Media Tab */}
        {activeTab === "media" && (
          <div className="space-y-6">
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
        )}

        {/* Shipping & Dimensions Tab */}
        {activeTab === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <FormField label="Requires Shipping">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.requiresShipping}
                    onChange={(e) =>
                      handleInputChange("requiresShipping", e.target.checked)
                    }
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span
                    className={`ml-2 text-sm text-gray-700-accessible ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    This product requires shipping
                  </span>
                </label>
              </FormField>
            </div>

            {formData.requiresShipping && (
              <>
                <FormField
                  label="Weight"
                  helpText="Product weight for shipping calculations"
                >
                  <div className="flex">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange(
                          "weight",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="0.00"
                    />
                    <span className="inline-flex items-center px-3 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500-accessible text-sm">
                      kg
                    </span>
                  </div>
                </FormField>

                <FormField label="Country of Origin">
                  <input
                    type="text"
                    value={formData.countryOfOrigin}
                    onChange={(e) =>
                      handleInputChange("countryOfOrigin", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    placeholder="e.g., China, USA, Germany"
                  />
                </FormField>

                <div className="lg:col-span-2">
                  <FormField
                    label="Dimensions"
                    helpText="Package dimensions for shipping"
                  >
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500-accessible mb-1">
                          Length
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.dimensions?.length || 0}
                          onChange={(e) =>
                            handleInputChange("dimensions", {
                              ...formData.dimensions,
                              length: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500-accessible mb-1">
                          Width
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.dimensions?.width || 0}
                          onChange={(e) =>
                            handleInputChange("dimensions", {
                              ...formData.dimensions,
                              width: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500-accessible mb-1">
                          Height
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.dimensions?.height || 0}
                          onChange={(e) =>
                            handleInputChange("dimensions", {
                              ...formData.dimensions,
                              height: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500-accessible mb-1">
                          Unit
                        </label>
                        <select
                          value={formData.dimensions?.unit || "cm"}
                          onChange={(e) =>
                            handleInputChange("dimensions", {
                              ...formData.dimensions,
                              unit: e.target.value as "cm" | "in",
                            })
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        >
                          <option value="cm">cm</option>
                          <option value="in">in</option>
                        </select>
                      </div>
                    </div>
                  </FormField>
                </div>

                <FormField
                  label="HS Code"
                  helpText="Harmonized System code for customs"
                >
                  <input
                    type="text"
                    value={formData.hsCode}
                    onChange={(e) =>
                      handleInputChange("hsCode", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    placeholder="e.g., 8517.12.00"
                  />
                </FormField>
              </>
            )}
          </div>
        )}

        {/* SEO & Metadata Tab */}
        {activeTab === "seo" && (
          <div className="grid grid-cols-1 gap-6">
            <FormField
              label="SEO Title"
              helpText="Title that appears in search engines (recommended: 50-60 characters)"
            >
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter SEO title"
                maxLength={60}
              />
              <div className="text-xs text-gray-500-accessible mt-1">
                {formData.seoTitle.length}/60 characters
              </div>
            </FormField>

            <FormField
              label="SEO Description"
              helpText="Description that appears in search engines (recommended: 150-160 characters)"
            >
              <textarea
                value={formData.seoDescription}
                onChange={(e) =>
                  handleInputChange("seoDescription", e.target.value)
                }
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter SEO description"
                maxLength={160}
              />
              <div className="text-xs text-gray-500-accessible mt-1">
                {formData.seoDescription.length}/160 characters
              </div>
            </FormField>

            <FormField
              label="SEO Keywords"
              helpText="Separate keywords with commas"
            >
              <input
                type="text"
                value={formData.seoKeywords.join(", ")}
                onChange={(e) =>
                  handleArrayInput("seoKeywords", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="e.g., smartphone, electronics, mobile phone"
              />
            </FormField>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === "advanced" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <h3
                className={`text-lg font-semibold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Product Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <span
                      className={`ml-2 text-sm text-gray-700-accessible ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
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
                    <span
                      className={`ml-2 text-sm text-gray-700-accessible ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Visible in store
                    </span>
                  </label>
                </FormField>

                <FormField label="Taxable">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.taxable}
                      onChange={(e) =>
                        handleInputChange("taxable", e.target.checked)
                      }
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span
                      className={`ml-2 text-sm text-gray-700-accessible ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Charge tax on this product
                    </span>
                  </label>
                </FormField>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3
                className={`text-lg font-semibold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Product Badges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <span
                      className={`ml-2 text-sm text-gray-700-accessible ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
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
                    <span
                      className={`ml-2 text-sm text-gray-700-accessible ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Best seller badge
                    </span>
                  </label>
                </FormField>

                <FormField label="New Product">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) =>
                        handleInputChange("isNew", e.target.checked)
                      }
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span
                      className={`ml-2 text-sm text-gray-700-accessible ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      New product badge
                    </span>
                  </label>
                </FormField>
              </div>
            </div>

            <div className="lg:col-span-2">
              <FormField
                label="Product Specifications"
                helpText="Add technical specifications as key-value pairs"
              >
                <div className="space-y-3">
                  {Object.entries(formData.specifications).map(
                    ([key, value], index) => (
                      <div key={index} className="flex space-x-3">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            const newSpecs = { ...formData.specifications };
                            delete newSpecs[key];
                            newSpecs[e.target.value] = value;
                            handleInputChange("specifications", newSpecs);
                          }}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Specification name"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newSpecs = { ...formData.specifications };
                            newSpecs[key] = e.target.value;
                            handleInputChange("specifications", newSpecs);
                          }}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Specification value"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSpecs = { ...formData.specifications };
                            delete newSpecs[key];
                            handleInputChange("specifications", newSpecs);
                          }}
                          className="px-3 py-2 border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const newSpecs = { ...formData.specifications };
                      newSpecs[`spec_${Date.now()}`] = "";
                      handleInputChange("specifications", newSpecs);
                    }}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    + Add Specification
                  </button>
                </div>
              </FormField>
            </div>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200 disabled:opacity-50 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus-accessible transition-colors duration-200 disabled:opacity-50 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
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
