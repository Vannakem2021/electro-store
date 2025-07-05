"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute } from "@/components/admin/ui";
import { mockSalesAnalytics, mockProductAnalytics } from "@/data/admin-analytics";
import {
  TrendingUpIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  PackageIcon,
  UsersIcon,
  EyeIcon,
  ArrowRightIcon,
  ChartBarIcon,
} from "@/components/ui";

const AnalyticsPage: React.FC = () => {
  const { isKhmer } = useLanguage();

  // Get overview data
  const salesData = mockSalesAnalytics;
  const productData = mockProductAnalytics;

  // Overview cards
  const overviewCards = [
    {
      title: "Total Revenue",
      value: `$${salesData.metrics.totalRevenue.toLocaleString()}`,
      change: salesData.metrics.revenueChange,
      icon: DollarSignIcon,
      color: "teal",
      href: "/admin/analytics/sales",
    },
    {
      title: "Total Orders",
      value: salesData.metrics.totalOrders.toLocaleString(),
      change: salesData.metrics.ordersChange,
      icon: ShoppingBagIcon,
      color: "blue",
      href: "/admin/analytics/sales",
    },
    {
      title: "Total Products",
      value: productData.metrics.totalProducts.toLocaleString(),
      icon: PackageIcon,
      color: "green",
      href: "/admin/analytics/products",
    },
    {
      title: "Active Products",
      value: productData.metrics.activeProducts.toLocaleString(),
      icon: TrendingUpIcon,
      color: "purple",
      href: "/admin/analytics/products",
    },
  ];

  // Report sections
  const reportSections = [
    {
      title: "Sales Reports",
      description: "Analyze sales performance, revenue trends, and customer behavior",
      icon: TrendingUpIcon,
      color: "teal",
      href: "/admin/analytics/sales",
      metrics: [
        { label: "Revenue", value: `$${salesData.metrics.totalRevenue.toLocaleString()}` },
        { label: "Orders", value: salesData.metrics.totalOrders.toLocaleString() },
        { label: "AOV", value: `$${salesData.metrics.averageOrderValue.toFixed(2)}` },
        { label: "Conversion", value: `${salesData.metrics.conversionRate.toFixed(1)}%` },
      ],
    },
    {
      title: "Product Reports",
      description: "Track product performance, inventory levels, and customer engagement",
      icon: PackageIcon,
      color: "blue",
      href: "/admin/analytics/products",
      metrics: [
        { label: "Total Products", value: productData.metrics.totalProducts.toLocaleString() },
        { label: "Active", value: productData.metrics.activeProducts.toLocaleString() },
        { label: "Low Stock", value: productData.metrics.lowStockProducts.toLocaleString() },
        { label: "Total Views", value: productData.metrics.totalViews.toLocaleString() },
      ],
    },
  ];

  return (
    <ProtectedRoute resource="analytics" action="read">
      <AdminLayout
        title="Analytics"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Analytics" },
        ]}
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-teal-100">
                <ChartBarIcon className="w-8 h-8 text-teal-600" />
              </div>
              <div className="ml-4">
                <h1
                  className={`text-2xl font-bold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Analytics Dashboard
                </h1>
                <p
                  className={`text-gray-600 mt-1 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Monitor your business performance with detailed reports and insights
                </p>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewCards.map((card, index) => (
              <Link
                key={index}
                href={card.href}
                className="bg-white rounded-md shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-md bg-${card.color}-100`}>
                    <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {card.value}
                    </p>
                    {card.change && (
                      <div className={`flex items-center text-xs mt-1 ${
                        card.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUpIcon className="w-3 h-3 mr-1" />
                        {card.change >= 0 ? '+' : ''}{card.change.toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>

          {/* Report Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportSections.map((section, index) => (
              <div key={index} className="bg-white rounded-md shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md bg-${section.color}-100`}>
                        <section.icon className={`w-6 h-6 text-${section.color}-600`} />
                      </div>
                      <div className="ml-4">
                        <h3
                          className={`text-lg font-semibold text-gray-900 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {section.title}
                        </h3>
                        <p
                          className={`text-sm text-gray-600 mt-1 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={section.href}
                      className={`flex items-center px-4 py-2 bg-${section.color}-600 text-white rounded-md hover:bg-${section.color}-700 transition-colors duration-200 font-rubik`}
                    >
                      View Report
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {section.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/analytics/sales"
                className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <TrendingUpIcon className="w-5 h-5 text-teal-600 mr-3" />
                <span className="font-medium text-gray-900">View Sales Trends</span>
              </Link>
              <Link
                href="/admin/analytics/products"
                className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <PackageIcon className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Product Performance</span>
              </Link>
              <Link
                href="/admin/products?filter=low-stock"
                className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <EyeIcon className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="font-medium text-gray-900">Stock Alerts</span>
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AnalyticsPage;
