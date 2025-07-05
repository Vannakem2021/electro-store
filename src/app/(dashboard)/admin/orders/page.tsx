"use client";

import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AdminLayout,
  ProtectedRoute,
  DataTable,
  StatusBadge,
  PermissionGate,
} from "@/components/admin";
import {
  ShoppingBagIcon,
  DollarSignIcon,
  TrendingUpIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  EditIcon,
  DownloadIcon,
  SearchIcon,
  FilterIcon,
  ArrowPathIcon,
} from "@/components/ui";
import {
  adminOrders,
  getOrderStats,
  filterOrders,
  sortOrders,
  getUniqueOrderTags,
  getUniqueOrderSources,
} from "@/data/admin-orders";
import type {
  AdminOrder,
  OrderFilters,
  OrderSortOptions,
} from "@/types/admin-order";

const AdminOrdersPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";
  const searchParams = useSearchParams();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<OrderFilters>({
    status: searchParams.get("status")
      ? [searchParams.get("status") as any]
      : [],
  });
  const [sortOptions, setSortOptions] = useState<OrderSortOptions>({
    field: "createdAt",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get order statistics
  const orderStats = useMemo(() => getOrderStats(), []);

  // Apply filters and sorting
  const filteredAndSortedOrders = useMemo(() => {
    const searchFilters = { ...filters, search: searchTerm };
    const filtered = filterOrders(adminOrders, searchFilters);
    return sortOrders(filtered, sortOptions);
  }, [searchTerm, filters, sortOptions]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Table columns
  const columns = [
    {
      key: "orderNumber",
      label: "Order",
      sortable: true,
      render: (value: string, order: AdminOrder) => (
        <div>
          <Link
            href={`/admin/orders/${order.id}`}
            className="font-medium text-gray-900 hover:text-teal-600 transition-colors duration-200 focus-accessible"
          >
            {order.orderNumber}
          </Link>
          <p className="text-sm text-gray-500-accessible">
            {formatDate(order.createdAt)}
          </p>
        </div>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (value: any, order: AdminOrder) => (
        <div>
          <p className="font-medium text-gray-900">{order.customerName}</p>
          <p className="text-sm text-gray-500-accessible">
            {order.customerEmail}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <StatusBadge status={value as any} type="order" size="sm" />
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (value: string) => (
        <StatusBadge status={value as any} type="payment" size="sm" />
      ),
    },
    {
      key: "fulfillmentStatus",
      label: "Fulfillment",
      render: (value: string) => (
        <StatusBadge status={value as any} type="fulfillment" size="sm" />
      ),
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      align: "right",
      render: (value: number) => (
        <span className="font-medium text-gray-900">{formatPrice(value)}</span>
      ),
    },
    {
      key: "items",
      label: "Items",
      align: "center",
      render: (value: any, order: AdminOrder) => (
        <span className="text-sm text-gray-600-accessible">
          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (value: any, order: AdminOrder) => (
        <div className="flex items-center justify-center space-x-2">
          <Link
            href={`/admin/orders/${order.id}`}
            className="text-gray-400-accessible hover:text-teal-600 transition-colors duration-200 focus-accessible"
            title="View Order"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <PermissionGate resource="orders" action="update">
            <Link
              href={`/admin/orders/${order.id}/edit`}
              className="text-gray-400-accessible hover:text-blue-600 transition-colors duration-200 focus-accessible"
              title="Edit Order"
            >
              <EditIcon className="w-4 h-4" />
            </Link>
          </PermissionGate>
        </div>
      ),
    },
  ];

  return (
    <ProtectedRoute resource="orders" action="read">
      <AdminLayout
        title="Order Management"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Orders" },
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200">
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <PermissionGate resource="orders" action="read">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Export
              </button>
            </PermissionGate>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Order Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <ShoppingBagIcon className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {orderStats.totalOrders}
                  </p>
                  <p className="text-sm text-green-600 font-rubik">
                    +{orderStats.ordersChange}% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <DollarSignIcon className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {formatPrice(orderStats.totalRevenue)}
                  </p>
                  <p className="text-sm text-green-600 font-rubik">
                    +{orderStats.revenueChange}% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <TrendingUpIcon className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Average Order
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {formatPrice(orderStats.averageOrderValue)}
                  </p>
                  <p className="text-sm text-gray-500-accessible font-rubik">
                    Per order value
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <ClockIcon className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Pending Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {orderStats.pendingOrders}
                  </p>
                  <p className="text-sm text-orange-600 font-rubik">
                    Needs attention
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Status Overview */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Order Status Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link
                href="/admin/orders?status=pending"
                className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-accessible"
              >
                <ClockIcon className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Pending</p>
                  <p className="text-lg font-bold text-orange-600">
                    {orderStats.pendingOrders}
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/orders?status=processing"
                className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-accessible"
              >
                <ArrowPathIcon className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Processing
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {orderStats.processingOrders}
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/orders?status=shipped"
                className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-accessible"
              >
                <TruckIcon className="w-5 h-5 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Shipped</p>
                  <p className="text-lg font-bold text-purple-600">
                    {orderStats.shippedOrders}
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/orders?status=delivered"
                className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-accessible"
              >
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Delivered</p>
                  <p className="text-lg font-bold text-green-600">
                    {orderStats.deliveredOrders}
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/orders?status=cancelled"
                className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-accessible"
              >
                <XCircleIcon className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Cancelled</p>
                  <p className="text-lg font-bold text-red-600">
                    {orderStats.cancelledOrders}
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/orders?status=refunded"
                className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-accessible"
              >
                <ArrowPathIcon className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Refunded</p>
                  <p className="text-lg font-bold text-gray-600">
                    {orderStats.refundedOrders}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200"
                >
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filters
                  {Object.keys(filters).some(
                    (key) => filters[key as keyof OrderFilters]?.length
                  ) && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      Active
                    </span>
                  )}
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400-accessible" />
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                      Order Status
                    </label>
                    <select
                      multiple
                      value={filters.status || []}
                      onChange={(e) => {
                        const values = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        setFilters((prev) => ({
                          ...prev,
                          status: values as any,
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                      Payment Status
                    </label>
                    <select
                      multiple
                      value={filters.paymentStatus || []}
                      onChange={(e) => {
                        const values = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        setFilters((prev) => ({
                          ...prev,
                          paymentStatus: values as any,
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="partially_paid">Partially Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                      Date From
                    </label>
                    <input
                      type="date"
                      value={
                        filters.dateFrom
                          ? filters.dateFrom.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : undefined;
                        setFilters((prev) => ({ ...prev, dateFrom: date }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible mb-1 font-rubik">
                      Date To
                    </label>
                    <input
                      type="date"
                      value={
                        filters.dateTo
                          ? filters.dateTo.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : undefined;
                        setFilters((prev) => ({ ...prev, dateTo: date }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({});
                    }}
                    className="text-sm text-gray-600-accessible hover:text-gray-800 font-rubik focus-accessible"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3
                className={`text-lg font-semibold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Orders ({filteredAndSortedOrders.length})
              </h3>
            </div>

            <DataTable
              data={filteredAndSortedOrders}
              columns={columns}
              searchable={false}
              sortable={true}
              onSort={(field, direction) => {
                setSortOptions({ field: field as any, direction });
              }}
              pagination={{
                pageSize: 25,
                showSizeChanger: true,
              }}
              emptyState={{
                title: "No orders found",
                description: "Try adjusting your search or filter criteria.",
                icon: ShoppingBagIcon,
              }}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminOrdersPage;
