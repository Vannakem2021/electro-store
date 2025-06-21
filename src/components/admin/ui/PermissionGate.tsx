"use client";

import React from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionGateProps {
  children: React.ReactNode;
  resource?: string;
  action?: string;
  permissions?: Array<{ resource: string; action: string }>;
  roles?: string[];
  minimumRoleLevel?: number;
  requireAll?: boolean; // For multiple permissions, require all (default: false - require any)
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

/**
 * PermissionGate component that conditionally renders children based on user permissions
 * 
 * Usage examples:
 * - <PermissionGate resource="products" action="create">...</PermissionGate>
 * - <PermissionGate roles={["Admin", "Manager"]}>...</PermissionGate>
 * - <PermissionGate minimumRoleLevel={2}>...</PermissionGate>
 * - <PermissionGate permissions={[{resource: "products", action: "read"}]} requireAll>...</PermissionGate>
 */
const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  resource,
  action,
  permissions,
  roles,
  minimumRoleLevel,
  requireAll = false,
  fallback = null,
  showFallback = true,
}) => {
  const {
    can,
    canAny,
    canAll,
    hasAnyRole,
    hasMinimumRoleLevel,
  } = usePermissions();

  // Check single resource/action permission
  if (resource && action) {
    if (!can(resource, action)) {
      return showFallback ? <>{fallback}</> : null;
    }
  }

  // Check multiple permissions
  if (permissions && permissions.length > 0) {
    const hasPermission = requireAll ? canAll(permissions) : canAny(permissions);
    if (!hasPermission) {
      return showFallback ? <>{fallback}</> : null;
    }
  }

  // Check roles
  if (roles && roles.length > 0) {
    if (!hasAnyRole(roles)) {
      return showFallback ? <>{fallback}</> : null;
    }
  }

  // Check minimum role level
  if (minimumRoleLevel !== undefined) {
    if (!hasMinimumRoleLevel(minimumRoleLevel)) {
      return showFallback ? <>{fallback}</> : null;
    }
  }

  return <>{children}</>;
};

export default PermissionGate;
