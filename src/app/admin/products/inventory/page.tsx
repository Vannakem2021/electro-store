"use client";

import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  AdminLayout,
  ProtectedRoute,
  DataTable,
  StatusBadge,
  PermissionGate,
} from "@/components/admin";
import {
  PackageIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  XCircleIcon,
  WarehouseIcon,
  EyeIcon,
  EditIcon,
  DownloadIcon,
  SearchIcon,
  FilterIcon,
} from "@/components/ui";
import { adminProducts, getInventoryAlerts } from "@/data/admin-products";
import type { AdminProduct, InventoryAlert } from "@/types/admin-product";

const AdminInventoryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out" | "in">(
    "all"
  );
  const [showFilters, setShowFilters] = useState(false);

  // Get inventory data
  const inventoryAlerts = useMemo(() => getInventoryAlerts(), []);

  // Filter products based on search and stock status
  const filteredProducts = useMemo(() => {
    return adminProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" &&
          product.stockCount <= product.lowStockThreshold &&
          product.stockCount > 0) ||
        (stockFilter === "out" && product.stockCount === 0) ||
        (stockFilter === "in" &&
          product.stockCount > product.lowStockThreshold);

      return matchesSearch && matchesStock;
    });
  }, [searchTerm, stockFilter]);

  // Calculate inventory statistics
  const inventoryStats = useMemo(() => {
    const totalProducts = adminProducts.length;
    const inStock = adminProducts.filter(
      (p) => p.stockCount > p.lowStockThreshold
    ).length;
    const lowStock = adminProducts.filter(
      (p) => p.stockCount <= p.lowStockThreshold && p.stockCount > 0
    ).length;
    const outOfStock = adminProducts.filter((p) => p.stockCount === 0).length;
    const totalValue = adminProducts.reduce(
      (sum, p) => sum + (p.stockCount * p.costPrice || p.price),
      0
    );

    return {
      totalProducts,
      inStock,
      lowStock,
      outOfStock,
      totalValue,
    };
  }, []);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Table columns
  const columns = [
    {
      key: "product",
      label: "Product",
      sortable: true,
      render: (value: any, product: AdminProduct) => (
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 rounded-md object-cover mr-3"
          />
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
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value: string) => (
        <span className="text-sm text-gray-600-accessible">{value}</span>
      ),
    },
    {
      key: "stockCount",
      label: "Current Stock",
      sortable: true,
      align: "center",
      render: (value: number, product: AdminProduct) => (
        <div className="text-center">
          <span
            className={`font-medium ${
              product.stockCount === 0
                ? "text-red-600"
                : product.stockCount <= product.lowStockThreshold
                ? "text-orange-600"
                : "text-gray-900"
            }`}
          >
            {product.stockCount}
          </span>
          {product.stockCount <= product.lowStockThreshold &&
            product.stockCount > 0 && (
              <AlertTriangleIcon className="w-4 h-4 text-orange-500 inline ml-1" />
            )}
          {product.stockCount === 0 && (
            <AlertTriangleIcon className="w-4 h-4 text-red-500 inline ml-1" />
          )}
        </div>
      ),
    },
    {
      key: "lowStockThreshold",
      label: "Threshold",
      sortable: true,
      align: "center",
      render: (value: number) => (
        <span className="text-sm text-gray-600-accessible text-center block">
          {value}
        </span>
      ),
    },
    {
      key: "stockValue",
      label: "Stock Value",
      sortable: true,
      align: "right",
      render: (value: any, product: AdminProduct) => (
        <span className="text-sm text-gray-900 font-medium">
          {formatPrice(
            product.stockCount * (product.costPrice || product.price)
          )}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: any, product: AdminProduct) => {
        if (product.stockCount === 0) {
          return <StatusBadge status="out-of-stock" type="product" size="sm" />;
        } else if (product.stockCount <= product.lowStockThreshold) {
          return <StatusBadge status="low-stock" type="product" size="sm" />;
        } else {
          return <StatusBadge status="in-stock" type="product" size="sm" />;
        }
      },
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (value: any, product: AdminProduct) => (
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
        </div>
      ),
    },
  ];

  return (
    <ProtectedRoute resource="products" action="read">
      <AdminLayout
        title="Inventory Management"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Inventory" },
        ]}
      >
        <div className="space-y-6">
          {/* Inventory Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <PackageIcon className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {inventoryStats.totalProducts}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <TrendingUpIcon className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    In Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {inventoryStats.inStock}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <AlertTriangleIcon className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Low Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {inventoryStats.lowStock}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <XCircleIcon className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {inventoryStats.outOfStock}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <WarehouseIcon className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {formatPrice(inventoryStats.totalValue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Alerts */}
          {inventoryAlerts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-center">
                <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                <h3
                  className={`text-sm font-medium text-yellow-800 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Inventory Alerts ({inventoryAlerts.length})
                </h3>
              </div>
              <div className="mt-2 text-sm text-yellow-700">
                <p className={isKhmer ? "font-khmer" : "font-rubik"}>
                  You have{" "}
                  {inventoryAlerts.filter((a) => a.type === "low-stock").length}{" "}
                  low stock and{" "}
                  {
                    inventoryAlerts.filter((a) => a.type === "out-of-stock")
                      .length
                  }{" "}
                  out of stock items that need attention.
                </p>
              </div>
            </div>
          )}

          {/* Filters and Actions */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
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
                    Export Inventory
                  </button>
                </PermissionGate>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400-accessible" />
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                      Stock Status
                    </label>
                    <select
                      value={stockFilter}
                      onChange={(e) => setStockFilter(e.target.value as any)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    >
                      <option value="all">All Products</option>
                      <option value="in">In Stock</option>
                      <option value="low">Low Stock</option>
                      <option value="out">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStockFilter("all");
                    }}
                    className="text-sm text-gray-600-accessible hover:text-gray-800 font-rubik focus-accessible"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3
                className={`text-lg font-semibold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Inventory Overview ({filteredProducts.length} products)
              </h3>
            </div>

            <DataTable
              data={filteredProducts}
              columns={columns}
              searchable={false}
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
              }}
              emptyState={{
                title: "No products found",
                description: "Try adjusting your search or filter criteria.",
                icon: PackageIcon,
              }}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminInventoryPage;
