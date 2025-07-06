"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, DataTable, StatusBadge } from "@/components/admin/ui";
import {
  ShoppingBagIcon,
  DollarSignIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  EyeIcon,
  SearchIcon,
} from "@/components/ui";
import { adminOrders, getOrderStats } from "@/data/admin-orders";
import type { AdminOrder } from "@/types/admin-order";

const AdminOrdersPage: React.FC = () => {
  // Simple state management
  const [searchTerm, setSearchTerm] = useState("");

  // Get order statistics
  const orderStats = useMemo(() => getOrderStats(), []);

  // Simple filtering based on search term
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return adminOrders;

    return adminOrders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customer.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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

  // Simplified table columns
  const columns = [
    {
      key: "orderNumber",
      label: "Order",
      render: (order: AdminOrder) => (
        <div>
          <Link
            href={`/admin/orders/${order.id}`}
            className="font-medium text-gray-900 hover:text-teal-600"
          >
            {order.orderNumber}
          </Link>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (order: AdminOrder) => (
        <div>
          <p className="font-medium text-gray-900">{order.customerName}</p>
          <p className="text-sm text-gray-500">{order.customerEmail}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (order: AdminOrder) => (
        <StatusBadge
          status={order.status}
          variant={
            order.status === "completed"
              ? "success"
              : order.status === "pending"
              ? "warning"
              : order.status === "cancelled"
              ? "error"
              : "default"
          }
        />
      ),
    },
    {
      key: "total",
      label: "Total",
      render: (order: AdminOrder) => (
        <span className="font-medium text-gray-900">
          {formatPrice(order.total)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (order: AdminOrder) => (
        <div className="flex items-center space-x-2">
          <Link
            href={`/admin/orders/${order.id}`}
            className="p-1 text-gray-400 hover:text-teal-600"
            title="View order"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">Manage customer orders and track fulfillment</p>
            </div>
          </div>

          {/* Order Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <ShoppingBagIcon className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <DollarSignIcon className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(orderStats.totalRevenue)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <ClockIcon className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.pendingOrders}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-teal-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{orderStats.completedOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Orders Table */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <DataTable
              data={filteredOrders}
              columns={columns}
              loading={false}
              emptyMessage="No orders found"
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminOrdersPage;
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
