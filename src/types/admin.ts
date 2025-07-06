// Admin-specific types for the Elecxo admin dashboard

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  level: number; // 1 = Admin, 2 = User
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: AdminUser;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Simple role-based access - no complex permissions needed

// Role types
export type AdminRoleType = "super_admin" | "admin" | "manager" | "editor";

// Navigation item for admin sidebar
export interface AdminNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  permission?: string;
  children?: AdminNavItem[];
  badge?: string | number;
}

// Admin dashboard metrics
export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  productsChange: number;
  lowStockProducts: number;
  pendingOrders: number;
  recentOrders: any[];
  topProducts: any[];
}

// Date range for analytics
export interface DateRange {
  start: Date;
  end: Date;
  preset?:
    | "today"
    | "yesterday"
    | "last7days"
    | "last30days"
    | "last90days"
    | "custom";
}

// Admin notification
export interface AdminNotification {
  id: string;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionText?: string;
}

// Admin activity log
export interface AdminActivity {
  id: string;
  adminId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

// API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Filter and sort options
export interface FilterOptions {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
  [key: string]: any;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// Table column definition
export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T) => React.ReactNode;
}

// Bulk action
export interface BulkAction<T = any> {
  id: string;
  label: string;
  icon?: string;
  action: (selectedItems: T[]) => void | Promise<void>;
  confirmMessage?: string;
  variant?: "default" | "danger";
}
