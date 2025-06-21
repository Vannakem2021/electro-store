"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminRole } from "@/types/admin";

interface RoleBadgeProps {
  role: AdminRole | string;
  size?: "sm" | "md" | "lg";
  showLevel?: boolean;
  className?: string;
}

/**
 * RoleBadge component for displaying user roles with appropriate styling
 */
const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  size = "md",
  showLevel = false,
  className = "",
}) => {
  const { isKhmer } = useLanguage();

  // Extract role information
  const roleName = typeof role === "string" ? role : role.name;
  const roleLevel = typeof role === "string" ? null : role.level;

  // Determine badge styling based on role
  const getBadgeStyle = (name: string) => {
    const normalizedName = name.toLowerCase();

    if (normalizedName.includes("super admin")) {
      return {
        bg: "bg-purple-100",
        text: "text-purple-700-accessible",
        border: "border-purple-200",
      };
    }

    if (normalizedName.includes("admin")) {
      return {
        bg: "bg-red-100",
        text: "text-red-700-accessible",
        border: "border-red-200",
      };
    }

    if (normalizedName.includes("manager")) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-700-accessible",
        border: "border-blue-200",
      };
    }

    if (normalizedName.includes("editor")) {
      return {
        bg: "bg-green-100",
        text: "text-green-700-accessible",
        border: "border-green-200",
      };
    }

    // Default styling
    return {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
    };
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "lg":
        return "px-4 py-2 text-base";
      default:
        return "px-3 py-1 text-sm";
    }
  };

  const style = getBadgeStyle(roleName);
  const sizeClasses = getSizeClasses();

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${
        style.bg
      } ${style.text} ${style.border} ${sizeClasses} ${
        isKhmer ? "font-khmer" : "font-rubik"
      } ${className}`}
    >
      {roleName}
      {showLevel && roleLevel && (
        <span className="ml-1 text-xs opacity-75">(L{roleLevel})</span>
      )}
    </span>
  );
};

export default RoleBadge;
