"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import {
  AdminCategory,
  CategoryFormData,
  CategoryValidationErrors,
} from "@/types/admin-category";
import {
  getAdminCategories,
  validateCategory,
  generateSlug,
} from "@/data/admin-categories";
import { FormField, ImageUpload } from "./";
import { SaveIcon, Loader2Icon } from "@/components/ui/Icons";

interface CategoryFormProps {
  category?: AdminCategory;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  mode: "create" | "edit";
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  loading = false,
  mode,
}) => {
  const { isKhmer } = useLanguage();
  const { showError } = useToast();

  // Form state
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    image: "",
    icon: "",
    slug: "",
    isActive: true,
    sortOrder: 0,
    parentId: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],
    showInNavigation: true,
    featuredOrder: 0,
    bannerImage: "",
    iconColor: "#0d9488",
    metafields: {},
  });

  const [errors, setErrors] = useState<CategoryValidationErrors>({});
  const [activeTab, setActiveTab] = useState("basic");
  const [availableCategories, setAvailableCategories] = useState<
    AdminCategory[]
  >([]);

  // Initialize form data when category changes
  useEffect(() => {
    if (category && mode === "edit") {
      setFormData({
        name: category.name,
        description: category.description,
        image: category.image,
        icon: category.icon || "",
        slug: category.slug,
        isActive: category.isActive,
        sortOrder: category.sortOrder,
        parentId: category.parentId || "",
        seoTitle: category.seoTitle || "",
        seoDescription: category.seoDescription || "",
        seoKeywords: category.seoKeywords || [],
        showInNavigation: category.showInNavigation ?? true,
        featuredOrder: category.featuredOrder || 0,
        bannerImage: category.bannerImage || "",
        iconColor: category.iconColor || "#0d9488",
        metafields: category.metafields || {},
      });
    }
  }, [category, mode]);

  // Load available parent categories
  useEffect(() => {
    const categories = getAdminCategories().filter(
      (c) =>
        c.id !== category?.id && // Exclude self
        c.parentId !== category?.id // Exclude children to prevent circular reference
    );
    setAvailableCategories(categories);
  }, [category]);

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && mode === "create") {
      const slug = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, mode]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors = validateCategory(formData);
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
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof CategoryValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle array inputs (keywords)
  const handleArrayInput = (field: "seoKeywords", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    handleInputChange(field, items);
  };

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "display", label: "Display Settings" },
    { id: "seo", label: "SEO & Metadata" },
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
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus-accessible ${
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
            <FormField label="Category Name" required error={errors.name}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter category name"
              />
            </FormField>

            <FormField
              label="Slug"
              required
              error={errors.slug}
              helpText="URL-friendly version of the name"
            >
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="category-slug"
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
                placeholder="Enter category description"
              />
            </FormField>

            <FormField
              label="Parent Category"
              helpText="Leave empty for top-level category"
            >
              <select
                value={formData.parentId}
                onChange={(e) => handleInputChange("parentId", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
              >
                <option value="">No parent (top-level)</option>
                {availableCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Sort Order" helpText="Lower numbers appear first">
              <input
                type="number"
                min="0"
                value={formData.sortOrder}
                onChange={(e) =>
                  handleInputChange("sortOrder", parseInt(e.target.value) || 0)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="0"
              />
            </FormField>

            <FormField
              label="Category Image"
              required
              error={errors.image}
              className="lg:col-span-2"
            >
              <ImageUpload
                images={formData.image ? [formData.image] : []}
                onImagesChange={(images) =>
                  handleInputChange("image", images[0] || "")
                }
                maxImages={1}
                maxFileSize={5}
              />
            </FormField>

            <div className="lg:col-span-2">
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
                    Category is active and visible
                  </span>
                </label>
              </FormField>
            </div>
          </div>
        )}

        {/* Display Settings Tab */}
        {activeTab === "display" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Show in Navigation">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showInNavigation}
                  onChange={(e) =>
                    handleInputChange("showInNavigation", e.target.checked)
                  }
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span
                  className={`ml-2 text-sm text-gray-700-accessible ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Display in main navigation menu
                </span>
              </label>
            </FormField>

            <FormField
              label="Featured Order"
              helpText="Order in featured categories (0 = not featured)"
            >
              <input
                type="number"
                min="0"
                value={formData.featuredOrder}
                onChange={(e) =>
                  handleInputChange(
                    "featuredOrder",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="0"
              />
            </FormField>

            <FormField label="Icon" helpText="CSS class or icon name">
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => handleInputChange("icon", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="e.g., package, smartphone, laptop"
              />
            </FormField>

            <FormField
              label="Icon Color"
              helpText="Hex color code for the icon"
            >
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={formData.iconColor}
                  onChange={(e) =>
                    handleInputChange("iconColor", e.target.value)
                  }
                  className="w-12 h-10 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={formData.iconColor}
                  onChange={(e) =>
                    handleInputChange("iconColor", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  placeholder="#0d9488"
                />
              </div>
            </FormField>

            <FormField
              label="Banner Image"
              helpText="Large banner image for category pages"
              className="lg:col-span-2"
            >
              <ImageUpload
                images={formData.bannerImage ? [formData.bannerImage] : []}
                onImagesChange={(images) =>
                  handleInputChange("bannerImage", images[0] || "")
                }
                maxImages={1}
                maxFileSize={10}
              />
            </FormField>
          </div>
        )}

        {/* SEO & Metadata Tab */}
        {activeTab === "seo" && (
          <div className="grid grid-cols-1 gap-6">
            <FormField
              label="SEO Title"
              error={errors.seoTitle}
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
                {(formData.seoTitle || "").length}/60 characters
              </div>
            </FormField>

            <FormField
              label="SEO Description"
              error={errors.seoDescription}
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
                {(formData.seoDescription || "").length}/160 characters
              </div>
            </FormField>

            <FormField
              label="SEO Keywords"
              helpText="Separate keywords with commas"
            >
              <input
                type="text"
                value={formData.seoKeywords?.join(", ") || ""}
                onChange={(e) =>
                  handleArrayInput("seoKeywords", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="e.g., electronics, smartphones, accessories"
              />
            </FormField>
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
              {mode === "create" ? "Create Category" : "Update Category"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
