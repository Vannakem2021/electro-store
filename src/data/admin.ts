import { AdminUser, AdminRole, Permission, PERMISSIONS, AdminNotification, DashboardMetrics } from "@/types/admin";

// Mock permissions data
export const mockPermissions: Permission[] = [
  // Product permissions
  { id: '1', name: 'Create Products', resource: 'products', action: 'create', description: 'Create new products' },
  { id: '2', name: 'Read Products', resource: 'products', action: 'read', description: 'View products' },
  { id: '3', name: 'Update Products', resource: 'products', action: 'update', description: 'Edit products' },
  { id: '4', name: 'Delete Products', resource: 'products', action: 'delete', description: 'Delete products' },
  { id: '5', name: 'Bulk Product Operations', resource: 'products', action: 'bulk', description: 'Bulk product operations' },
  
  // Order permissions
  { id: '6', name: 'Create Orders', resource: 'orders', action: 'create', description: 'Create new orders' },
  { id: '7', name: 'Read Orders', resource: 'orders', action: 'read', description: 'View orders' },
  { id: '8', name: 'Update Orders', resource: 'orders', action: 'update', description: 'Edit orders' },
  { id: '9', name: 'Delete Orders', resource: 'orders', action: 'delete', description: 'Delete orders' },
  { id: '10', name: 'Fulfill Orders', resource: 'orders', action: 'fulfill', description: 'Fulfill orders' },
  { id: '11', name: 'Refund Orders', resource: 'orders', action: 'refund', description: 'Process refunds' },
  
  // Customer permissions
  { id: '12', name: 'Read Customers', resource: 'customers', action: 'read', description: 'View customers' },
  { id: '13', name: 'Update Customers', resource: 'customers', action: 'update', description: 'Edit customers' },
  { id: '14', name: 'Delete Customers', resource: 'customers', action: 'delete', description: 'Delete customers' },
  { id: '15', name: 'Customer Support', resource: 'customers', action: 'support', description: 'Handle customer support' },
  
  // Analytics permissions
  { id: '16', name: 'Read Analytics', resource: 'analytics', action: 'read', description: 'View analytics' },
  { id: '17', name: 'Export Analytics', resource: 'analytics', action: 'export', description: 'Export analytics data' },
  
  // Settings permissions
  { id: '18', name: 'Read Settings', resource: 'settings', action: 'read', description: 'View settings' },
  { id: '19', name: 'Update Settings', resource: 'settings', action: 'update', description: 'Edit settings' },
  
  // User management permissions
  { id: '20', name: 'Create Users', resource: 'users', action: 'create', description: 'Create admin users' },
  { id: '21', name: 'Read Users', resource: 'users', action: 'read', description: 'View admin users' },
  { id: '22', name: 'Update Users', resource: 'users', action: 'update', description: 'Edit admin users' },
  { id: '23', name: 'Delete Users', resource: 'users', action: 'delete', description: 'Delete admin users' },
  
  // System permissions
  { id: '24', name: 'System Backup', resource: 'system', action: 'backup', description: 'Manage system backups' },
  { id: '25', name: 'System Logs', resource: 'system', action: 'logs', description: 'View system logs' },
  { id: '26', name: 'System Maintenance', resource: 'system', action: 'maintenance', description: 'System maintenance' },
];

// Mock admin roles
export const mockAdminRoles: AdminRole[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    level: 1,
    permissions: mockPermissions, // All permissions
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Administrative access with most permissions',
    level: 2,
    permissions: mockPermissions.filter(p => !p.resource.includes('system') || p.action !== 'maintenance'),
  },
  {
    id: '3',
    name: 'Manager',
    description: 'Management access for products, orders, and customers',
    level: 3,
    permissions: mockPermissions.filter(p => 
      ['products', 'orders', 'customers', 'analytics'].includes(p.resource) && p.action !== 'delete'
    ),
  },
  {
    id: '4',
    name: 'Editor',
    description: 'Limited access for content management',
    level: 4,
    permissions: mockPermissions.filter(p => 
      p.resource === 'products' && ['read', 'update'].includes(p.action)
    ),
  },
];

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@elecxo.com',
    firstName: 'John',
    lastName: 'Admin',
    role: mockAdminRoles[0], // Super Admin
    permissions: mockAdminRoles[0].permissions,
    isActive: true,
    lastLoginAt: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    email: 'manager@elecxo.com',
    firstName: 'Sarah',
    lastName: 'Manager',
    role: mockAdminRoles[2], // Manager
    permissions: mockAdminRoles[2].permissions,
    isActive: true,
    lastLoginAt: new Date('2024-01-14T15:45:00Z'),
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-14T15:45:00Z'),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    email: 'editor@elecxo.com',
    firstName: 'Mike',
    lastName: 'Editor',
    role: mockAdminRoles[3], // Editor
    permissions: mockAdminRoles[3].permissions,
    isActive: true,
    lastLoginAt: new Date('2024-01-13T09:15:00Z'),
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-13T09:15:00Z'),
  },
];

// Mock admin credentials for testing
export const mockAdminCredentials = [
  { email: 'admin@elecxo.com', password: 'admin123', userId: '1' },
  { email: 'manager@elecxo.com', password: 'manager123', userId: '2' },
  { email: 'editor@elecxo.com', password: 'editor123', userId: '3' },
];

// Mock notifications
export const mockNotifications: AdminNotification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Stock Alert',
    message: '5 products are running low on stock',
    isRead: false,
    createdAt: new Date('2024-01-15T08:30:00Z'),
    actionUrl: '/admin/products?filter=low-stock',
    actionText: 'View Products',
  },
  {
    id: '2',
    type: 'info',
    title: 'New Order',
    message: 'Order #ORD-001 has been placed',
    isRead: false,
    createdAt: new Date('2024-01-15T09:15:00Z'),
    actionUrl: '/admin/orders/ORD-001',
    actionText: 'View Order',
  },
  {
    id: '3',
    type: 'success',
    title: 'Payment Received',
    message: 'Payment for order #ORD-002 has been confirmed',
    isRead: true,
    createdAt: new Date('2024-01-14T16:45:00Z'),
  },
];

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalRevenue: 125430.50,
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
  return mockAdminUsers.find(user => user.email === email);
};

// Helper function to validate admin credentials
export const validateAdminCredentials = (email: string, password: string): AdminUser | null => {
  const credentials = mockAdminCredentials.find(cred => cred.email === email && cred.password === password);
  if (credentials) {
    return getAdminUserByEmail(email) || null;
  }
  return null;
};

// Helper function to check if user has permission
export const hasPermission = (user: AdminUser, resource: string, action: string): boolean => {
  return user.permissions.some(permission => 
    permission.resource === resource && permission.action === action
  );
};

// Helper function to get user's role level
export const getUserRoleLevel = (user: AdminUser): number => {
  return user.role.level;
};
