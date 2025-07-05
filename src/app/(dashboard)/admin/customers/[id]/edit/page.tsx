"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute } from "@/components/admin/ui";
import { CustomerForm } from "@/components/admin/ui";
import { adminCustomers } from "@/data/admin-customers";
import { AdminCustomer } from "@/types/admin-customer";
import Link from "next/link";

const EditCustomerPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;

  // Find customer by ID
  const customer = adminCustomers.find((c) => c.id === customerId);

  const handleSuccess = (updatedCustomer: AdminCustomer) => {
    router.push(`/admin/customers/${updatedCustomer.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/customers/${customerId}`);
  };

  if (!customer) {
    return (
      <AdminLayout
        title="Customer Not Found"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: "Not Found" },
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The customer you're trying to edit doesn't exist.
          </p>
          <Link
            href="/admin/customers"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
          >
            Back to Customers
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <ProtectedRoute resource="customers" action="update">
      <AdminLayout
        title={`Edit ${customer.firstName} ${customer.lastName}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          {
            label: `${customer.firstName} ${customer.lastName}`,
            href: `/admin/customers/${customer.id}`,
          },
          { label: "Edit" },
        ]}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md shadow-sm p-6">
            <CustomerForm
              customer={customer}
              mode="edit"
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default EditCustomerPage;
