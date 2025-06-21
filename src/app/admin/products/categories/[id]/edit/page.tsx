"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, CategoryForm } from "@/components/admin/ui";
import { getAdminCategoryById, updateCategory } from "@/data/admin-categories";
import { AdminCategory, CategoryFormData } from "@/types/admin-category";
import { ArrowLeftIcon } from "@/components/ui";

/**
 * Edit Category Page - Edit existing categories
 */
const AdminEditCategoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [category, setCategory] = useState<AdminCategory | null>(null);

  // Get category ID from params
  const categoryId = params?.id as string;

  // Load category data
  useEffect(() => {
    if (!categoryId) return;

    const loadCategory = async () => {
      setPageLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const fetchedCategory = getAdminCategoryById(categoryId);
      if (!fetchedCategory) {
        notFound();
      }
      
      setCategory(fetchedCategory);
      setPageLoading(false);
    };

    loadCategory();
  }, [categoryId]);

  const handleSubmit = async (formData: CategoryFormData) => {
    if (!category) return;
    
    setLoading(true);
    
    try {
      // Update the category using the mock API
      const updatedCategory = await updateCategory(category.id, formData);
      
      showSuccess(
        "Category Updated",
        `${updatedCategory.name} has been updated successfully.`
      );
      
      // Redirect to the category detail page
      router.push(`/admin/products/categories/${updatedCategory.id}`);
    } catch (error) {
      console.error("Error updating category:", error);
      showError(
        "Update Failed",
        "Failed to update category. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/products/categories/${categoryId}`);
  };

  if (pageLoading) {
    return (
      <ProtectedRoute resource="products" action="update">
        <AdminLayout>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-rubik">Loading category...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!category) {
    notFound();
  }

  return (
    <ProtectedRoute resource="products" action="update">
      <AdminLayout
        title={`Edit ${category.name}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Categories", href: "/admin/products/categories" },
          { label: category.name, href: `/admin/products/categories/${category.id}` },
          { label: "Edit" },
        ]}
      >
        <div className="space-y-6">
          {/* Back Button */}
          <div>
            <Link
              href={`/admin/products/categories/${category.id}`}
              className={`inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Category
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
                Edit Category
              </h2>
              <p
                className={`mt-1 text-sm text-gray-600 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Update the category information and settings.
              </p>
            </div>

            <CategoryForm
              mode="edit"
              category={category}
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

export default AdminEditCategoryPage;
