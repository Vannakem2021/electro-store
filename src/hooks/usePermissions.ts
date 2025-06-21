"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { PERMISSIONS } from "@/types/admin";

/**
 * Custom hook for permission checking with enhanced functionality
 */
export const usePermissions = () => {
  const { user, hasPermission, isRole, getRoleLevel } = useAdmin();

  /**
   * Check if user has permission for a specific resource and action
   */
  const can = (resource: string, action: string): boolean => {
    return hasPermission(resource, action);
  };

  /**
   * Check if user has any of the specified permissions
   */
  const canAny = (permissions: Array<{ resource: string; action: string }>): boolean => {
    return permissions.some(({ resource, action }) => hasPermission(resource, action));
  };

  /**
   * Check if user has all of the specified permissions
   */
  const canAll = (permissions: Array<{ resource: string; action: string }>): boolean => {
    return permissions.every(({ resource, action }) => hasPermission(resource, action));
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
    return roleNames.some(roleName => isRole(roleName));
  };

  /**
   * Check if user's role level is at or above the specified level
   */
  const hasMinimumRoleLevel = (level: number): boolean => {
    return getRoleLevel() <= level; // Lower numbers = higher permissions
  };

  /**
   * Check if user is Super Admin
   */
  const isSuperAdmin = (): boolean => {
    return hasRole("Super Admin") || getRoleLevel() === 1;
  };

  /**
   * Check if user is Admin or higher
   */
  const isAdmin = (): boolean => {
    return hasMinimumRoleLevel(2);
  };

  /**
   * Check if user is Manager or higher
   */
  const isManager = (): boolean => {
    return hasMinimumRoleLevel(3);
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
    canManage: () => canAny([
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
    canManage: () => canAny([
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
    canManage: () => canAny([
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
    canManage: () => canAny([
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
    return user?.permissions.map(p => ({
      id: p.id,
      name: p.name,
      resource: p.resource,
      action: p.action,
      description: p.description,
    })) || [];
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
    hasPermission,

    // Role checks
    hasRole,
    hasAnyRole,
    hasMinimumRoleLevel,
    isRole,
    isSuperAdmin,
    isAdmin,
    isManager,

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
