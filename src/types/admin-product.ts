import {
  Product,
  ProductVariant,
  VariantGroup,
  SimpleVariantOptions,
} from "./product";
import { Category } from "./category";

// Extended product interface for admin management
export interface AdminProduct extends Product {
  sku?: string;
  costPrice?: number;
  comparePrice?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "cm" | "in";
  };
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  isActive: boolean;
  isVisible: boolean;
  sortOrder: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  requiresShipping: boolean;
  taxable: boolean;
  vendor?: string;
  barcode?: string;
  hsCode?: string;
  countryOfOrigin?: string;
  publishedAt?: string;
  metafields?: Record<string, any>;
}

// Product form data for creating/editing (simplified)
export interface ProductFormData {
  // Basic Information
  name: string;
  description: string;
  sku?: string;

  // Pricing
  price: number;
  comparePrice?: number;

  // Inventory
  trackInventory: boolean;
  stockCount: number;
  lowStockThreshold: number;
  allowBackorder: boolean;

  // Organization
  categoryId: string;
  brand: string;
  tags: string[];

  // Media
  image: string;
  images: string[];

  // Status & Features
  isActive: boolean;
  isVisible: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;

  // Simplified Variants
  variantOptions?: SimpleVariantOptions;

  // Product Specifications
  specifications?: Record<string, string>;
}

// Product list filters
export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  status?: "active" | "inactive" | "all";
  stock?: "in-stock" | "low-stock" | "out-of-stock" | "all";
  featured?: boolean;
  priceMin?: number;
  priceMax?: number;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
}

// Product list sort options
export type ProductSortField =
  | "name"
  | "price"
  | "stockCount"
  | "createdAt"
  | "updatedAt"
  | "category"
  | "brand"
  | "status";

export interface ProductSortOptions {
  field: ProductSortField;
  direction: "asc" | "desc";
}

// Bulk action types
export type ProductBulkAction =
  | "activate"
  | "deactivate"
  | "feature"
  | "unfeature"
  | "delete"
  | "duplicate"
  | "export"
  | "update-category"
  | "update-tags";

export interface ProductBulkActionData {
  action: ProductBulkAction;
  productIds: string[];
  data?: {
    categoryId?: string;
    tags?: string[];
    [key: string]: any;
  };
}

// Product statistics
export interface ProductStats {
  total: number;
  active: number;
  inactive: number;
  featured: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  byCategory: Record<string, number>;
  byBrand: Record<string, number>;
  recentlyAdded: number;
  recentlyUpdated: number;
}

// Product validation errors
export interface ProductValidationErrors {
  name?: string;
  description?: string;
  price?: string;
  categoryId?: string;
  brand?: string;
  image?: string;
  stockCount?: string;
  sku?: string;
  weight?: string;
  dimensions?: string;
  seoTitle?: string;
  seoDescription?: string;
  [key: string]: string | undefined;
}

// Product import/export
export interface ProductImportData {
  file: File;
  mapping: Record<string, string>;
  options: {
    updateExisting: boolean;
    skipErrors: boolean;
    validateOnly: boolean;
  };
}

export interface ProductExportOptions {
  format: "csv" | "xlsx" | "json";
  fields: string[];
  filters?: ProductFilters;
  includeVariants: boolean;
  includeImages: boolean;
}

// Product activity log
export interface ProductActivity {
  id: string;
  productId: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  changes?: Record<string, { from: any; to: any }>;
  createdAt: Date;
}

// Product review summary for admin
export interface ProductReviewSummary {
  productId: string;
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  recentReviews: Array<{
    id: string;
    rating: number;
    comment: string;
    customerName: string;
    createdAt: Date;
    status: "approved" | "pending" | "rejected";
  }>;
  pendingReviews: number;
}

// Product inventory alert
export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  type: "low-stock" | "out-of-stock" | "overstock";
  currentStock: number;
  threshold: number;
  severity: "low" | "medium" | "high";
  createdAt: Date;
  acknowledged: boolean;
}
