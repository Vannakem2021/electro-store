"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, ProductForm } from "@/components/admin/ui";
import { createProduct } from "@/data/admin-products";
import { ProductFormData } from "@/types/admin-product";
import { ArrowLeftIcon } from "@/components/ui";

/**
 * Add Product Page - Create new products
 */
const AdminAddProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: ProductFormData) => {
    setLoading(true);

    try {
      // Create the product using the mock API
      const newProduct = await createProduct(formData);

      showSuccess(
        "Product Created",
        `${newProduct.name} has been created successfully.`
      );

      // Redirect to the product detail page
      router.push(`/admin/products/${newProduct.id}`);
    } catch (error) {
      console.error("Error creating product:", error);
      showError(
        "Creation Failed",
        "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  return (
    <ProtectedRoute resource="products" action="create">
      <AdminLayout
        title="Add New Product"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Add Product" },
        ]}
      >
        <div className="space-y-6">
          {/* Back Button */}
          <div>
            <Link
              href="/admin/products"
              className={`inline-flex items-center text-sm text-gray-600-accessible hover:text-gray-900 transition-colors duration-200 focus-accessible ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </div>

          {/* Product Form */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <ProductForm
              mode="create"
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminAddProductPage;
