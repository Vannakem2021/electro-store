"use client";

import React from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { AccessDenied } from "./";

interface ProtectedRouteProps {
  children: React.ReactNode;
  resource?: string;
  action?: string;
  permissions?: Array<{ resource: string; action: string }>;
  roles?: string[];
  minimumRoleLevel?: number;
  requireAll?: boolean;
  fallback?: React.ReactNode;
  title?: string;
  message?: string;
}

/**
 * ProtectedRoute component that wraps entire pages/routes with permission checking
 * Shows AccessDenied component when user doesn't have required permissions
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  resource,
  action,
  permissions,
  roles,
  minimumRoleLevel,
  requireAll = false,
  fallback,
  title,
  message,
}) => {
  const {
    can,
    canAny,
    canAll,
    hasAnyRole,
    hasMinimumRoleLevel,
  } = usePermissions();

  let hasAccess = true;

  // Check single resource/action permission
  if (resource && action) {
    hasAccess = can(resource, action);
  }

  // Check multiple permissions
  if (hasAccess && permissions && permissions.length > 0) {
    hasAccess = requireAll ? canAll(permissions) : canAny(permissions);
  }

  // Check roles
  if (hasAccess && roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles);
  }

  // Check minimum role level
  if (hasAccess && minimumRoleLevel !== undefined) {
    hasAccess = hasMinimumRoleLevel(minimumRoleLevel);
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <AccessDenied
        title={title}
        message={message}
        showBackButton={true}
        showHomeButton={true}
        showRoleInfo={true}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
