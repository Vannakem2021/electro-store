"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { usePermissions } from "@/hooks/usePermissions";
import { AdminLayout } from "@/components/admin/layout";
import {
  PermissionGate,
  ProtectedRoute,
  StatusBadge,
  ConfirmationModal,
} from "@/components/admin/ui";
import { getAdminCategoryById, deleteCategory } from "@/data/admin-categories";
import { getProductsByCategory } from "@/data";
import { AdminCategory } from "@/types/admin-category";
import { Product } from "@/types/product";
import {
  EditIcon,
  TrashIcon,
  ArrowLeftIcon,
  FolderIcon,
  ImageIcon,
  ExternalLinkIcon,
  PackageIcon,
  EyeIcon,
  TagIcon,
} from "@/components/ui/Icons";

/**
 * Admin Category Detail Page - View and manage individual categories
 */
const AdminCategoryDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { products } = usePermissions();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<AdminCategory | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    loading: false,
  });

  const params = useParams();

  // Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved as { id: string });
    };
    resolveParams();
  }, [params]);

  // Load category data
  useEffect(() => {
    if (!resolvedParams?.id) return;

    const loadCategory = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fetchedCategory = getAdminCategoryById(resolvedParams.id);
      if (!fetchedCategory) {
        notFound();
      }

      setCategory(fetchedCategory);

      // Load products in this category
      const products = getProductsByCategory(resolvedParams.id);
      setCategoryProducts(products);

      setLoading(false);
    };

    loadCategory();
  }, [resolvedParams]);

  const handleDeleteCategory = () => {
    setDeleteModal({
      isOpen: true,
      loading: false,
    });
  };

  const confirmDeleteCategory = async () => {
    if (!category) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      await deleteCategory(category.id);

      showSuccess(
        "Category Deleted",
        `${category.name} has been deleted successfully.`
      );

      // Redirect to categories list
      window.location.href = "/admin/products/categories";
    } catch (error: any) {
      console.error("Error deleting category:", error);
      showError(
        "Delete Failed",
        error.message || "Failed to delete category. Please try again."
      );
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const closeDeleteModal = () => {
    if (deleteModal.loading) return;
    setDeleteModal({
      isOpen: false,
      loading: false,
    });
  };

  if (loading) {
    return (
      <ProtectedRoute resource="products" action="read">
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
    <ProtectedRoute resource="products" action="read">
      <AdminLayout
        title={category.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Categories", href: "/admin/products/categories" },
          { label: category.name },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
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

            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Link
                href={`/categories/${category.id}`}
                target="_blank"
                className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                View in Store
              </Link>

              <PermissionGate resource="products" action="update">
                <Link
                  href={`/admin/products/categories/${category.id}/edit`}
                  className={`inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Category
                </Link>
              </PermissionGate>

              <PermissionGate resource="products" action="delete">
                <button
                  onClick={handleDeleteCategory}
                  className={`inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </PermissionGate>
            </div>
          </div>

          {/* Category Overview */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start space-x-6">
                {/* Category Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FolderIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Category Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1
                      className={`text-2xl font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {category.name}
                    </h1>
                    <StatusBadge
                      status={category.isActive ? "active" : "inactive"}
                      variant={category.isActive ? "success" : "secondary"}
                    />
                  </div>

                  <p
                    className={`text-gray-600 mb-4 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {category.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Slug</p>
                      <p className="text-sm text-gray-900 font-mono">
                        {category.slug}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Sort Order
                      </p>
                      <p className="text-sm text-gray-900">
                        {category.sortOrder}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Products
                      </p>
                      <p className="text-sm text-gray-900">
                        {category.totalProducts || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Navigation
                      </p>
                      <p className="text-sm text-gray-900">
                        {category.showInNavigation ? "Visible" : "Hidden"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            {(category.seoTitle ||
              category.seoDescription ||
              category.seoKeywords?.length) && (
              <div className="border-t border-gray-200 px-6 py-4">
                <h3
                  className={`text-lg font-semibold text-gray-900 mb-3 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  SEO Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.seoTitle && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        SEO Title
                      </p>
                      <p className="text-sm text-gray-900">
                        {category.seoTitle}
                      </p>
                    </div>
                  )}
                  {category.seoDescription && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        SEO Description
                      </p>
                      <p className="text-sm text-gray-900">
                        {category.seoDescription}
                      </p>
                    </div>
                  )}
                  {category.seoKeywords?.length && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        SEO Keywords
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.seoKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <TagIcon className="w-3 h-3 mr-1" />
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Products in Category */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-lg font-semibold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Products in this Category ({categoryProducts.length})
                </h3>
                <PermissionGate resource="products" action="create">
                  <Link
                    href={`/admin/products/add?category=${category.id}`}
                    className={`inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    <PackageIcon className="w-4 h-4 mr-2" />
                    Add Product
                  </Link>
                </PermissionGate>
              </div>
            </div>

            <div className="p-6">
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ${product.price}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="text-xs text-teal-600 hover:text-teal-700"
                            >
                              <EyeIcon className="w-3 h-3 inline mr-1" />
                              View
                            </Link>
                            <PermissionGate resource="products" action="update">
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="text-xs text-blue-600 hover:text-blue-700"
                              >
                                <EditIcon className="w-3 h-3 inline mr-1" />
                                Edit
                              </Link>
                            </PermissionGate>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PackageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3
                    className={`text-lg font-medium text-gray-900 mb-2 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    No Products Yet
                  </h3>
                  <p
                    className={`text-gray-600 mb-4 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    This category doesn't have any products assigned to it yet.
                  </p>
                  <PermissionGate resource="products" action="create">
                    <Link
                      href={`/admin/products/add?category=${category.id}`}
                      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      <PackageIcon className="w-4 h-4 mr-2" />
                      Add First Product
                    </Link>
                  </PermissionGate>
                </div>
              )}

              {categoryProducts.length > 6 && (
                <div className="mt-6 text-center">
                  <Link
                    href={`/admin/products?category=${category.id}`}
                    className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    View All {categoryProducts.length} Products
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteCategory}
          title="Delete Category"
          message={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
          confirmText="Delete Category"
          cancelText="Cancel"
          type="danger"
          loading={deleteModal.loading}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminCategoryDetailPage;
