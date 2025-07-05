"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePermissions } from "@/hooks/usePermissions";
import { AdminLayout } from "@/components/admin/layout";
import {
  PermissionGate,
  ProtectedRoute,
  StatusBadge,
  ConfirmationModal,
} from "@/components/admin/ui";
import { getAdminProductById, deleteProduct } from "@/data/admin-products";
import { useToast } from "@/contexts/ToastContext";
import { getCategoryById } from "@/data";
import { AdminProduct } from "@/types/admin-product";
import { formatPrice } from "@/lib/utils";
import {
  EditIcon,
  TrashIcon,
  PackageIcon,
  TagIcon,
  CalendarIcon,
  DollarSignIcon,
  BarChart3Icon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/ui";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const AdminProductDetailPage: React.FC<ProductDetailPageProps> = ({
  params,
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { products } = usePermissions();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    loading: false,
  });

  // Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  // Load product data
  useEffect(() => {
    if (!resolvedParams) return;

    const loadProduct = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fetchedProduct = getAdminProductById(resolvedParams.id);
      if (!fetchedProduct) {
        notFound();
      }

      setProduct(fetchedProduct);
      setLoading(false);
    };

    loadProduct();
  }, [resolvedParams]);

  if (loading || !product) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600-accessible font-rubik">
              Loading product...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const category = getCategoryById(product.categoryId);

  const handleDeleteProduct = () => {
    setDeleteModal({
      isOpen: true,
      loading: false,
    });
  };

  const confirmDeleteProduct = async () => {
    if (!product) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      await deleteProduct(product.id);

      showSuccess(
        "Product Deleted",
        `${product.name} has been deleted successfully.`
      );

      // Redirect to products list
      window.location.href = "/admin/products";
    } catch (error) {
      console.error("Error deleting product:", error);
      showError("Delete Failed", "Failed to delete product. Please try again.");
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const closeDeleteModal = () => {
    if (deleteModal.loading) return;
    setDeleteModal({
      isOpen: false,
      loading: false,
    });
  };

  return (
    <ProtectedRoute resource="products" action="read">
      <AdminLayout
        title={product.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: product.name },
        ]}
      >
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <StatusBadge
                status={product.isActive ? "active" : "inactive"}
                type="product"
              />
              {product.isFeatured && (
                <StatusBadge status="featured" type="product" />
              )}
              {product.isNew && <StatusBadge status="new" type="product" />}
              {product.stockCount <= product.lowStockThreshold && (
                <StatusBadge status="low-stock" type="product" />
              )}
            </div>

            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <PermissionGate resource="products" action="update">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200"
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Product
                </Link>
              </PermissionGate>

              <PermissionGate resource="products" action="delete">
                <button
                  onClick={handleDeleteProduct}
                  className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </PermissionGate>
            </div>
          </div>

          {/* Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md"
                />
                {product.images && product.images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {product.images.slice(1, 5).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-16 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3
                      className={`text-lg font-semibold text-gray-900 mb-4 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Product Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                          SKU
                        </label>
                        <p className="mt-1 text-sm text-gray-900 font-mono">
                          {product.sku}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                          Category
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {category?.name || product.category}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                          Brand
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {product.brand}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                          Vendor
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {product.vendor || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible font-rubik mb-2">
                      Description
                    </label>
                    <p
                      className={`text-sm text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {product.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700-accessible font-rubik mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <TagIcon className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <DollarSignIcon className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Price
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {formatPrice(product.price)}
                  </p>
                  {product.comparePrice && (
                    <p className="text-sm text-gray-500-accessible line-through font-rubik">
                      {formatPrice(product.comparePrice)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <PackageIcon className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Stock
                  </p>
                  <p
                    className={`text-2xl font-bold font-rubik ${
                      product.stockCount <= product.lowStockThreshold
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {product.stockCount}
                  </p>
                  <p className="text-sm text-gray-500-accessible font-rubik">
                    Threshold: {product.lowStockThreshold}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <BarChart3Icon className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Rating
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-rubik">
                    {product.rating.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500-accessible font-rubik">
                    {product.reviewCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <CalendarIcon className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600-accessible font-rubik">
                    Created
                  </p>
                  <p className="text-lg font-bold text-gray-900 font-rubik">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500-accessible font-rubik">
                    Updated: {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory & Shipping */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h3
                className={`text-lg font-semibold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Inventory & Shipping
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600-accessible font-rubik">
                    Track Inventory
                  </span>
                  {product.trackInventory ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600-accessible font-rubik">
                    Allow Backorder
                  </span>
                  {product.allowBackorder ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600-accessible font-rubik">
                    Requires Shipping
                  </span>
                  {product.requiresShipping ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600-accessible font-rubik">
                    Taxable
                  </span>
                  {product.taxable ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
                {product.weight && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600-accessible font-rubik">
                      Weight
                    </span>
                    <span className="text-sm text-gray-900 font-rubik">
                      {product.weight} kg
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* SEO Information */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h3
                className={`text-lg font-semibold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                SEO Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                    SEO Title
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {product.seoTitle || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                    SEO Description
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {product.seoDescription || "N/A"}
                  </p>
                </div>
                {product.seoKeywords && product.seoKeywords.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700-accessible font-rubik">
                      Keywords
                    </label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {product.seoKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700-accessible rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
                <h3
                  className={`text-lg font-semibold text-gray-900 mb-4 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-sm font-medium text-gray-600-accessible font-rubik capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-sm text-gray-900 font-rubik">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteProduct}
          title="Delete Product"
          message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
          confirmText="Delete Product"
          cancelText="Cancel"
          type="danger"
          loading={deleteModal.loading}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminProductDetailPage;
