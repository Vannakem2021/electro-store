import { Category } from "./category";

/**
 * Extended category interface for admin operations
 */
export interface AdminCategory extends Category {
  // Additional admin fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  metafields?: Record<string, any>;
  
  // Audit fields
  createdBy?: string;
  updatedBy?: string;
  
  // Statistics
  totalProducts?: number;
  activeProducts?: number;
  inactiveProducts?: number;
  
  // Hierarchy
  level?: number;
  path?: string; // e.g., "Electronics > Smartphones"
  
  // Display settings
  showInNavigation?: boolean;
  featuredOrder?: number;
  bannerImage?: string;
  iconColor?: string;
}

/**
 * Category form data interface
 */
export interface CategoryFormData {
  name: string;
  description: string;
  image: string;
  icon?: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  parentId?: string;
  
  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  
  // Display settings
  showInNavigation?: boolean;
  featuredOrder?: number;
  bannerImage?: string;
  iconColor?: string;
  
  // Meta fields
  metafields?: Record<string, any>;
}

/**
 * Category filters for admin listing
 */
export interface CategoryFilters {
  search?: string;
  isActive?: boolean;
  parentId?: string;
  showInNavigation?: boolean;
  hasProducts?: boolean;
  minProductCount?: number;
  maxProductCount?: number;
}

/**
 * Category sort options
 */
export interface CategorySortOptions {
  field: keyof AdminCategory;
  direction: "asc" | "desc";
}

/**
 * Category statistics
 */
export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
  categoriesWithProducts: number;
  categoriesWithoutProducts: number;
  averageProductsPerCategory: number;
  topCategoriesByProducts: Array<{
    category: AdminCategory;
    productCount: number;
  }>;
}

/**
 * Category tree node for hierarchical display
 */
export interface CategoryTreeNode extends AdminCategory {
  children: CategoryTreeNode[];
  depth: number;
  hasChildren: boolean;
  isExpanded?: boolean;
}

/**
 * Category validation errors
 */
export interface CategoryValidationErrors {
  name?: string;
  description?: string;
  slug?: string;
  image?: string;
  parentId?: string;
  sortOrder?: string;
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * Category bulk operation types
 */
export type CategoryBulkAction = 
  | "activate"
  | "deactivate" 
  | "delete"
  | "updateParent"
  | "updateSortOrder"
  | "export";

/**
 * Category bulk operation data
 */
export interface CategoryBulkOperation {
  action: CategoryBulkAction;
  categoryIds: string[];
  data?: any; // Additional data for specific operations
}

/**
 * Category import/export data
 */
export interface CategoryImportData {
  categories: Partial<CategoryFormData>[];
  options: {
    updateExisting: boolean;
    createMissing: boolean;
    validateSlugs: boolean;
  };
}

export interface CategoryExportData {
  categories: AdminCategory[];
  exportedAt: string;
  totalCount: number;
}
