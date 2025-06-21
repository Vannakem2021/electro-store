import { categories, products } from "./index";
import { 
  AdminCategory, 
  CategoryFormData, 
  CategoryFilters, 
  CategorySortOptions,
  CategoryStats,
  CategoryTreeNode,
  CategoryValidationErrors
} from "@/types/admin-category";

// Convert regular categories to admin categories with additional fields
export const adminCategories: AdminCategory[] = categories.map((category) => ({
  ...category,
  seoTitle: `${category.name} - Shop Electronics at Elecxo`,
  seoDescription: category.description,
  seoKeywords: [category.name.toLowerCase(), "electronics", "shop", "buy"],
  metafields: {},
  createdBy: "system",
  updatedBy: "system",
  totalProducts: products.filter(p => p.categoryId === category.id).length,
  activeProducts: products.filter(p => p.categoryId === category.id && p.inStock).length,
  inactiveProducts: products.filter(p => p.categoryId === category.id && !p.inStock).length,
  level: 0,
  path: category.name,
  showInNavigation: true,
  featuredOrder: category.sortOrder,
  bannerImage: category.image,
  iconColor: "#0d9488", // teal-600
}));

/**
 * Get all admin categories
 */
export const getAdminCategories = (): AdminCategory[] => {
  return [...adminCategories];
};

/**
 * Get category by ID
 */
export const getAdminCategoryById = (id: string): AdminCategory | undefined => {
  return adminCategories.find(category => category.id === id);
};

/**
 * Filter categories based on criteria
 */
export const filterCategories = (
  categories: AdminCategory[], 
  filters: CategoryFilters
): AdminCategory[] => {
  let filtered = [...categories];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(category =>
      category.name.toLowerCase().includes(searchLower) ||
      category.description.toLowerCase().includes(searchLower) ||
      category.slug.toLowerCase().includes(searchLower)
    );
  }

  if (filters.isActive !== undefined) {
    filtered = filtered.filter(category => category.isActive === filters.isActive);
  }

  if (filters.parentId !== undefined) {
    filtered = filtered.filter(category => category.parentId === filters.parentId);
  }

  if (filters.showInNavigation !== undefined) {
    filtered = filtered.filter(category => category.showInNavigation === filters.showInNavigation);
  }

  if (filters.hasProducts !== undefined) {
    if (filters.hasProducts) {
      filtered = filtered.filter(category => (category.totalProducts || 0) > 0);
    } else {
      filtered = filtered.filter(category => (category.totalProducts || 0) === 0);
    }
  }

  if (filters.minProductCount !== undefined) {
    filtered = filtered.filter(category => (category.totalProducts || 0) >= filters.minProductCount);
  }

  if (filters.maxProductCount !== undefined) {
    filtered = filtered.filter(category => (category.totalProducts || 0) <= filters.maxProductCount);
  }

  return filtered;
};

/**
 * Sort categories
 */
export const sortCategories = (
  categories: AdminCategory[], 
  sortOptions: CategorySortOptions
): AdminCategory[] => {
  return [...categories].sort((a, b) => {
    const aValue = a[sortOptions.field];
    const bValue = b[sortOptions.field];

    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;

    let comparison = 0;
    if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      comparison = aValue - bValue;
    } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortOptions.direction === "desc" ? -comparison : comparison;
  });
};

/**
 * Get category statistics
 */
export const getCategoryStats = (): CategoryStats => {
  const categories = getAdminCategories();
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.isActive).length;
  const inactiveCategories = totalCategories - activeCategories;
  const categoriesWithProducts = categories.filter(c => (c.totalProducts || 0) > 0).length;
  const categoriesWithoutProducts = totalCategories - categoriesWithProducts;
  
  const totalProducts = categories.reduce((sum, c) => sum + (c.totalProducts || 0), 0);
  const averageProductsPerCategory = totalCategories > 0 ? totalProducts / totalCategories : 0;

  const topCategoriesByProducts = categories
    .filter(c => (c.totalProducts || 0) > 0)
    .sort((a, b) => (b.totalProducts || 0) - (a.totalProducts || 0))
    .slice(0, 5)
    .map(category => ({
      category,
      productCount: category.totalProducts || 0
    }));

  return {
    totalCategories,
    activeCategories,
    inactiveCategories,
    categoriesWithProducts,
    categoriesWithoutProducts,
    averageProductsPerCategory: Math.round(averageProductsPerCategory * 100) / 100,
    topCategoriesByProducts
  };
};

/**
 * Build category tree for hierarchical display
 */
