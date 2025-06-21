"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePermissions } from "@/hooks/usePermissions";
import { AdminLayout } from "@/components/admin/layout";
import {
  PermissionGate,
  RoleBadge,
  PermissionsList,
  ProtectedRoute,
} from "@/components/admin/ui";
import {
  ShieldIcon,
  UserIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
} from "@/components/ui/Icons";

/**
 * Admin Permissions Demo Page
 * This page demonstrates the role-based access control system
 */
const AdminPermissionsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const {
    user,
    getRoleInfo,
    getPermissionsList,
    products,
    orders,
    customers,
    analytics,
    settings,
    users,
    isSuperAdmin,
    isAdmin,
    isManager,
  } = usePermissions();

  const roleInfo = getRoleInfo();
  const permissions = getPermissionsList();

  const permissionTests = [
    {
      title: "Product Management",
      icon: PackageIcon,
      tests: [
        { label: "Create Products", check: products.canCreate() },
        { label: "Read Products", check: products.canRead() },
        { label: "Update Products", check: products.canUpdate() },
        { label: "Delete Products", check: products.canDelete() },
        { label: "Bulk Operations", check: products.canBulkEdit() },
      ],
    },
    {
      title: "Order Management",
      icon: ShoppingBagIcon,
      tests: [
        { label: "View Orders", check: orders.canRead() },
        { label: "Update Orders", check: orders.canUpdate() },
        { label: "Fulfill Orders", check: orders.canFulfill() },
        { label: "Process Refunds", check: orders.canRefund() },
        { label: "Delete Orders", check: orders.canDelete() },
      ],
    },
    {
      title: "Customer Management",
      icon: UsersIcon,
      tests: [
        { label: "View Customers", check: customers.canRead() },
        { label: "Update Customers", check: customers.canUpdate() },
        { label: "Delete Customers", check: customers.canDelete() },
        { label: "Customer Support", check: customers.canSupport() },
      ],
    },
    {
      title: "Analytics & Reports",
      icon: ChartBarIcon,
      tests: [
        { label: "View Analytics", check: analytics.canRead() },
        { label: "Export Reports", check: analytics.canExport() },
      ],
    },
    {
      title: "System Settings",
      icon: CogIcon,
      tests: [
        { label: "View Settings", check: settings.canRead() },
        { label: "Update Settings", check: settings.canUpdate() },
      ],
    },
    {
      title: "User Management",
      icon: UserIcon,
      tests: [
        { label: "Create Users", check: users.canCreate() },
        { label: "View Users", check: users.canRead() },
        { label: "Update Users", check: users.canUpdate() },
        { label: "Delete Users", check: users.canDelete() },
      ],
    },
  ];

  return (
    <ProtectedRoute
      resource="settings"
      action="read"
      title="Permission Demo Access Denied"
      message="You need settings read permission to view the permissions demo page."
    >
      <AdminLayout
        title="Permissions & Access Control"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Permissions Demo" },
        ]}
      >
        <div className="space-y-6">
          {/* User Info Card */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-xl font-semibold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Current User Information
              </h2>
              <ShieldIcon className="w-6 h-6 text-teal-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3
                  className={`text-sm font-medium text-gray-700 mb-2 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  User Details
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-rubik">
                    <span className="font-medium">Name:</span> {user?.firstName}{" "}
                    {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600 font-rubik">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 font-rubik">
                      Role:
                    </span>
                    {roleInfo && <RoleBadge role={roleInfo} showLevel={true} />}
                  </div>
                </div>
              </div>

              <div>
                <h3
                  className={`text-sm font-medium text-gray-700 mb-2 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Access Level
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isSuperAdmin() ? "bg-purple-500" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm text-gray-600 font-rubik">
                      Super Admin
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isAdmin() ? "bg-red-500" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm text-gray-600 font-rubik">
                      Admin Level
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isManager() ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm text-gray-600 font-rubik">
                      Manager Level
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permission Tests */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2
              className={`text-xl font-semibold text-gray-900 mb-6 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Permission Tests
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {permissionTests.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex items-center mb-4">
                      <IconComponent className="w-5 h-5 text-teal-600 mr-2" />
                      <h3
                        className={`font-medium text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {section.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {section.tests.map((test, testIndex) => (
                        <div
                          key={testIndex}
                          className="flex items-center justify-between"
                        >
                          <span
                            className={`text-sm text-gray-600 ${
                              isKhmer ? "font-khmer" : "font-rubik"
                            }`}
                          >
                            {test.label}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              test.check
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {test.check ? "✓ Allowed" : "✗ Denied"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Permission Gate Examples */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2
              className={`text-xl font-semibold text-gray-900 mb-6 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Permission Gate Examples
            </h2>

            <div className="space-y-4">
              <PermissionGate resource="products" action="create">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p
                    className={`text-green-800 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    ✓ You can see this because you have "products:create"
                    permission
                  </p>
                </div>
              </PermissionGate>

              <PermissionGate resource="users" action="delete">
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p
                    className={`text-red-800 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    ⚠️ You can see this because you have "users:delete"
                    permission (high-level access)
                  </p>
                </div>
              </PermissionGate>

              <PermissionGate
                roles={["Super Admin", "Admin"]}
                fallback={
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <p
                      className={`text-gray-600 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      🔒 This content is only visible to Super Admins and Admins
                    </p>
                  </div>
                }
              >
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                  <p
                    className={`text-purple-800 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    👑 Admin-only content: You have high-level administrative
                    access
                  </p>
                </div>
              </PermissionGate>
            </div>
          </div>

          {/* User Permissions List */}
          <PermissionsList
            permissions={permissions}
            title="Your Current Permissions"
            groupByResource={true}
            showDescription={true}
            className="bg-white rounded-md shadow-sm p-6"
          />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminPermissionsPage;
