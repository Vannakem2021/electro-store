"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const OrdersPage: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 299.99,
      items: [
        {
          name: "Wireless Bluetooth Headphones",
          quantity: 1,
          price: 299.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "processing",
      total: 599.98,
      items: [
        {
          name: "Smart Watch Series 8",
          quantity: 1,
          price: 399.99,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        },
        {
          name: "Wireless Charger",
          quantity: 1,
          price: 199.99,
          image:
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      status: "shipped",
      total: 1299.99,
      items: [
        {
          name: "4K Action Camera",
          quantity: 1,
          price: 1299.99,
          image:
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop",
        },
      ],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const sidebarItems = [
    {
      icon: "👤",
      label: "Personal Data",
      href: "/account/personal",
      active: false,
    },
    {
      icon: "💳",
      label: "Payment & Installments",
      href: "/account/payment",
      active: false,
    },
    { icon: "📦", label: "Orders", href: "/account/orders", active: true },
    {
      icon: "❤️",
      label: "Wish list",
      href: "/account/wishlist",
      active: false,
    },
    {
      icon: "🏷️",
      label: "Discounts",
      href: "/account/discounts",
      active: false,
    },
    {
      icon: "🔒",
      label: "Security & access",
      href: "/account/security",
      active: false,
    },
    { icon: "🔔", label: "Notification", href: "/account", active: false },
    {
      icon: "📞",
      label: "Contact us",
      href: "/account/contact",
      active: false,
    },
    {
      icon: "🚪",
      label: "Log out",
      href: "/logout",
      active: false,
      isLogout: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-poppins">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-800 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href="/account"
            className="text-gray-600 hover:text-blue-800 transition-colors duration-200"
          >
            Account
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Orders</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              {/* User Profile Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-poppins">
                      Ayman ahmed
                    </h3>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="p-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-poppins text-sm ${
                      item.active
                        ? "bg-blue-50 text-blue-800 border-r-4 border-blue-800"
                        : item.isLogout
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">
                  Orders
                </h1>
                <p className="text-gray-600 font-poppins">
                  Track and manage your orders
                </p>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors duration-200"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="font-semibold text-gray-900 font-poppins">
                          Order {order.id}
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        <span className="font-bold text-gray-900 font-poppins">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 font-poppins">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600 font-poppins">
                              Quantity: {item.quantity} × $
                              {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-poppins font-semibold"
                      >
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-poppins font-semibold"
                        >
                          Reorder
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-poppins font-semibold text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Cancel Order
                        </Button>
                      )}
                      {(order.status === "shipped" ||
                        order.status === "processing") && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-poppins font-semibold"
                        >
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State (if no orders) */}
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-3xl">📦</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 font-poppins mb-6">
                    When you place your first order, it will appear here.
                  </p>
                  <Button className="font-poppins font-semibold">
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
