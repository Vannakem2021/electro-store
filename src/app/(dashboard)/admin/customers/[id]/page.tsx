"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, StatusBadge } from "@/components/admin/ui";
import { adminCustomers } from "@/data/admin-customers";
import {
  UserCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  EditIcon,
  MapPinIcon,
} from "@/components/ui";

const CustomerDetailPage: React.FC = () => {
  const params = useParams();
  const customerId = params.id as string;

  // Find customer by ID
  const customer = adminCustomers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <AdminLayout
        title="Customer Not Found"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: "Not Found" },
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The customer you're looking for doesn't exist.
          </p>
          <Link
            href="/admin/customers"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
          >
            Back to Customers
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <ProtectedRoute resource="customers" action="read">
      <AdminLayout
        title={`${customer.firstName} ${customer.lastName}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: `${customer.firstName} ${customer.lastName}` },
        ]}
      >
        <div className="space-y-6">
          {/* Customer Header */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl font-medium mr-4">
                  {customer.firstName.charAt(0)}
                  {customer.lastName.charAt(0)}
                </div>
                <div>
                  <h1
                    className={`text-2xl font-bold text-gray-900 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {customer.firstName} {customer.lastName}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <StatusBadge
                      status={customer.status}
                      variant={
                        customer.status === "active"
                          ? "success"
                          : customer.status === "suspended"
                          ? "error"
                          : "warning"
                      }
                    />
                    <StatusBadge
                      status={customer.type}
                      variant={
                        customer.type === "vip"
                          ? "success"
                          : customer.type === "wholesale"
                          ? "info"
                          : "default"
                      }
                    />
                    {customer.isVerified && (
                      <div className="flex items-center text-sm text-green-600">
                        <UserCheckIcon className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Link
                href={`/admin/customers/${customer.id}/edit`}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
              >
                <EditIcon className="w-4 h-4 mr-2" />
                Edit Customer
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-md shadow-sm p-6">
                <h2
                  className={`text-lg font-semibold text-gray-900 mb-4 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">
                          {customer.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">
                          {customer.address.street}
                        </p>
                        <p className="text-gray-600">
                          {customer.address.city}, {customer.address.province}{" "}
                          {customer.address.postalCode}
                        </p>
                        <p className="text-gray-600">
                          {customer.address.country}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order History Summary */}
              <div className="bg-white rounded-md shadow-sm p-6">
                <h2
                  className={`text-lg font-semibold text-gray-900 mb-4 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Order Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-md">
                    <ShoppingBagIcon className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {customer.totalOrders}
                    </p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-md">
                    <CurrencyDollarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      ${customer.totalSpent.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-md">
                    <CurrencyDollarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      ${customer.averageOrderValue.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Average Order</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {customer.notes && (
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h2
                    className={`text-lg font-semibold text-gray-900 mb-4 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Notes
                  </h2>
                  <p className="text-gray-700">{customer.notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Details */}
              <div className="bg-white rounded-md shadow-sm p-6">
                <h3
                  className={`text-lg font-semibold text-gray-900 mb-4 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Account Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600">Joined</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {customer.lastLoginAt && (
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Last Login</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(customer.lastLoginAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {customer.lastOrderDate && (
                    <div className="flex items-center">
                      <ShoppingBagIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Last Order</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(
                            customer.lastOrderDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {customer.tags.length > 0 && (
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h3
                    className={`text-lg font-semibold text-gray-900 mb-4 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {customer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default CustomerDetailPage;
