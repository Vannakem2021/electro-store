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
  adminProducts,
  filterProducts,
  sortProducts,
  getProductStats,
  getUniqueBrands,
  getInventoryAlerts,
  deleteProduct,
} from "@/data/admin-products";
import { categories } from "@/data";
import {
  AdminProduct,
  ProductFilters,
  ProductSortOptions,
} from "@/types/admin-product";
import { TableColumn } from "@/types/admin";
import { formatPrice } from "@/lib/utils";
import {
  PlusIcon,
  FilterIcon,
  SearchIcon,
  PackageIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  DownloadIcon,
  AlertTriangleIcon,
} from "@/components/ui";

const AdminProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { products } = usePermissions();

  // State management
  const [loading, setLoading] = useState(true);
  const [products_data, setProductsData] = useState<AdminProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<AdminProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<AdminProduct[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product: AdminProduct | null;
    loading: boolean;
  }>({
    isOpen: false,
    product: null,
    loading: false,
  });

  // Filters and sorting
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    brand: "",
    status: "all",
    stock: "all",
  });

  const [sortOptions, setSortOptions] = useState<ProductSortOptions>({
    field: "updatedAt",
    direction: "desc",
  });

  // Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
    total: 0,
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProductsData(adminProducts);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply filters and sorting
  const processedProducts = useMemo(() => {
    let result = filterProducts(filters);
    result = sortProducts(result, sortOptions);
    return result;
  }, [filters, sortOptions]);

  // Update pagination and filtered products
  useEffect(() => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedProducts = processedProducts.slice(startIndex, endIndex);

    setFilteredProducts(paginatedProducts);
    setPagination((prev) => ({
      ...prev,
      total: processedProducts.length,
    }));
  }, [processedProducts, pagination.page, pagination.limit]);

  // Get statistics
  const stats = useMemo(() => getProductStats(), []);
  const brands = useMemo(() => getUniqueBrands(), []);
  const alerts = useMemo(() => getInventoryAlerts(), []);

  // Table columns
  const columns: TableColumn<AdminProduct>[] = [
    {
      key: "image",
      label: "Image",
      width: "w-16",
      render: (value, product) => (
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-md"
        />
      ),
    },
    {
      key: "name",
      label: "Product",
      sortable: true,
      render: (value, product) => (
        <div>
          <Link
            href={`/admin/products/${product.id}`}
            className="font-medium text-gray-900 hover:text-teal-600 transition-colors duration-200 focus-accessible"
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-500-accessible font-mono">
            {product.sku}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600-accessible">{value}</span>
      ),
    },
    {
      key: "brand",
      label: "Brand",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600-accessible">{value}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      align: "right",
      render: (value, product) => (
        <div className="text-right">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <p className="text-sm text-gray-500-accessible line-through">
              {formatPrice(product.comparePrice)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "stockCount",
      label: "Stock",
      sortable: true,
      align: "center",
      render: (value, product) => (
        <div className="text-center">
          <span
            className={`font-medium ${
              product.stockCount <= product.lowStockThreshold
                ? "text-red-600"
                : "text-gray-900"
            }`}
          >
            {product.stockCount}
          </span>
          {product.stockCount <= product.lowStockThreshold && (
            <AlertTriangleIcon className="w-4 h-4 text-red-500 inline ml-1" />
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value, product) => (
        <StatusBadge
          status={product.isActive ? "active" : "inactive"}
          type="product"
          size="sm"
        />
      ),
    },
    {
      key: "updatedAt",
      label: "Updated",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-500-accessible">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (value, product) => (
        <div className="flex items-center justify-center space-x-2">
          <Link
            href={`/admin/products/${product.id}`}
            className="text-gray-400-accessible hover:text-teal-600 transition-colors duration-200 focus-accessible"
            title="View Product"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <PermissionGate resource="products" action="update">
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="text-gray-400-accessible hover:text-blue-600 transition-colors duration-200 focus-accessible"
              title="Edit Product"
            >
              <EditIcon className="w-4 h-4" />
            </Link>
          </PermissionGate>
          <PermissionGate resource="products" action="delete">
            <button
              onClick={() => handleDeleteProduct(product)}
              className="text-gray-400-accessible hover:text-red-600 transition-colors duration-200 focus-accessible"
              title="Delete Product"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </PermissionGate>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSort = (newSortOptions: ProductSortOptions) => {
    setSortOptions(newSortOptions);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleDeleteProduct = (product: AdminProduct) => {
    setDeleteModal({
      isOpen: true,
      product,
      loading: false,
    });
  };

  const confirmDeleteProduct = async () => {
    if (!deleteModal.product) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      await deleteProduct(deleteModal.product.id);

      showSuccess(
        "Product Deleted",
        `${deleteModal.product.name} has been deleted successfully.`
      );

      // Refresh the products list
      setProductsData((prev) =>
        prev.filter((p) => p.id !== deleteModal.product!.id)
      );

      // Close modal
      setDeleteModal({
        isOpen: false,
        product: null,
        loading: false,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      showError("Delete Failed", "Failed to delete product. Please try again.");
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const closeDeleteModal = () => {
    if (deleteModal.loading) return;
    setDeleteModal({
      isOpen: false,
      product: null,
      loading: false,
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      brand: "",
      status: "all",
      stock: "all",
    });
  };

  return (
    <ProtectedRoute resource="products" action="read">
      <AdminLayout
        title="Products"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products" },
        ]}
      >
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <PackageIcon className="w-8 h-8 text-teal-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    In Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {stats.inStock}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <AlertTriangleIcon className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Low Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {stats.lowStock}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {stats.outOfStock}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Alerts */}
          {alerts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-center">
                <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                <h3
                  className={`text-sm font-medium text-yellow-800 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Inventory Alerts ({alerts.length})
                </h3>
              </div>
              <div className="mt-2 text-sm text-yellow-700">
                <p className={isKhmer ? "font-khmer" : "font-rubik"}>
                  {alerts
                    .slice(0, 3)
                    .map((alert) => alert.productName)
                    .join(", ")}
                  {alerts.length > 3 &&
                    ` and ${alerts.length - 3} more products`}{" "}
                  need attention.
                </p>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <PermissionGate resource="products" action="create">
                <Link
                  href="/admin/products/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus-accessible transition-colors duration-200"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Product
                </Link>
              </PermissionGate>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200"
              >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filters
              </button>

              <PermissionGate resource="products" action="read">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200">
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Export
                </button>
              </PermissionGate>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400-accessible" />
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) =>
                      handleFilterChange("brand", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                    Stock
                  </label>
                  <select
                    value={filters.stock}
                    onChange={(e) =>
                      handleFilterChange("stock", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                  >
                    <option value="all">All Stock</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600-accessible hover:text-gray-800 font-rubik focus-accessible"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Products Table */}
          <DataTable
            data={filteredProducts}
            columns={columns}
            loading={loading}
            sortable={true}
            sortOptions={sortOptions}
            onSort={handleSort}
            selectable={products.canDelete()}
            selectedItems={selectedProducts}
            onSelectionChange={setSelectedProducts}
            pagination={{
              page: pagination.page,
              limit: pagination.limit,
              total: pagination.total,
              onPageChange: handlePageChange,
              onLimitChange: handleLimitChange,
            }}
            emptyMessage="No products found"
          />
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteProduct}
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteModal.product?.name}"? This action cannot be undone.`}
          confirmText="Delete Product"
          cancelText="Cancel"
          type="danger"
          loading={deleteModal.loading}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminProductsPage;
