"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAdmin } from "@/contexts/AdminContext";
import { AdminNavItem } from "@/types/admin";
import {
  HomeIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  FolderIcon,
  WarehouseIcon,
  ClockIcon,
  TruckIcon,
  TrendingUpIcon,
  ShieldIcon,
} from "@/components/ui/Icons";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

// Navigation items with permissions
const navigationItems: AdminNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: "home",
    permission: undefined, // No permission required for dashboard
  },
  {
    id: "products",
    label: "Products",
    href: "/admin/products",
    icon: "package",
    permission: "products:read",
    children: [
      {
        id: "all-products",
        label: "All Products",
        href: "/admin/products",
        icon: "package",
        permission: "products:read",
      },
      {
        id: "add-product",
        label: "Add Product",
        href: "/admin/products/add",
        icon: "plus",
        permission: "products:create",
      },
      {
        id: "categories",
        label: "Categories",
        href: "/admin/products/categories",
        icon: "folder",
        permission: "products:read",
      },
      {
        id: "inventory",
        label: "Inventory",
        href: "/admin/products/inventory",
        icon: "warehouse",
        permission: "products:read",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    href: "/admin/orders",
    icon: "shopping-bag",
    permission: "orders:read",
    badge: "23", // Mock pending orders count
    children: [
      {
        id: "all-orders",
        label: "All Orders",
        href: "/admin/orders",
        icon: "shopping-bag",
        permission: "orders:read",
      },
      {
        id: "pending-orders",
        label: "Pending",
        href: "/admin/orders?status=pending",
        icon: "clock",
        permission: "orders:read",
        badge: "23",
      },
      {
        id: "shipped-orders",
        label: "Shipped",
        href: "/admin/orders?status=shipped",
        icon: "truck",
        permission: "orders:read",
      },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    href: "/admin/customers",
    icon: "users",
    permission: "customers:read",
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/admin/analytics",
    icon: "chart-bar",
    permission: "analytics:read",
    children: [
      {
        id: "sales-reports",
        label: "Sales Reports",
        href: "/admin/analytics/sales",
        icon: "trending-up",
        permission: "analytics:read",
      },
      {
        id: "product-reports",
        label: "Product Reports",
        href: "/admin/analytics/products",
        icon: "package",
        permission: "analytics:read",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    href: "/admin/settings",
    icon: "cog",
    permission: "settings:read",
  },
  {
    id: "permissions",
    label: "Permissions Demo",
    href: "/admin/permissions",
    icon: "shield",
    permission: "settings:read",
  },
];

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  home: HomeIcon,
  package: PackageIcon,
  "shopping-bag": ShoppingBagIcon,
  users: UsersIcon,
  "chart-bar": ChartBarIcon,
  cog: CogIcon,
  plus: PlusIcon,
  folder: FolderIcon,
  warehouse: WarehouseIcon,
  clock: ClockIcon,
  truck: TruckIcon,
  "trending-up": TrendingUpIcon,
  shield: ShieldIcon,
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { hasPermission, user } = useAdmin();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["products"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const canAccessItem = (item: AdminNavItem) => {
    if (!item.permission) return true;
    const [resource, action] = item.permission.split(":");
    return hasPermission(resource, action);
  };

  const renderNavItem = (item: AdminNavItem, level = 0) => {
    if (!canAccessItem(item)) return null;

    const IconComponent = iconMap[item.icon] || PackageIcon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id}>
        <div
          className={`flex items-center ${
            level > 0 ? "pl-8" : "pl-4"
          } pr-4 py-3 text-sm font-medium transition-colors duration-200 ${
            active
              ? "bg-teal-100 text-teal-800 border-r-2 border-teal-600"
              : "text-gray-700 hover:bg-gray-100 hover:text-teal-700"
          } ${isKhmer ? "font-khmer" : "font-rubik"}`}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="flex items-center w-full text-left"
            >
              <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  )}
                </>
              )}
            </button>
          ) : (
            <Link href={item.href} className="flex items-center w-full">
              <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )}
        </div>

        {/* Render children */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="bg-gray-50">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col h-full`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <Link
            href="/admin"
            className="text-xl font-bold text-teal-800 hover:text-teal-900 transition-colors font-rubik"
          >
            Elecxo Admin
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate font-rubik">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate font-rubik">
                {user.role.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
