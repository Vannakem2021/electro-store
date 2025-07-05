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
  mockSalesAnalytics,
  filterSalesData,
  getSalesStats,
} from "@/data/admin-analytics";
import {
  SalesReportData,
  SalesFilters,
  AnalyticsSortOptions,
} from "@/types/admin-analytics";
import { TableColumn } from "@/types/admin";
import {
  TrendingUpIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  UsersIcon,
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
} from "@/components/ui";

const SalesAnalyticsPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();

  // State management
  const [filters, setFilters] = useState<SalesFilters>({});
  const [sortOptions, setSortOptions] = useState<AnalyticsSortOptions>({
    field: "date",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState("last30days");

  // Get sales data and statistics
  const salesData = mockSalesAnalytics;
  const stats = getSalesStats();

  // Filter and sort sales data
  const filteredSalesData = useMemo(() => {
    return filterSalesData(salesData.dailyData, filters);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<SalesFilters>) => {
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
    showSuccess(`Exporting sales report as ${format.toUpperCase()}...`);
    // Export logic would go here
  };

  // Define table columns
  const columns: TableColumn<SalesReportData>[] = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (_, row) => (
        <div className="font-medium text-gray-900">
          {new Date(row.date).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      sortable: true,
      render: (_, row) => (
        <div className="font-semibold text-teal-600">
          ${row.revenue.toLocaleString()}
        </div>
      ),
    },
    {
      key: "orders",
      label: "Orders",
      sortable: true,
      render: (_, row) => (
        <div className="text-center">
          <div className="font-medium text-gray-900">{row.orders}</div>
        </div>
      ),
    },
    {
      key: "customers",
      label: "Customers",
      sortable: true,
      render: (_, row) => (
        <div className="text-center">
          <div className="font-medium text-gray-900">{row.customers}</div>
        </div>
      ),
    },
    {
      key: "averageOrderValue",
      label: "AOV",
      sortable: true,
      render: (_, row) => (
        <div className="font-medium text-gray-900">
          ${row.averageOrderValue.toFixed(2)}
        </div>
      ),
    },
    {
      key: "conversionRate",
      label: "Conversion",
      sortable: true,
      render: (_, row) => (
        <div className="text-center">
          <StatusBadge
            status={row.conversionRate > 3 ? "active" : "inactive"}
            type="general"
          />
          <div className="text-xs text-gray-500 mt-1">
            {row.conversionRate.toFixed(1)}%
          </div>
        </div>
      ),
    },
  ];

  // Statistics cards
  const statsCards = [
    {
      title: "Total Revenue",
      value: `$${salesData.metrics.totalRevenue.toLocaleString()}`,
      change: salesData.metrics.revenueChange,
      icon: DollarSignIcon,
      color: "teal",
    },
    {
      title: "Total Orders",
      value: salesData.metrics.totalOrders.toLocaleString(),
      change: salesData.metrics.ordersChange,
      icon: ShoppingBagIcon,
      color: "blue",
    },
    {
      title: "Average Order Value",
      value: `$${salesData.metrics.averageOrderValue.toFixed(2)}`,
      change: salesData.metrics.aovChange,
      icon: TrendingUpIcon,
      color: "green",
    },
    {
      title: "Conversion Rate",
      value: `${salesData.metrics.conversionRate.toFixed(1)}%`,
      change: salesData.metrics.conversionChange,
      icon: UsersIcon,
      color: "purple",
    },
  ];

  return (
    <ProtectedRoute resource="analytics" action="read">
      <AdminLayout
        title="Sales Analytics"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Analytics", href: "/admin/analytics" },
          { label: "Sales Reports" },
        ]}
      >
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-md shadow-sm p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-md bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <div
                      className={`flex items-center text-xs mt-1 ${
                        stat.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUpIcon className="w-3 h-3 mr-1" />
                      {stat.change >= 0 ? "+" : ""}
                      {stat.change.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                    Sales Reports
                  </h2>
                  <p
                    className={`text-sm text-gray-600 mt-1 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Daily sales performance and metrics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="today" className="text-gray-900 bg-white">
                      Today
                    </option>
                    <option
                      value="yesterday"
                      className="text-gray-900 bg-white"
                    >
                      Yesterday
                    </option>
                    <option
                      value="last7days"
                      className="text-gray-900 bg-white"
                    >
                      Last 7 Days
                    </option>
                    <option
                      value="last30days"
                      className="text-gray-900 bg-white"
                    >
                      Last 30 Days
                    </option>
                    <option
                      value="last90days"
                      className="text-gray-900 bg-white"
                    >
                      Last 90 Days
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
                    <div className="relative">
                      <button
                        onClick={() => handleExport("csv")}
                        className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 font-rubik"
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Export
                      </button>
                    </div>
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
                  placeholder="Search sales data..."
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
              data={filteredSalesData}
              columns={columns}
              sortable={true}
              sortOptions={sortOptions}
              onSort={handleSort}
              emptyMessage="No sales data found"
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SalesAnalyticsPage;
