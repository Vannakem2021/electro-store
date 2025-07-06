import productsData from "./products.json";
import categoriesData from "./categories.json";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { createMockSimpleVariants } from "@/lib/simpleVariants";

// Convert JSON data to typed arrays
const products: Product[] = productsData as Product[];
const categories: Category[] = categoriesData as Category[];
import {
  AdminProduct,
  ProductStats,
  ProductFilters,
  ProductSortOptions,
  InventoryAlert,
} from "@/types/admin-product";
import { Product } from "@/types/product";

// Convert regular products to admin products with additional fields
export const adminProducts: AdminProduct[] = products.map((product) => ({
  ...product,
  sku: `SKU-${product.id.padStart(6, "0")}`,
  costPrice: Math.round(product.price * 0.6), // 40% markup
  comparePrice: product.originalPrice,
  weight: getProductWeight(product.categoryId),
  dimensions: getProductDimensions(product.categoryId),
  seoTitle: `${product.name} - Buy Online at Elecxo`,
  seoDescription: product.description.substring(0, 160),
  seoKeywords: product.tags || [],
  isActive: true,
  isVisible: true,
  sortOrder: parseInt(product.id),
  lowStockThreshold: 10,
  trackInventory: true,
  allowBackorder: false,
  requiresShipping: true,
  taxable: true,
  vendor: product.brand,
  variantOptions: createMockSimpleVariants(product.categoryId), // Add simplified variants
  barcode: `${product.id}${Math.random().toString().substr(2, 8)}`,
  hsCode: getHSCode(product.categoryId),
  countryOfOrigin: getCountryOfOrigin(product.brand),
  publishedAt: product.createdAt,
  metafields: {},
}));

// Helper functions for generating mock data
function getProductWeight(categoryId: string): number {
  const weights: Record<string, number> = {
    "1": 0.2, // Accessories
    "2": 1.5, // Camera
    "3": 2.0, // Laptop
    "4": 0.2, // Smart Phone
    "5": 4.5, // Gaming
    "6": 0.1, // Smart Watch
  };
  return weights[categoryId] || 0.5;
}

function getProductDimensions(categoryId: string) {
  const dimensions: Record<
    string,
    { length: number; width: number; height: number; unit: "cm" | "in" }
  > = {
    "1": { length: 10, width: 8, height: 2, unit: "cm" },
    "2": { length: 15, width: 12, height: 8, unit: "cm" },
    "3": { length: 35, width: 25, height: 2, unit: "cm" },
    "4": { length: 16, width: 8, height: 1, unit: "cm" },
    "5": { length: 40, width: 30, height: 15, unit: "cm" },
    "6": { length: 5, width: 4, height: 1, unit: "cm" },
  };
  return (
    dimensions[categoryId] || { length: 20, width: 15, height: 5, unit: "cm" }
  );
}

function getHSCode(categoryId: string): string {
  const hsCodes: Record<string, string> = {
    "1": "8517.70.00", // Accessories
    "2": "9006.40.00", // Camera
    "3": "8471.30.00", // Laptop
    "4": "8517.12.00", // Smart Phone
    "5": "9504.50.00", // Gaming
    "6": "9102.11.00", // Smart Watch
  };
  return hsCodes[categoryId] || "8517.70.00";
}

function getCountryOfOrigin(brand: string): string {
  const origins: Record<string, string> = {
    Apple: "United States",
    Samsung: "South Korea",
    Sony: "Japan",
    Canon: "Japan",
    LG: "South Korea",
    Microsoft: "United States",
    Nintendo: "Japan",
    Google: "United States",
  };
  return origins[brand] || "China";
}

