"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute } from "@/components/admin/ui";
import { CustomerForm } from "@/components/admin/ui";
import { AdminCustomer } from "@/types/admin-customer";

const AddCustomerPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSuccess = (customer: AdminCustomer) => {
    router.push("/admin/customers");
  };

  const handleCancel = () => {
    router.push("/admin/customers");
  };

  return (
    <ProtectedRoute resource="customers" action="create">
      <AdminLayout
        title="Add Customer"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: "Add Customer" },
        ]}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md shadow-sm p-6">
            <CustomerForm
              mode="create"
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AddCustomerPage;
