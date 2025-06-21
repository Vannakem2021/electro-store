"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { usePermissions } from "@/hooks/usePermissions";
import { AdminLayout } from "@/components/admin/layout";
import {
  PermissionGate,
  ProtectedRoute,
  DataTable,
  StatusBadge,
  ConfirmationModal,
} from "@/components/admin/ui";
import {
  getAdminCategories,
  filterCategories,
  sortCategories,
  getCategoryStats,
  deleteCategory,
} from "@/data/admin-categories";
import {
  AdminCategory,
  CategoryFilters,
  CategorySortOptions,
} from "@/types/admin-category";
import { TableColumn } from "@/types/table";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  FolderIcon,
  ImageIcon,
} from "@/components/ui";

/**
 * Admin Categories Page - Manage product categories
 */
const AdminCategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { products } = usePermissions();

  // State
  const [categoriesData, setCategoriesData] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<AdminCategory[]>(
    []
  );
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    category: AdminCategory | null;
    loading: boolean;
  }>({
    isOpen: false,
    category: null,
    loading: false,
  });

  // Filters and sorting
  const [filters, setFilters] = useState<CategoryFilters>({
    search: "",
    isActive: undefined,
    parentId: undefined,
    showInNavigation: undefined,
    hasProducts: undefined,
  });

  const [sortOptions, setSortOptions] = useState<CategorySortOptions>({
    field: "sortOrder",
    direction: "asc",
  });

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const categories = getAdminCategories();
      setCategoriesData(categories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  // Filter and sort categories
  const processedCategories = useMemo(() => {
    let filtered = filterCategories(categoriesData, filters);
    return sortCategories(filtered, sortOptions);
  }, [categoriesData, filters, sortOptions]);

  // Get category statistics
  const stats = useMemo(() => getCategoryStats(), [categoriesData]);

  // Handle filter changes
  const handleFilterChange = (key: keyof CategoryFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle sorting
  const handleSort = (sortOptions: CategorySortOptions) => {
    setSortOptions(sortOptions);
  };

  // Handle delete category
  const handleDeleteCategory = (category: AdminCategory) => {
    setDeleteModal({
      isOpen: true,
      category,
      loading: false,
    });
  };

  const confirmDeleteCategory = async () => {
    if (!deleteModal.category) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      await deleteCategory(deleteModal.category.id);

      showSuccess(
        "Category Deleted",
        `${deleteModal.category.name} has been deleted successfully.`
      );

      // Refresh the categories list
      setCategoriesData((prev) =>
        prev.filter((c) => c.id !== deleteModal.category!.id)
      );

      // Close modal
      setDeleteModal({
        isOpen: false,
        category: null,
        loading: false,
      });
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
      category: null,
      loading: false,
    });
  };

  // Table columns
  const columns: TableColumn<AdminCategory>[] = [
    {
      key: "image",
      label: "Image",
      width: "w-16",
      render: (value, category) => (
        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-400-accessible" />
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Category",
      sortable: true,
      render: (value, category) => (
        <div>
          <Link
            href={`/admin/products/categories/${category.id}`}
            className="font-medium text-gray-900 hover:text-teal-600 transition-colors duration-200 focus-accessible"
          >
            {category.name}
          </Link>
          <p className="text-sm text-gray-500-accessible">{category.slug}</p>
          {category.parentId && (
            <p className="text-xs text-gray-400-accessible">
              Parent:{" "}
              {categoriesData.find((c) => c.id === category.parentId)?.name}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (value) => (
        <span className="text-sm text-gray-600-accessible line-clamp-2">
          {value}
        </span>
      ),
    },
    {
      key: "totalProducts",
      label: "Products",
      sortable: true,
      align: "center",
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {value || 0}
        </span>
      ),
    },
    {
      key: "sortOrder",
      label: "Order",
      sortable: true,
      align: "center",
      render: (value) => (
        <span className="text-sm text-gray-600-accessible">{value}</span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      sortable: true,
      align: "center",
      render: (value) => (
        <StatusBadge
          status={value ? "active" : "inactive"}
          variant={value ? "success" : "secondary"}
        />
      ),
    },
    {
      key: "showInNavigation",
      label: "Navigation",
      align: "center",
      render: (value) => (
        <span
          className={`text-xs ${
            value ? "text-green-700-accessible" : "text-gray-400-accessible"
          }`}
        >
          {value ? "Visible" : "Hidden"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (value, category) => (
        <div className="flex items-center justify-center space-x-2">
          <Link
            href={`/admin/products/categories/${category.id}`}
            className="text-gray-400-accessible hover:text-teal-600 transition-colors duration-200 focus-accessible"
            title="View Category"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <PermissionGate resource="products" action="update">
            <Link
              href={`/admin/products/categories/${category.id}/edit`}
              className="text-gray-400-accessible hover:text-blue-600 transition-colors duration-200 focus-accessible"
              title="Edit Category"
            >
              <EditIcon className="w-4 h-4" />
            </Link>
          </PermissionGate>
          <PermissionGate resource="products" action="delete">
            <button
              onClick={() => handleDeleteCategory(category)}
              className="text-gray-400-accessible hover:text-red-600 transition-colors duration-200 focus-accessible"
              title="Delete Category"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </PermissionGate>
        </div>
      ),
    },
  ];

  return (
    <ProtectedRoute resource="products" action="read">
      <AdminLayout
        title="Categories"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Categories" },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1
                className={`text-2xl font-bold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Categories
              </h1>
              <p
                className={`mt-1 text-sm text-gray-600-accessible ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Manage product categories and organization
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <PermissionGate resource="products" action="create">
                <Link
                  href="/admin/products/categories/add"
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus-accessible transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Category
                </Link>
              </PermissionGate>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FolderIcon className="w-8 h-8 text-teal-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Total Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalCategories}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Active
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.activeCategories}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">#</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    With Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.categoriesWithProducts}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">Ø</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Avg Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.averageProductsPerCategory}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400-accessible" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1">
                      Status
                    </label>
                    <select
                      value={
                        filters.isActive === undefined
                          ? ""
                          : filters.isActive.toString()
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          "isActive",
                          e.target.value === ""
                            ? undefined
                            : e.target.value === "true"
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    >
                      <option value="">All</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1">
                      Navigation
                    </label>
                    <select
                      value={
                        filters.showInNavigation === undefined
                          ? ""
                          : filters.showInNavigation.toString()
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          "showInNavigation",
                          e.target.value === ""
                            ? undefined
                            : e.target.value === "true"
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    >
                      <option value="">All</option>
                      <option value="true">Visible</option>
                      <option value="false">Hidden</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1">
                      Has Products
                    </label>
                    <select
                      value={
                        filters.hasProducts === undefined
                          ? ""
                          : filters.hasProducts.toString()
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          "hasProducts",
                          e.target.value === ""
                            ? undefined
                            : e.target.value === "true"
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    >
                      <option value="">All</option>
                      <option value="true">With Products</option>
                      <option value="false">Empty</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() =>
                        setFilters({
                          search: "",
                          isActive: undefined,
                          parentId: undefined,
                          showInNavigation: undefined,
                          hasProducts: undefined,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-md shadow-sm">
            <DataTable
              data={processedCategories}
              columns={columns}
              loading={loading}
              sortable={true}
              sortOptions={sortOptions}
              onSort={handleSort}
              selectable={true}
              selectedItems={selectedCategories}
              onSelectionChange={setSelectedCategories}
              emptyMessage="No categories found"
            />
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteCategory}
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteModal.category?.name}"? This action cannot be undone.`}
          confirmText="Delete Category"
          cancelText="Cancel"
          type="danger"
          loading={deleteModal.loading}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminCategoriesPage;