// Product statistics
export const getProductStats = (): ProductStats => {
  const stats: ProductStats = {
    total: adminProducts.length,
    active: adminProducts.filter((p) => p.isActive).length,
    inactive: adminProducts.filter((p) => !p.isActive).length,
    featured: adminProducts.filter((p) => p.isFeatured).length,
    inStock: adminProducts.filter((p) => p.inStock && p.stockCount > 0).length,
    lowStock: adminProducts.filter(
      (p) => p.inStock && p.stockCount <= p.lowStockThreshold
    ).length,
    outOfStock: adminProducts.filter((p) => !p.inStock || p.stockCount === 0)
      .length,
    byCategory: {},
    byBrand: {},
    recentlyAdded: adminProducts.filter((p) => {
      const createdDate = new Date(p.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdDate > weekAgo;
    }).length,
    recentlyUpdated: adminProducts.filter((p) => {
      const updatedDate = new Date(p.updatedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return updatedDate > weekAgo;
    }).length,
  };

  // Calculate by category
  adminProducts.forEach((product) => {
    const category = product.category;
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
  });

  // Calculate by brand
  adminProducts.forEach((product) => {
    const brand = product.brand;
    stats.byBrand[brand] = (stats.byBrand[brand] || 0) + 1;
  });

  return stats;
};

// Filter products
export const filterProducts = (filters: ProductFilters): AdminProduct[] => {
  return adminProducts.filter((product) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText =
        `${product.name} ${product.description} ${product.brand} ${product.sku}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    // Category filter
    if (filters.category && product.categoryId !== filters.category) {
      return false;
    }

    // Brand filter
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      if (filters.status === "active" && !product.isActive) return false;
      if (filters.status === "inactive" && product.isActive) return false;
    }

    // Stock filter
    if (filters.stock && filters.stock !== "all") {
      if (
        filters.stock === "in-stock" &&
        (!product.inStock || product.stockCount === 0)
      )
        return false;
      if (
        filters.stock === "low-stock" &&
        product.stockCount > product.lowStockThreshold
      )
        return false;
      if (
        filters.stock === "out-of-stock" &&
        product.inStock &&
        product.stockCount > 0
      )
        return false;
    }

    // Featured filter
    if (
      filters.featured !== undefined &&
      product.isFeatured !== filters.featured
    ) {
      return false;
    }

    // Price range filter
    if (filters.priceMin !== undefined && product.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && product.price > filters.priceMax) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom) {
      const productDate = new Date(product.createdAt);
      if (productDate < filters.dateFrom) return false;
    }
    if (filters.dateTo) {
      const productDate = new Date(product.createdAt);
      if (productDate > filters.dateTo) return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const productTags = product.tags || [];
      const hasMatchingTag = filters.tags.some((tag) =>
        productTags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

// Sort products
export const sortProducts = (
  products: AdminProduct[],
  sortOptions: ProductSortOptions
): AdminProduct[] => {
  return [...products].sort((a, b) => {
    let comparison = 0;

    switch (sortOptions.field) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "stockCount":
        comparison = a.stockCount - b.stockCount;
        break;
      case "createdAt":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "updatedAt":
        comparison =
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "brand":
        comparison = a.brand.localeCompare(b.brand);
        break;
      case "status":
        comparison = (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0);
        break;
      default:
        comparison = 0;
    }

    return sortOptions.direction === "desc" ? -comparison : comparison;
  });
};

// Get inventory alerts
export const getInventoryAlerts = (): InventoryAlert[] => {
  const alerts: InventoryAlert[] = [];

  adminProducts.forEach((product) => {
    if (!product.inStock || product.stockCount === 0) {
      alerts.push({
        id: `alert-${product.id}-out`,
        productId: product.id,
        productName: product.name,
        type: "out-of-stock",
        currentStock: product.stockCount,
        threshold: 0,
        severity: "high",
        createdAt: new Date(),
        acknowledged: false,
      });
    } else if (product.stockCount <= product.lowStockThreshold) {
      alerts.push({
        id: `alert-${product.id}-low`,
        productId: product.id,
        productName: product.name,
        type: "low-stock",
        currentStock: product.stockCount,
        threshold: product.lowStockThreshold,
        severity:
          product.stockCount <= product.lowStockThreshold / 2
            ? "high"
            : "medium",
        createdAt: new Date(),
        acknowledged: false,
      });
    }
  });

  return alerts.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
};

// Get product by ID
export const getAdminProductById = (id: string): AdminProduct | undefined => {
  return adminProducts.find((product) => product.id === id);
};

// Get unique brands
export const getUniqueBrands = (): string[] => {
  const brands = new Set(adminProducts.map((product) => product.brand));
  return Array.from(brands).sort();
};

// Get unique tags
export const getUniqueTags = (): string[] => {
  const tags = new Set<string>();
  adminProducts.forEach((product) => {
    if (product.tags) {
      product.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
};

// Mock functions for CRUD operations (in real app, these would be API calls)
export const createProduct = async (
  productData: Partial<AdminProduct>
): Promise<AdminProduct> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find category name from categoryId
  const category = categories.find((c) => c.id === productData.categoryId);

  const newProduct: AdminProduct = {
    id: (adminProducts.length + 1).toString(),
    name: productData.name || "",
    description: productData.description || "",
    price: productData.price || 0,
    image: productData.image || "",
    images: productData.images || [],
    category: category?.name || "",
    categoryId: productData.categoryId || "",
    brand: productData.brand || "",
    tags: productData.tags || [],
    rating: 0,
    reviewCount: 0,
    inStock: productData.trackInventory
      ? (productData.stockCount || 0) > 0
      : true,
    stockCount: productData.stockCount || 0,
    specifications: productData.specifications || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Admin-specific fields with defaults for removed fields
    sku: productData.sku || `SKU-${Date.now()}`,
    costPrice: productData.price ? Math.round(productData.price * 0.6) : 0,
    comparePrice: productData.comparePrice || 0,
    weight: getProductWeight(productData.categoryId || ""),
    dimensions: getProductDimensions(productData.categoryId || ""),
    seoTitle: `${productData.name} - Buy Online at Elecxo`,
    seoDescription: productData.description?.substring(0, 160) || "",
    seoKeywords: productData.tags || [],
    isActive: productData.isActive ?? true,
    isVisible: productData.isVisible ?? true,
    sortOrder: adminProducts.length + 1,
    lowStockThreshold: productData.lowStockThreshold || 10,
    trackInventory: productData.trackInventory ?? true,
    allowBackorder: productData.allowBackorder ?? false,
    requiresShipping: true,
    taxable: true,
    vendor: productData.brand || "",
    barcode: `${Date.now()}${Math.random().toString().substr(2, 8)}`,
    hsCode: getHSCode(productData.categoryId || ""),
    countryOfOrigin: getCountryOfOrigin(productData.brand || ""),
    publishedAt: new Date().toISOString(),
    metafields: {},
    isFeatured: productData.isFeatured ?? false,
    isBestSeller: productData.isBestSeller ?? false,
    isNew: productData.isNew ?? false,
  };

  adminProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (
  id: string,
  productData: Partial<AdminProduct>
): Promise<AdminProduct> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = adminProducts.findIndex((product) => product.id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }

  const updatedProduct = {
    ...adminProducts[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  };

  adminProducts[index] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = adminProducts.findIndex((product) => product.id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }

  adminProducts.splice(index, 1);
};