export const buildCategoryTree = (categories: AdminCategory[]): CategoryTreeNode[] => {
  const categoryMap = new Map<string, CategoryTreeNode>();
  const rootCategories: CategoryTreeNode[] = [];

  // Convert categories to tree nodes
  categories.forEach(category => {
    const node: CategoryTreeNode = {
      ...category,
      children: [],
      depth: 0,
      hasChildren: false,
      isExpanded: false
    };
    categoryMap.set(category.id, node);
  });

  // Build tree structure
  categories.forEach(category => {
    const node = categoryMap.get(category.id)!;
    
    if (category.parentId) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.children.push(node);
        parent.hasChildren = true;
        node.depth = parent.depth + 1;
      } else {
        // Parent not found, treat as root
        rootCategories.push(node);
      }
    } else {
      rootCategories.push(node);
    }
  });

  // Sort children by sortOrder
  const sortChildren = (nodes: CategoryTreeNode[]) => {
    nodes.sort((a, b) => a.sortOrder - b.sortOrder);
    nodes.forEach(node => {
      if (node.children.length > 0) {
        sortChildren(node.children);
      }
    });
  };

  sortChildren(rootCategories);
  return rootCategories;
};

/**
 * Validate category data
 */
export const validateCategory = (data: CategoryFormData): CategoryValidationErrors => {
  const errors: CategoryValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = "Category name is required";
  } else if (data.name.length < 2) {
    errors.name = "Category name must be at least 2 characters";
  } else if (data.name.length > 100) {
    errors.name = "Category name must be less than 100 characters";
  }

  if (!data.description?.trim()) {
    errors.description = "Category description is required";
  } else if (data.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (data.description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }

  if (!data.slug?.trim()) {
    errors.slug = "Category slug is required";
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
  }

  if (!data.image?.trim()) {
    errors.image = "Category image is required";
  }

  if (data.sortOrder < 0) {
    errors.sortOrder = "Sort order must be a positive number";
  }

  if (data.seoTitle && data.seoTitle.length > 60) {
    errors.seoTitle = "SEO title must be less than 60 characters";
  }

  if (data.seoDescription && data.seoDescription.length > 160) {
    errors.seoDescription = "SEO description must be less than 160 characters";
  }

  return errors;
};

/**
 * Generate unique slug from name
 */
export const generateSlug = (name: string, excludeId?: string): string => {
  let baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Check for uniqueness
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = adminCategories.find(c => 
      c.slug === slug && c.id !== excludeId
    );
    
    if (!existing) break;
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// Mock CRUD operations (in real app, these would be API calls)
export const createCategory = async (categoryData: CategoryFormData): Promise<AdminCategory> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newCategory: AdminCategory = {
    id: Date.now().toString(),
    name: categoryData.name,
    description: categoryData.description,
    image: categoryData.image,
    icon: categoryData.icon,
    slug: categoryData.slug,
    productCount: 0,
    isActive: categoryData.isActive,
    sortOrder: categoryData.sortOrder,
    parentId: categoryData.parentId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // Admin fields
    seoTitle: categoryData.seoTitle || `${categoryData.name} - Shop at Elecxo`,
    seoDescription: categoryData.seoDescription || categoryData.description,
    seoKeywords: categoryData.seoKeywords || [],
    metafields: categoryData.metafields || {},
    createdBy: "current-user", // In real app, get from auth context
    updatedBy: "current-user",
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    level: 0,
    path: categoryData.name,
    showInNavigation: categoryData.showInNavigation ?? true,
    featuredOrder: categoryData.featuredOrder,
    bannerImage: categoryData.bannerImage,
    iconColor: categoryData.iconColor || "#0d9488",
  };

  // Add to mock data
  adminCategories.push(newCategory);
  
  return newCategory;
};

export const updateCategory = async (id: string, categoryData: CategoryFormData): Promise<AdminCategory> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));

  const index = adminCategories.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error("Category not found");
  }

  const existingCategory = adminCategories[index];
  const updatedCategory: AdminCategory = {
    ...existingCategory,
    name: categoryData.name,
    description: categoryData.description,
    image: categoryData.image,
    icon: categoryData.icon,
    slug: categoryData.slug,
    isActive: categoryData.isActive,
    sortOrder: categoryData.sortOrder,
    parentId: categoryData.parentId,
    updatedAt: new Date().toISOString(),
    
    // Admin fields
    seoTitle: categoryData.seoTitle,
    seoDescription: categoryData.seoDescription,
    seoKeywords: categoryData.seoKeywords || [],
    metafields: categoryData.metafields || {},
    updatedBy: "current-user",
    showInNavigation: categoryData.showInNavigation ?? true,
    featuredOrder: categoryData.featuredOrder,
    bannerImage: categoryData.bannerImage,
    iconColor: categoryData.iconColor,
  };

  adminCategories[index] = updatedCategory;
  return updatedCategory;
};

export const deleteCategory = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = adminCategories.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error("Category not found");
  }

  // Check if category has products
  const hasProducts = products.some(p => p.categoryId === id);
  if (hasProducts) {
    throw new Error("Cannot delete category with products. Please reassign products first.");
  }

  // Check if category has children
  const hasChildren = adminCategories.some(c => c.parentId === id);
  if (hasChildren) {
    throw new Error("Cannot delete category with subcategories. Please delete or reassign subcategories first.");
  }

  adminCategories.splice(index, 1);
};
