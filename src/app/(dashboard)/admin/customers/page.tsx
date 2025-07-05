"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import {
  PermissionGate,
  ProtectedRoute,
  DataTable,
  StatusBadge,
  ConfirmationModal,
} from "@/components/admin/ui";
import {
  adminCustomers,
  filterCustomers,
  sortCustomers,
  getCustomerStats,
  deleteCustomer,
} from "@/data/admin-customers";
import {
  AdminCustomer,
  CustomerFilters,
  CustomerSortOptions,
  CustomerSortField,
} from "@/types/admin-customer";
import { TableColumn } from "@/types/admin";
import {
  UsersIcon,
  UserCheckIcon,
  ShieldExclamationIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  FilterIcon,
} from "@/components/ui";

const CustomersPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();

  // State management
  const [filters, setFilters] = useState<CustomerFilters>({});
  const [sortOptions, setSortOptions] = useState<CustomerSortOptions>({
    field: "createdAt",
    direction: "desc",
  });
  const [selectedCustomers, setSelectedCustomers] = useState<AdminCustomer[]>(
    []
  );
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    customer: AdminCustomer | null;
  }>({ isOpen: false, customer: null });

  // Get customer statistics
  const stats = getCustomerStats();

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let result = filterCustomers(adminCustomers, filters);
    result = sortCustomers(result, sortOptions);
    return result;
  }, [filters, sortOptions]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<CustomerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Handle sort changes
  const handleSort = (sortOptions: {
    field: string;
    direction: "asc" | "desc";
  }) => {
    setSortOptions({
      field: sortOptions.field as CustomerSortField,
      direction: sortOptions.direction,
    });
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (customer: AdminCustomer) => {
    try {
      await deleteCustomer(customer.id);
      showSuccess("Customer deleted successfully!");
      setDeleteModal({ isOpen: false, customer: null });
    } catch (error) {
      console.error("Error deleting customer:", error);
      showError("Failed to delete customer. Please try again.");
    }
  };

  // Define table columns
  const columns: TableColumn<AdminCustomer>[] = [
    {
      key: "name",
      label: "Customer",
      sortable: true,
      render: (_, customer) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
            {customer.firstName?.charAt(0) || "?"}
            {customer.lastName?.charAt(0) || "?"}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {customer.firstName} {customer.lastName}
            </div>
            <div className="text-sm text-gray-500">{customer.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (_, customer) => (
        <div className="space-y-1">
          <StatusBadge status={customer.status} type="user" />
          {customer.isVerified && (
            <div className="flex items-center text-xs text-green-600">
              <UserCheckIcon className="w-3 h-3 mr-1" />
              Verified
            </div>
          )}
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (_, customer) => (
        <StatusBadge status={customer.type} type="general" />
      ),
    },
    {
      key: "totalOrders",
      label: "Orders",
      sortable: true,
      render: (_, customer) => (
        <div className="text-center">
          <div className="font-medium text-gray-900">
            {customer.totalOrders}
          </div>
          <div className="text-xs text-gray-500">
            ${customer.totalSpent.toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      sortable: true,
      render: (_, customer) => (
        <div className="text-sm text-gray-900">
          {new Date(customer.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, customer) => (
        <div className="flex items-center space-x-2">
          <PermissionGate resource="customers" action="read">
            <Link
              href={`/admin/customers/${customer.id}`}
              className="p-1 text-gray-400 hover:text-teal-600 transition-colors duration-200"
              title="View Customer"
            >
              <EyeIcon className="w-4 h-4" />
            </Link>
          </PermissionGate>
          <PermissionGate resource="customers" action="update">
            <Link
              href={`/admin/customers/${customer.id}/edit`}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              title="Edit Customer"
            >
              <EditIcon className="w-4 h-4" />
            </Link>
          </PermissionGate>
          <PermissionGate resource="customers" action="delete">
            <button
              onClick={() => setDeleteModal({ isOpen: true, customer })}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Delete Customer"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </PermissionGate>
        </div>
      ),
    },
  ];

  // Statistics cards
  const statsCards = [
    {
      title: "Total Customers",
      value: stats.total.toLocaleString(),
      icon: UsersIcon,
      color: "teal",
    },
    {
      title: "Active Customers",
      value: stats.active.toLocaleString(),
      icon: UserCheckIcon,
      color: "green",
    },
    {
      title: "VIP Customers",
      value: stats.vip.toLocaleString(),
      icon: ShieldExclamationIcon,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: UsersIcon,
      color: "blue",
    },
  ];

  return (
    <ProtectedRoute resource="customers" action="read">
      <AdminLayout
        title="Customers"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Customers" },
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
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
                    Customer Management
                  </h2>
                  <p
                    className={`text-sm text-gray-600 mt-1 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Manage your customers and their information
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filters
                  </button>
                  <PermissionGate resource="customers" action="create">
                    <Link
                      href="/admin/customers/add"
                      className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 font-rubik"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Customer
                    </Link>
                  </PermissionGate>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={filters.search || ""}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              data={filteredAndSortedCustomers}
              columns={columns}
              sortable={true}
              sortOptions={sortOptions}
              onSort={handleSort}
              selectable={true}
              selectedItems={selectedCustomers}
              onSelectionChange={setSelectedCustomers}
              emptyMessage="No customers found"
            />
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, customer: null })}
          onConfirm={() =>
            deleteModal.customer && handleDeleteCustomer(deleteModal.customer)
          }
          title="Delete Customer"
          message={`Are you sure you want to delete ${deleteModal.customer?.firstName} ${deleteModal.customer?.lastName}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default CustomersPage;
