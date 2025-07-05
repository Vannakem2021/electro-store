/**
 * Admin Customer Management Types
 * Following simplified patterns established for products and categories
 */

// Customer status types
export type CustomerStatus = "active" | "inactive" | "suspended";
export type CustomerType = "regular" | "vip" | "wholesale";

// Customer interface for admin management
export interface AdminCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  
  // Status & Type
  status: CustomerStatus;
  type: CustomerType;
  isVerified: boolean;
  
  // Address Information
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  
  // Order Statistics
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  
  // Account Information
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  
  // Admin fields
  notes?: string;
  tags: string[];
}

// Simplified customer form data (following product/category pattern)
export interface CustomerFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: CustomerStatus;
  type: CustomerType;
  notes?: string;
  tags: string[];
}

// Customer validation errors
export interface CustomerValidationErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: string | undefined;
}

// Customer filters for data table
export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus[];
  type?: CustomerType[];
  verified?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

// Customer sorting options
export interface CustomerSortOptions {
  field: CustomerSortField;
  direction: "asc" | "desc";
}

export type CustomerSortField =
  | "firstName"
  | "lastName"
  | "email"
  | "totalOrders"
  | "totalSpent"
  | "createdAt"
  | "lastLoginAt";

// Customer statistics
export interface CustomerStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  verified: number;
  unverified: number;
  vip: number;
  wholesale: number;
  newThisMonth: number;
  totalRevenue: number;
  averageOrderValue: number;
}

// Customer bulk actions
export type CustomerBulkAction =
  | "activate"
  | "deactivate"
  | "suspend"
  | "verify"
  | "unverify"
  | "delete"
  | "export";
