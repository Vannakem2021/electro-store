"use client";

import { useAdmin } from "@/contexts/AdminContext";

/**
 * Custom hook for permission checking with simplified 2-role system
 */
export const usePermissions = () => {
  const { user, isRole, getRoleLevel, isAdmin: isAdminUser } = useAdmin();

  /**
   * Check if user has permission for a specific resource and action
   * In our simplified system, admins have all permissions, users have read-only
   */
  const can = (resource: string, action: string): boolean => {
    if (!user) return false;

    // Admin role has all permissions
    if (isAdminUser()) return true;

    // Regular users only have read permissions
    return action === "read";
  };

  /**
   * Check if user has any of the specified permissions
   */
  const canAny = (
    permissions: Array<{ resource: string; action: string }>
  ): boolean => {
    return permissions.some(({ resource, action }) => can(resource, action));
  };

  /**
   * Check if user has all of the specified permissions
   */
  const canAll = (
    permissions: Array<{ resource: string; action: string }>
  ): boolean => {
    return permissions.every(({ resource, action }) => can(resource, action));
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (roleName: string): boolean => {
    return isRole(roleName);
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roleNames: string[]): boolean => {
    return roleNames.some((roleName) => isRole(roleName));
  };

  /**
   * Check if user's role level is at or above the specified level
   */
  const hasMinimumRoleLevel = (level: number): boolean => {
    return getRoleLevel() <= level; // Lower numbers = higher permissions
  };

  /**
   * Check if user is Admin (in our simplified system, this is the highest role)
   */
  const isAdmin = (): boolean => {
    return isAdminUser();
  };

  /**
   * Check if user is regular user
   */
  const isUser = (): boolean => {
    return hasRole("User");
  };

  /**
   * Product-specific permission checks
   */
  const products = {
    canCreate: () => can("products", "create"),
    canRead: () => can("products", "read"),
    canUpdate: () => can("products", "update"),
    canDelete: () => can("products", "delete"),
    canBulkEdit: () => can("products", "bulk"),
    canManage: () =>
      canAny([
        { resource: "products", action: "create" },
        { resource: "products", action: "update" },
        { resource: "products", action: "delete" },
      ]),
  };

  /**
   * Order-specific permission checks
   */
  const orders = {
    canCreate: () => can("orders", "create"),
    canRead: () => can("orders", "read"),
    canUpdate: () => can("orders", "update"),
    canDelete: () => can("orders", "delete"),
    canFulfill: () => can("orders", "fulfill"),
    canRefund: () => can("orders", "refund"),
    canManage: () =>
      canAny([
        { resource: "orders", action: "update" },
        { resource: "orders", action: "fulfill" },
        { resource: "orders", action: "refund" },
      ]),
  };

  /**
   * Customer-specific permission checks
   */
  const customers = {
    canRead: () => can("customers", "read"),
    canUpdate: () => can("customers", "update"),
    canDelete: () => can("customers", "delete"),
    canSupport: () => can("customers", "support"),
    canManage: () =>
      canAny([
        { resource: "customers", action: "update" },
        { resource: "customers", action: "delete" },
      ]),
  };

  /**
   * Analytics-specific permission checks
   */
  const analytics = {
    canRead: () => can("analytics", "read"),
    canExport: () => can("analytics", "export"),
  };

  /**
   * Settings-specific permission checks
   */
  const settings = {
    canRead: () => can("settings", "read"),
    canUpdate: () => can("settings", "update"),
  };

  /**
   * User management permission checks
   */
  const users = {
    canCreate: () => can("users", "create"),
    canRead: () => can("users", "read"),
    canUpdate: () => can("users", "update"),
    canDelete: () => can("users", "delete"),
    canManage: () =>
      canAny([
        { resource: "users", action: "create" },
        { resource: "users", action: "update" },
        { resource: "users", action: "delete" },
      ]),
  };

  /**
   * System-specific permission checks
   */
  const system = {
    canBackup: () => can("system", "backup"),
    canViewLogs: () => can("system", "logs"),
    canMaintenance: () => can("system", "maintenance"),
  };

  /**
   * Get user's permissions as a readable list
   */
  const getPermissionsList = () => {
    if (!user) return [];

    if (isAdminUser()) {
      return [
        {
          id: "admin-all",
          name: "Full Access",
          resource: "all",
          action: "all",
          description: "Administrator with full access to all features",
        },
      ];
    } else {
      return [
        {
          id: "user-read",
          name: "Read Only",
          resource: "all",
          action: "read",
          description: "Regular user with read-only access",
        },
      ];
    }
  };

  /**
   * Get user's role information
   */
  const getRoleInfo = () => {
    if (!user) return null;
    return {
      id: user.role.id,
      name: user.role.name,
      description: user.role.description,
      level: user.role.level,
    };
  };

  return {
    // Basic permission checks
    can,
    canAny,
    canAll,

    // Role checks
    hasRole,
    hasAnyRole,
    hasMinimumRoleLevel,
    isRole,
    isAdmin,
    isUser,

    // Resource-specific permissions
    products,
    orders,
    customers,
    analytics,
    settings,
    users,
    system,

    // Utility functions
    getPermissionsList,
    getRoleInfo,
    getRoleLevel,

    // User info
    user,
  };
};
