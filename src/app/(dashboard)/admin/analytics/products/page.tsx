"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import {
  PermissionGate,
  ProtectedRoute,
  DataTable,
  StatusBadge,
} from "@/components/admin/ui";
import {
  mockProductAnalytics,
  filterProducts,
  sortProducts,
  getProductStats,
} from "@/data/admin-analytics";
import {
  ProductReportData,
  ProductFilters,
  AnalyticsSortOptions,
  ProductSortField,
} from "@/types/admin-analytics";
import { TableColumn } from "@/types/admin";
import {
  PackageIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  EyeIcon,
  ShoppingCartIcon,
  StarIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
} from "@/components/ui";

const ProductAnalyticsPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();

  // State management
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortOptions, setSortOptions] = useState<AnalyticsSortOptions>({
    field: "revenue",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get product data and statistics
  const productData = mockProductAnalytics;
  const stats = getProductStats();

  // Filter and sort product data
  const filteredAndSortedProducts = useMemo(() => {
    let result = filterProducts(productData.products, filters);
    result = sortProducts(result, sortOptions);
    return result;
  }, [filters, sortOptions]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Handle sort changes
  const handleSort = (sortOptions: {
    field: string;
    direction: "asc" | "desc";
  }) => {
    setSortOptions({
      field: sortOptions.field,
      direction: sortOptions.direction,
    });
  };

  // Handle export
  const handleExport = (format: "csv" | "xlsx" | "pdf") => {
    showSuccess(`Exporting product report as ${format.toUpperCase()}...`);
    // Export logic would go here
  };

  // Define table columns
  const columns: TableColumn<ProductReportData>[] = [
    {
      key: "name",
      label: "Product",
      sortable: true,
      render: (_, product) => (
        <div>
          <div className="font-medium text-gray-900">{product.name}</div>
          <div className="text-sm text-gray-500">{product.sku}</div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (_, product) => (
        <StatusBadge status={product.category} type="general" />
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (_, product) => (
        <StatusBadge status={product.status} type="product" />
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (_, product) => (
        <div className="font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      sortable: true,
      render: (_, product) => (
        <div
          className={`text-center font-medium ${
            product.stock === 0
              ? "text-red-600"
              : product.stock < 10
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {product.stock}
        </div>
      ),
    },
    {
      key: "sold",
      label: "Sold",
      sortable: true,
      render: (_, product) => (
        <div className="text-center font-medium text-gray-900">
          {product.sold}
        </div>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      sortable: true,
      render: (_, product) => (
        <div className="font-semibold text-teal-600">
          ${product.revenue.toLocaleString()}
        </div>
      ),
    },
    {
      key: "views",
      label: "Views",
      sortable: true,
      render: (_, product) => (
        <div className="text-center text-gray-900">
          {product.views.toLocaleString()}
        </div>
      ),
    },
    {
      key: "conversionRate",
      label: "Conversion",
      sortable: true,
      render: (_, product) => (
        <div className="text-center">
          <div
            className={`font-medium ${
              product.conversionRate > 5
                ? "text-green-600"
                : product.conversionRate > 2
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {product.conversionRate.toFixed(1)}%
          </div>
        </div>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (_, product) => (
        <div className="flex items-center">
          <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-gray-900">
            {product.rating.toFixed(1)}
          </span>
        </div>
      ),
    },
  ];

  // Statistics cards
  const statsCards = [
    {
      title: "Total Products",
      value: productData.metrics.totalProducts.toLocaleString(),
      icon: PackageIcon,
      color: "teal",
    },
    {
      title: "Active Products",
      value: productData.metrics.activeProducts.toLocaleString(),
      icon: TrendingUpIcon,
      color: "green",
    },
    {
      title: "Low Stock",
      value: productData.metrics.lowStockProducts.toLocaleString(),
      icon: AlertTriangleIcon,
      color: "yellow",
    },
    {
      title: "Out of Stock",
      value: productData.metrics.outOfStockProducts.toLocaleString(),
      icon: AlertTriangleIcon,
      color: "red",
    },
    {
      title: "Total Views",
      value: productData.metrics.totalViews.toLocaleString(),
      icon: EyeIcon,
      color: "blue",
    },
    {
      title: "Total Sales",
      value: productData.metrics.totalSales.toLocaleString(),
      icon: ShoppingCartIcon,
      color: "purple",
    },
  ];

  return (
    <ProtectedRoute resource="analytics" action="read">
      <AdminLayout
        title="Product Analytics"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Analytics", href: "/admin/analytics" },
          { label: "Product Reports" },
        ]}
      >
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-md shadow-sm p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-md bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stock Alerts */}
          {productData.stockAlerts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-center">
                <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-sm font-medium text-yellow-800">
                  Stock Alerts ({productData.stockAlerts.length})
                </h3>
              </div>
              <div className="mt-2 text-sm text-yellow-700">
                {productData.stockAlerts.map((alert, index) => (
                  <span key={alert.id}>
                    {alert.name}
                    {index < productData.stockAlerts.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-md shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className={`text-lg font-semibold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Product Performance
                  </h2>
                  <p
                    className={`text-sm text-gray-600 mt-1 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Detailed product analytics and performance metrics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={filters.status || "all"}
                    onChange={(e) =>
                      handleFilterChange({ status: e.target.value as any })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="all" className="text-gray-900 bg-white">
                      All Status
                    </option>
                    <option value="active" className="text-gray-900 bg-white">
                      Active
                    </option>
                    <option value="inactive" className="text-gray-900 bg-white">
                      Inactive
                    </option>
                    <option
                      value="low_stock"
                      className="text-gray-900 bg-white"
                    >
                      Low Stock
                    </option>
                    <option
                      value="out_of_stock"
                      className="text-gray-900 bg-white"
                    >
                      Out of Stock
                    </option>
                  </select>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                  >
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filters
                  </button>
                  <PermissionGate resource="analytics" action="export">
                    <button
                      onClick={() => handleExport("csv")}
                      className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 font-rubik"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </PermissionGate>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search || ""}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              data={filteredAndSortedProducts}
              columns={columns}
              sortable={true}
              sortOptions={sortOptions}
              onSort={handleSort}
              emptyMessage="No products found"
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default ProductAnalyticsPage;
