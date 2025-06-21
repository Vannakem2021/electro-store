"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { Permission } from "@/types/admin";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

interface PermissionsListProps {
  permissions: Permission[];
  title?: string;
  groupByResource?: boolean;
  showDescription?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * PermissionsList component for displaying user permissions in an organized way
 */
const PermissionsList: React.FC<PermissionsListProps> = ({
  permissions,
  title = "Permissions",
  groupByResource = true,
  showDescription = true,
  compact = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // Group permissions by resource
  const groupedPermissions = groupByResource
    ? permissions.reduce((groups, permission) => {
        const resource = permission.resource;
        if (!groups[resource]) {
          groups[resource] = [];
        }
        groups[resource].push(permission);
        return groups;
      }, {} as Record<string, Permission[]>)
    : { all: permissions };

  const toggleGroup = (resource: string) => {
    setExpandedGroups((prev) =>
      prev.includes(resource)
        ? prev.filter((r) => r !== resource)
        : [...prev, resource]
    );
  };

  const getResourceIcon = (resource: string) => {
    switch (resource.toLowerCase()) {
      case "products":
        return "📦";
      case "orders":
        return "🛒";
      case "customers":
        return "👥";
      case "analytics":
        return "📊";
      case "settings":
        return "⚙️";
      case "users":
        return "👤";
      case "system":
        return "🔧";
      default:
        return "🔑";
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "create":
        return "text-green-600";
      case "read":
        return "text-blue-600";
      case "update":
        return "text-yellow-600";
      case "delete":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (permissions.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <XCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className={`text-gray-500 ${isKhmer ? "font-khmer" : "font-rubik"}`}>
          No permissions assigned
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {title && (
        <h3
          className={`text-lg font-semibold text-gray-900 mb-4 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {title}
        </h3>
      )}

      <div className="space-y-3">
        {Object.entries(groupedPermissions).map(
          ([resource, resourcePermissions]) => {
            const isExpanded =
              expandedGroups.includes(resource) || !groupByResource;
            const resourceName =
              resource === "all"
                ? "All Permissions"
                : capitalizeFirst(resource);

            return (
              <div
                key={resource}
                className="bg-white border border-gray-200 rounded-md overflow-hidden"
              >
                {groupByResource && resource !== "all" && (
                  <button
                    onClick={() => toggleGroup(resource)}
                    className="w-full px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">
                        {getResourceIcon(resource)}
                      </span>
                      <span
                        className={`font-medium text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {resourceName}
                      </span>
                      <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full font-medium">
                        {resourcePermissions.length}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                )}

                {isExpanded && (
                  <div className={compact ? "p-2" : "p-4"}>
                    <div className="space-y-2">
                      {resourcePermissions.map((permission) => (
                        <div
                          key={permission.id}
                          className={`flex items-start ${
                            compact ? "py-1" : "py-2"
                          } border-b border-gray-100 last:border-b-0`}
                        >
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`font-medium text-gray-900 ${
                                  isKhmer ? "font-khmer" : "font-rubik"
                                }`}
                              >
                                {permission.name}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${getActionColor(
                                  permission.action
                                )} font-mono`}
                              >
                                {permission.action.toUpperCase()}
                              </span>
                            </div>
                            {showDescription && permission.description && (
                              <p
                                className={`text-sm text-gray-600 mt-1 ${
                                  isKhmer ? "font-khmer" : "font-rubik"
                                }`}
                              >
                                {permission.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <p
          className={`text-sm text-teal-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          <span className="font-medium">Total Permissions:</span>{" "}
          {permissions.length}
          {groupByResource && (
            <>
              {" "}
              <span className="mx-2">•</span>
              <span className="font-medium">Resources:</span>{" "}
              {
                Object.keys(groupedPermissions).filter((r) => r !== "all")
                  .length
              }
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default PermissionsList;
