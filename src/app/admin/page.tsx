"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAdmin } from "@/contexts/AdminContext";
import { usePermissions } from "@/hooks/usePermissions";
import { AdminLayout } from "@/components/admin/layout";
import { PermissionGate, RoleBadge } from "@/components/admin/ui";
import { mockDashboardMetrics } from "@/data/admin";
import {
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  ShieldIcon,
} from "@/components/ui";

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { user } = useAdmin();
  const { getRoleInfo, products, orders, customers, analytics } =
    usePermissions();

  const metrics = mockDashboardMetrics;
  const roleInfo = getRoleInfo();

  const statsCards = [
    {
      title: "Total Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      change: metrics.revenueChange,
      icon: ChartBarIcon,
      color: "teal",
    },
    {
      title: "Total Orders",
      value: metrics.totalOrders.toLocaleString(),
      change: metrics.ordersChange,
      icon: ShoppingBagIcon,
      color: "blue",
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toLocaleString(),
      change: metrics.customersChange,
      icon: UsersIcon,
      color: "green",
    },
    {
      title: "Total Products",
      value: metrics.totalProducts.toLocaleString(),
      change: metrics.productsChange,
      icon: PackageIcon,
      color: "purple",
    },
  ];

  const alerts = [
    {
      type: "warning",
      title: "Low Stock Alert",
      message: `${metrics.lowStockProducts} products are running low on stock`,
      action: "View Products",
    },
    {
      type: "info",
      title: "Pending Orders",
      message: `${metrics.pendingOrders} orders are waiting for processing`,
      action: "View Orders",
    },
  ];

  return (
    <AdminLayout title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className={`text-xl font-semibold text-gray-900 mb-2 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Welcome back, {user?.firstName}!
              </h2>
              <p
                className={`text-gray-600 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {roleInfo && <RoleBadge role={roleInfo} showLevel={true} />}
              <ShieldIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>

          {/* Role-based welcome message */}
          <PermissionGate minimumRoleLevel={1}>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
              <p
                className={`text-sm text-purple-800 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                👑 You have Super Admin access with full system permissions.
              </p>
            </div>
          </PermissionGate>

          <PermissionGate minimumRoleLevel={2} roles={["Admin"]}>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p
                className={`text-sm text-red-800 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                🔧 You have Admin access with most system permissions.
              </p>
            </div>
          </PermissionGate>

          <PermissionGate minimumRoleLevel={3} roles={["Manager"]}>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p
                className={`text-sm text-blue-800 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                📊 You have Manager access for products, orders, and customers.
              </p>
            </div>
          </PermissionGate>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-md shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-md ${
                      stat.color === "teal"
                        ? "bg-teal-100 text-teal-600"
                        : stat.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : stat.color === "green"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p
                      className={`text-sm font-medium text-gray-600 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 font-rubik">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-medium ${
                        stat.change >= 0 ? "text-green-600" : "text-red-600"
                      } font-rubik`}
                    >
                      {stat.change >= 0 ? "+" : ""}
                      {stat.change}%
                    </span>
                    <span
                      className={`text-sm text-gray-500 ml-2 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      from last month
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`rounded-md p-4 ${
                alert.type === "warning"
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      alert.type === "warning" ? "bg-yellow-400" : "bg-blue-400"
                    }`}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h3
                    className={`text-sm font-medium ${
                      alert.type === "warning"
                        ? "text-yellow-800"
                        : "text-blue-800"
                    } ${isKhmer ? "font-khmer" : "font-rubik"}`}
                  >
                    {alert.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      alert.type === "warning"
                        ? "text-yellow-700"
                        : "text-blue-700"
                    } ${isKhmer ? "font-khmer" : "font-rubik"}`}
                  >
                    {alert.message}
                  </p>
                  <div className="mt-3">
                    <button
                      className={`text-sm font-medium ${
                        alert.type === "warning"
                          ? "text-yellow-800 hover:text-yellow-900"
                          : "text-blue-800 hover:text-blue-900"
                      } transition-colors duration-200 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {alert.action} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h3
            className={`text-lg font-semibold text-gray-900 mb-4 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PermissionGate resource="products" action="create">
              <button className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200 text-left">
                <PackageIcon className="w-8 h-8 text-teal-600 mb-2" />
                <h4
                  className={`font-medium text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Add New Product
                </h4>
                <p
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Create a new product listing
                </p>
              </button>
            </PermissionGate>

            <PermissionGate resource="orders" action="read">
              <button className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200 text-left">
                <ShoppingBagIcon className="w-8 h-8 text-teal-600 mb-2" />
                <h4
                  className={`font-medium text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Process Orders
                </h4>
                <p
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Review and fulfill pending orders
                </p>
              </button>
            </PermissionGate>

            <PermissionGate resource="analytics" action="read">
              <button className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200 text-left">
                <ChartBarIcon className="w-8 h-8 text-teal-600 mb-2" />
                <h4
                  className={`font-medium text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  View Analytics
                </h4>
                <p
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Check sales and performance reports
                </p>
              </button>
            </PermissionGate>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
