"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatusBadgeProps {
  status: string;
  type?: "product" | "order" | "user" | "general" | "payment" | "fulfillment";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * StatusBadge component for displaying various status indicators
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "general",
  size = "md",
  className = "",
}) => {
  const { isKhmer } = useLanguage();

  const getStatusStyle = (status: string, type: string) => {
    const normalizedStatus = status.toLowerCase().replace(/[_\s]/g, "-");

    // Product-specific statuses
    if (type === "product") {
      switch (normalizedStatus) {
        case "active":
        case "published":
        case "in-stock":
          return {
            bg: "bg-green-100",
            text: "text-green-700-accessible",
            border: "border-green-200",
            dot: "bg-green-500",
          };
        case "inactive":
        case "draft":
        case "unpublished":
          return {
            bg: "bg-gray-100",
            text: "text-gray-800",
            border: "border-gray-200",
            dot: "bg-gray-500",
          };
        case "out-of-stock":
        case "discontinued":
          return {
            bg: "bg-red-100",
            text: "text-red-700-accessible",
            border: "border-red-200",
            dot: "bg-red-500",
          };
        case "low-stock":
          return {
            bg: "bg-yellow-100",
            text: "text-yellow-700-accessible",
            border: "border-yellow-200",
            dot: "bg-yellow-500",
          };
        case "featured":
          return {
            bg: "bg-purple-100",
            text: "text-purple-700-accessible",
            border: "border-purple-200",
            dot: "bg-purple-500",
          };
        case "on-sale":
        case "discounted":
          return {
            bg: "bg-orange-100",
            text: "text-orange-700-accessible",
            border: "border-orange-200",
            dot: "bg-orange-500",
          };
        default:
          return {
            bg: "bg-blue-100",
            text: "text-blue-700-accessible",
            border: "border-blue-200",
            dot: "bg-blue-500",
          };
      }
    }

    // Order-specific statuses
    if (type === "order") {
      switch (normalizedStatus) {
        case "pending":
        case "processing":
          return {
            bg: "bg-yellow-100",
            text: "text-yellow-700-accessible",
            border: "border-yellow-200",
            dot: "bg-yellow-500",
          };
        case "confirmed":
        case "paid":
          return {
            bg: "bg-blue-100",
            text: "text-blue-700-accessible",
            border: "border-blue-200",
            dot: "bg-blue-500",
          };
        case "shipped":
        case "in-transit":
          return {
            bg: "bg-indigo-100",
            text: "text-purple-700-accessible",
            border: "border-indigo-200",
            dot: "bg-indigo-500",
          };
        case "delivered":
        case "completed":
          return {
            bg: "bg-green-100",
            text: "text-green-700-accessible",
            border: "border-green-200",
            dot: "bg-green-500",
          };
        case "cancelled":
        case "refunded":
          return {
            bg: "bg-red-100",
            text: "text-red-700-accessible",
            border: "border-red-200",
            dot: "bg-red-500",
          };
        case "on-hold":
          return {
            bg: "bg-orange-100",
            text: "text-orange-700-accessible",
            border: "border-orange-200",
            dot: "bg-orange-500",
          };
        default:
          return {
            bg: "bg-gray-100",
            text: "text-gray-800",
            border: "border-gray-200",
            dot: "bg-gray-500",
          };
      }
    }

    // Payment-specific statuses
    if (type === "payment") {
      switch (normalizedStatus) {
        case "paid":
        case "completed":
          return {
            bg: "bg-green-100",
            text: "text-green-700-accessible",
            border: "border-green-200",
            dot: "bg-green-500",
          };
        case "pending":
        case "processing":
          return {
            bg: "bg-yellow-100",
            text: "text-yellow-700-accessible",
            border: "border-yellow-200",
            dot: "bg-yellow-500",
          };
        case "partially-paid":
          return {
            bg: "bg-blue-100",
            text: "text-blue-700-accessible",
            border: "border-blue-200",
            dot: "bg-blue-500",
          };
        case "failed":
        case "declined":
          return {
            bg: "bg-red-100",
            text: "text-red-700-accessible",
            border: "border-red-200",
            dot: "bg-red-500",
          };
        case "refunded":
        case "partially-refunded":
          return {
            bg: "bg-orange-100",
            text: "text-orange-700-accessible",
            border: "border-orange-200",
            dot: "bg-orange-500",
          };
        default:
          return {
            bg: "bg-gray-100",
            text: "text-gray-800",
            border: "border-gray-200",
            dot: "bg-gray-500",
          };
      }
    }

    // Fulfillment-specific statuses
    if (type === "fulfillment") {
      switch (normalizedStatus) {
        case "fulfilled":
        case "delivered":
          return {
            bg: "bg-green-100",
            text: "text-green-700-accessible",
            border: "border-green-200",
            dot: "bg-green-500",
          };
        case "shipped":
        case "in-transit":
          return {
            bg: "bg-purple-100",
            text: "text-purple-700-accessible",
            border: "border-purple-200",
            dot: "bg-purple-500",
          };
        case "partially-fulfilled":
          return {
            bg: "bg-blue-100",
            text: "text-blue-700-accessible",
            border: "border-blue-200",
            dot: "bg-blue-500",
          };
        case "unfulfilled":
        case "pending":
          return {
            bg: "bg-yellow-100",
            text: "text-yellow-700-accessible",
            border: "border-yellow-200",
            dot: "bg-yellow-500",
          };
        case "returned":
        case "cancelled":
          return {
            bg: "bg-red-100",
            text: "text-red-700-accessible",
            border: "border-red-200",
            dot: "bg-red-500",
          };
        default:
          return {
            bg: "bg-gray-100",
            text: "text-gray-800",
            border: "border-gray-200",
            dot: "bg-gray-500",
          };
      }
    }

    // User-specific statuses
    if (type === "user") {
      switch (normalizedStatus) {
        case "active":
        case "verified":
          return {
            bg: "bg-green-100",
            text: "text-green-700-accessible",
            border: "border-green-200",
            dot: "bg-green-500",
          };
        case "inactive":
        case "suspended":
          return {
            bg: "bg-red-100",
            text: "text-red-700-accessible",
            border: "border-red-200",
            dot: "bg-red-500",
          };
        case "pending":
        case "unverified":
          return {
            bg: "bg-yellow-100",
            text: "text-yellow-700-accessible",
            border: "border-yellow-200",
            dot: "bg-yellow-500",
          };
        case "banned":
          return {
            bg: "bg-red-100",
            text: "text-red-700-accessible",
            border: "border-red-200",
            dot: "bg-red-500",
          };
        default:
          return {
            bg: "bg-gray-100",
            text: "text-gray-800",
            border: "border-gray-200",
            dot: "bg-gray-500",
          };
      }
    }

    // General statuses
    switch (normalizedStatus) {
      case "success":
      case "completed":
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700-accessible",
          border: "border-green-200",
          dot: "bg-green-500",
        };
      case "error":
      case "failed":
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700-accessible",
          border: "border-red-200",
          dot: "bg-red-500",
        };
      case "warning":
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700-accessible",
          border: "border-yellow-200",
          dot: "bg-yellow-500",
        };
      case "info":
      case "processing":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700-accessible",
          border: "border-blue-200",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
          dot: "bg-gray-500",
        };
    }
  };

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

  const style = getStatusStyle(status, type);
  const sizeClasses = getSizeClasses();

  const formatStatus = (status: string) => {
    return status
      .split(/[_\s-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${
        style.bg
      } ${style.text} ${style.border} ${sizeClasses} ${
        isKhmer ? "font-khmer" : "font-rubik"
      } ${className}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${style.dot}`} />
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
