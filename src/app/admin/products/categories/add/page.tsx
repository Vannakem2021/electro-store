"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, CategoryForm } from "@/components/admin/ui";
import { createCategory } from "@/data/admin-categories";
import { CategoryFormData } from "@/types/admin-category";
import { ArrowLeftIcon } from "@/components/ui";

/**
 * Add Category Page - Create new categories
 */
const AdminAddCategoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: CategoryFormData) => {
    setLoading(true);
    
    try {
      // Create the category using the mock API
      const newCategory = await createCategory(formData);
      
      showSuccess(
        "Category Created",
        `${newCategory.name} has been created successfully.`
      );
      
      // Redirect to the category detail page
      router.push(`/admin/products/categories/${newCategory.id}`);
    } catch (error) {
      console.error("Error creating category:", error);
      showError(
        "Creation Failed",
        "Failed to create category. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/products/categories");
  };

  return (
    <ProtectedRoute resource="products" action="create">
      <AdminLayout
        title="Add New Category"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Categories", href: "/admin/products/categories" },
          { label: "Add Category" },
        ]}
      >
        <div className="space-y-6">
          {/* Back Button */}
          <div>
            <Link
              href="/admin/products/categories"
              className={`inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>
          </div>

          {/* Category Form */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2
                className={`text-lg font-semibold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Create New Category
              </h2>
              <p
                className={`mt-1 text-sm text-gray-600 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Add a new product category to organize your inventory.
              </p>
            </div>

            <CategoryForm
              mode="create"
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminAddCategoryPage;
