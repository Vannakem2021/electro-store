import {
  AdminUser,
  AdminRole,
  AdminNotification,
  DashboardMetrics,
} from "@/types/admin";

// Simplified 2-role system - no complex permissions needed
export const mockAdminRoles: AdminRole[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full administrative access to all features",
    level: 1,
  },
  {
    id: "2",
    name: "User",
    description: "Basic access to view and manage products and orders",
    level: 2,
  },
];

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@elecxo.com",
    firstName: "John",
    lastName: "Admin",
    role: mockAdminRoles[0], // Admin
    isActive: true,
    lastLoginAt: new Date("2024-01-15T10:30:00Z"),
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    email: "user@elecxo.com",
    firstName: "Sarah",
    lastName: "User",
    role: mockAdminRoles[1], // User
    isActive: true,
    lastLoginAt: new Date("2024-01-14T15:45:00Z"),
    createdAt: new Date("2024-01-02T00:00:00Z"),
    updatedAt: new Date("2024-01-14T15:45:00Z"),
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
];

// Mock admin credentials for testing
export const mockAdminCredentials = [
  { email: "admin@elecxo.com", password: "admin123", userId: "1" },
  { email: "user@elecxo.com", password: "user123", userId: "2" },
];

// Mock notifications
export const mockNotifications: AdminNotification[] = [
  {
    id: "1",
    type: "warning",
    title: "Low Stock Alert",
    message: "5 products are running low on stock",
    isRead: false,
    createdAt: new Date("2024-01-15T08:30:00Z"),
    actionUrl: "/admin/products?filter=low-stock",
    actionText: "View Products",
  },
  {
    id: "2",
    type: "info",
    title: "New Order",
    message: "Order #ORD-001 has been placed",
    isRead: false,
    createdAt: new Date("2024-01-15T09:15:00Z"),
    actionUrl: "/admin/orders/ORD-001",
    actionText: "View Order",
  },
  {
    id: "3",
    type: "success",
    title: "Payment Received",
    message: "Payment for order #ORD-002 has been confirmed",
    isRead: true,
    createdAt: new Date("2024-01-14T16:45:00Z"),
  },
];

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalRevenue: 125430.5,
  totalOrders: 1247,
  totalCustomers: 892,
  totalProducts: 156,
  revenueChange: 12.5,
  ordersChange: 8.3,
  customersChange: 15.2,
  productsChange: 3.1,
  lowStockProducts: 5,
  pendingOrders: 23,
  recentOrders: [],
  topProducts: [],
};

// Helper function to get admin user by email
export const getAdminUserByEmail = (email: string): AdminUser | undefined => {
  return mockAdminUsers.find((user) => user.email === email);
};

// Helper function to validate admin credentials
export const validateAdminCredentials = (
  email: string,
  password: string
): AdminUser | null => {
  const credentials = mockAdminCredentials.find(
    (cred) => cred.email === email && cred.password === password
  );
  if (credentials) {
    return getAdminUserByEmail(email) || null;
  }
  return null;
};

// Helper function to check if user is admin
export const isAdmin = (user: AdminUser): boolean => {
  return user.role.level === 1;
};

// Helper function to get user's role level
export const getUserRoleLevel = (user: AdminUser): number => {
  return user.role.level;
};
