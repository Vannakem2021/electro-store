"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";

import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, ProductForm } from "@/components/admin/ui";
import { getAdminProductById, updateProduct } from "@/data/admin-products";
import { AdminProduct, ProductFormData } from "@/types/admin-product";
import { ArrowLeftIcon } from "@/components/ui";

/**
 * Edit Product Page - Edit existing products
 */
const AdminEditProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [product, setProduct] = useState<AdminProduct | null>(null);

  // Get product ID from params
  const productId = params?.id as string;

  // Load product data
  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      setPageLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fetchedProduct = getAdminProductById(productId);
      if (!fetchedProduct) {
        notFound();
      }

      setProduct(fetchedProduct);
      setPageLoading(false);
    };

    loadProduct();
  }, [productId]);

  const handleSubmit = async (formData: ProductFormData) => {
    if (!product) return;

    setLoading(true);

    try {
      // Update the product using the mock API
      const updatedProduct = await updateProduct(product.id, formData);

      showSuccess(
        "Product Updated",
        `${updatedProduct.name} has been updated successfully.`
      );

      // Redirect to the product detail page
      router.push(`/admin/products/${updatedProduct.id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      showError("Update Failed", "Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/products/${productId}`);
  };

  if (pageLoading) {
    return (
      <ProtectedRoute resource="products" action="update">
        <AdminLayout>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-rubik">Loading product...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <ProtectedRoute resource="products" action="update">
      <AdminLayout
        title={`Edit ${product.name}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: product.name, href: `/admin/products/${product.id}` },
          { label: "Edit" },
        ]}
      >
        <div className="space-y-6">
          {/* Back Button */}
          <div>
            <Link
              href={`/admin/products/${product.id}`}
              className={`inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Product
            </Link>
          </div>

          {/* Product Form */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <ProductForm
              mode="edit"
              product={product}
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

export default AdminEditProductPage;
