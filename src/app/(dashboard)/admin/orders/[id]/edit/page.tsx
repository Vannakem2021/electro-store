"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  AdminLayout,
  ProtectedRoute,
  FormField,
  StatusBadge,
  PermissionGate,
} from "@/components/admin";
import {
  ShoppingBagIcon,
  SaveIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
} from "@/components/ui";
import { getOrderById } from "@/data/admin-orders";
import type {
  AdminOrder,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
} from "@/types/admin-order";

const AdminOrderEditPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";
  const orderId = params.id as string;

  // Get order data
  const originalOrder = useMemo(() => getOrderById(orderId), [orderId]);

  // State for form data
  const [formData, setFormData] = useState(() => {
    if (!originalOrder) return null;
    return {
      status: originalOrder.status,
      paymentStatus: originalOrder.paymentStatus,
      fulfillmentStatus: originalOrder.fulfillmentStatus,
      customerName: originalOrder.customerName,
      customerEmail: originalOrder.customerEmail,
      customerPhone: originalOrder.customerPhone || "",
      shippingAddress: { ...originalOrder.shippingAddress },
      billingAddress: { ...originalOrder.billingAddress },
      shippingMethod: originalOrder.shippingInfo?.method || "",
      trackingNumber: originalOrder.shippingInfo?.trackingNumber || "",
      trackingUrl: originalOrder.shippingInfo?.trackingUrl || "",
      notes: "",
      tags: originalOrder.tags.join(", "),
      priority: originalOrder.priority,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "customer" | "shipping" | "payment"
  >("general");

  if (!originalOrder || !formData) {
    return (
      <ProtectedRoute resource="orders" action="update">
        <AdminLayout
          title="Order Not Found"
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Orders", href: "/admin/orders" },
            { label: "Not Found" },
          ]}
        >
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Order not found
            </h3>
            <p className="mt-1 text-sm text-gray-500-accessible">
              The order you're trying to edit doesn't exist or has been removed.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/orders"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus-accessible"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // Handle form changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newData = { ...prev, [field]: value };
      setHasChanges(true);
      return newData;
    });
  };

  // Handle address changes
  const handleAddressChange = (
    type: "shipping" | "billing",
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newData = {
        ...prev,
        [`${type}Address`]: {
          ...prev[`${type}Address` as keyof typeof prev],
          [field]: value,
        },
      };
      setHasChanges(true);
      return newData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    try {
      // Mock API call - in real app this would update the order
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message and redirect
      alert("Order updated successfully!");
      router.push(`/admin/orders/${orderId}`);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error updating order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Tab navigation
  const tabs = [
    { id: "general", label: "General", icon: ShoppingBagIcon },
    { id: "customer", label: "Customer", icon: UserIcon },
    { id: "shipping", label: "Shipping", icon: TruckIcon },
    { id: "payment", label: "Payment", icon: CreditCardIcon },
  ] as const;

  return (
    <ProtectedRoute resource="orders" action="update">
      <AdminLayout
        title={`Edit Order ${originalOrder.orderNumber}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          {
            label: originalOrder.orderNumber,
            href: `/admin/orders/${orderId}`,
          },
          { label: "Edit" },
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Link
              href={`/admin/orders/${orderId}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Order
            </Link>
            <button
              type="submit"
              form="order-edit-form"
              disabled={!hasChanges || isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus-accessible transition-colors duration-200"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <ShoppingBagIcon className="w-8 h-8 text-teal-600" />
                  <div>
                    <h1
                      className={`text-2xl font-bold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {originalOrder.orderNumber}
                    </h1>
                    <p className="text-sm text-gray-500-accessible">
                      Total: {formatPrice(originalOrder.total)} •{" "}
                      {originalOrder.items.length} items
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6">
                <div className="text-center lg:text-right">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Current Status
                  </p>
                  <div className="flex space-x-2">
                    <StatusBadge
                      status={originalOrder.status}
                      type="order"
                      size="sm"
                    />
                    <StatusBadge
                      status={originalOrder.paymentStatus}
                      type="payment"
                      size="sm"
                    />
                    <StatusBadge
                      status={originalOrder.fulfillmentStatus}
                      type="fulfillment"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Changes Warning */}
          {hasChanges && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800 font-rubik">
                  You have unsaved changes. Make sure to save your changes
                  before leaving this page.
                </p>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`${
                        activeTab === tab.id
                          ? "border-teal-500 text-teal-600"
                          : "border-transparent text-gray-500-accessible hover:text-gray-700-accessible hover:border-gray-300"
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus-accessible transition-colors duration-200`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Form Content */}
            <form id="order-edit-form" onSubmit={handleSubmit} className="p-6">
              {/* General Tab */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Order Status"
                      required
                      error=""
                      helpText="Current order processing status"
                    >
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          handleInputChange(
                            "status",
                            e.target.value as OrderStatus
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </FormField>

                    <FormField
                      label="Payment Status"
                      required
                      error=""
                      helpText="Payment processing status"
                    >
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) =>
                          handleInputChange(
                            "paymentStatus",
                            e.target.value as PaymentStatus
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="partially_paid">Partially Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                        <option value="partially_refunded">
                          Partially Refunded
                        </option>
                      </select>
                    </FormField>

                    <FormField
                      label="Fulfillment Status"
                      required
                      error=""
                      helpText="Order fulfillment status"
                    >
                      <select
                        value={formData.fulfillmentStatus}
                        onChange={(e) =>
                          handleInputChange(
                            "fulfillmentStatus",
                            e.target.value as FulfillmentStatus
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      >
                        <option value="unfulfilled">Unfulfilled</option>
                        <option value="partially_fulfilled">
                          Partially Fulfilled
                        </option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="returned">Returned</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Tags"
                      error=""
                      helpText="Comma-separated tags for organization"
                    >
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) =>
                          handleInputChange("tags", e.target.value)
                        }
                        placeholder="priority, expedited, vip"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      />
                    </FormField>

                    <FormField
                      label="Priority"
                      required
                      error=""
                      helpText="Order processing priority"
                    >
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          handleInputChange("priority", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField
                    label="Internal Notes"
                    error=""
                    helpText="Add internal notes about this order (not visible to customer)"
                  >
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      rows={4}
                      placeholder="Add internal notes about this order..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    />
                  </FormField>
                </div>
              )}

              {/* Customer Tab */}
              {activeTab === "customer" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Customer Name"
                      required
                      error=""
                      helpText="Customer's full name"
                    >
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) =>
                          handleInputChange("customerName", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      />
                    </FormField>

                    <FormField
                      label="Customer Email"
                      required
                      error=""
                      helpText="Customer's email address"
                    >
                      <input
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) =>
                          handleInputChange("customerEmail", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Customer Phone"
                    error=""
                    helpText="Customer's phone number"
                  >
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        handleInputChange("customerPhone", e.target.value)
                      }
                      placeholder="+855 12 345 678"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    />
                  </FormField>

                  {/* Billing Address */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-rubik">
                      Billing Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="First Name" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.firstName}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "firstName",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Last Name" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.lastName}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "lastName",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-6">
                      <FormField label="Company" error="">
                        <input
                          type="text"
                          value={formData.billingAddress.company || ""}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "company",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Address Line 1" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.address1}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "address1",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Address Line 2" error="">
                        <input
                          type="text"
                          value={formData.billingAddress.address2 || ""}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "address2",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <FormField label="City" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.city}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "city",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Province" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.province}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "province",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Postal Code" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.postalCode}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "postalCode",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormField label="Country" required error="">
                        <input
                          type="text"
                          value={formData.billingAddress.country}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "country",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Phone" error="">
                        <input
                          type="tel"
                          value={formData.billingAddress.phone || ""}
                          onChange={(e) =>
                            handleAddressChange(
                              "billing",
                              "phone",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Tab */}
              {activeTab === "shipping" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Shipping Method"
                      required
                      error=""
                      helpText="Shipping service and speed"
                    >
                      <select
                        value={formData.shippingMethod}
                        onChange={(e) =>
                          handleInputChange("shippingMethod", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      >
                        <option value="">Select shipping method</option>
                        <option value="standard">
                          Standard Shipping (5-7 days)
                        </option>
                        <option value="express">
                          Express Shipping (2-3 days)
                        </option>
                        <option value="overnight">
                          Overnight Shipping (1 day)
                        </option>
                        <option value="pickup">Store Pickup</option>
                      </select>
                    </FormField>

                    <FormField
                      label="Tracking Number"
                      error=""
                      helpText="Package tracking number"
                    >
                      <input
                        type="text"
                        value={formData.trackingNumber}
                        onChange={(e) =>
                          handleInputChange("trackingNumber", e.target.value)
                        }
                        placeholder="1Z999AA1234567890"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Tracking URL"
                    error=""
                    helpText="Link to track the package"
                  >
                    <input
                      type="url"
                      value={formData.trackingUrl}
                      onChange={(e) =>
                        handleInputChange("trackingUrl", e.target.value)
                      }
                      placeholder="https://www.ups.com/track?tracknum=1Z999AA1234567890"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                    />
                  </FormField>

                  {/* Shipping Address */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-rubik">
                      Shipping Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="First Name" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.firstName}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "firstName",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Last Name" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.lastName}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "lastName",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-6">
                      <FormField label="Company" error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.company || ""}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "company",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Address Line 1" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.address1}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "address1",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Address Line 2" error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.address2 || ""}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "address2",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <FormField label="City" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.city}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "city",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Province" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.province}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "province",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Postal Code" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.postalCode}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "postalCode",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormField label="Country" required error="">
                        <input
                          type="text"
                          value={formData.shippingAddress.country}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "country",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>

                      <FormField label="Phone" error="">
                        <input
                          type="tel"
                          value={formData.shippingAddress.phone || ""}
                          onChange={(e) =>
                            handleAddressChange(
                              "shipping",
                              "phone",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                        />
                      </FormField>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === "payment" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex items-center">
                      <CreditCardIcon className="w-5 h-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800 font-rubik">
                        Payment information is read-only. To modify payment
                        details, use the payment processing system.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 font-rubik">
                        Payment Method
                      </h3>
                      <div className="bg-gray-50 rounded-md p-4">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {originalOrder.paymentInfo.method.replace("_", " ")}
                        </p>
                        {originalOrder.paymentInfo.cardLast4 && (
                          <p className="text-sm text-gray-600-accessible">
                            Card ending in ****
                            {originalOrder.paymentInfo.cardLast4}
                          </p>
                        )}
                        {originalOrder.paymentInfo.cardBrand && (
                          <p className="text-sm text-gray-600-accessible">
                            {originalOrder.paymentInfo.cardBrand}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 font-rubik">
                        Transaction Details
                      </h3>
                      <div className="bg-gray-50 rounded-md p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600-accessible">
                            Transaction ID:
                          </span>
                          <span className="text-sm font-mono text-gray-900">
                            {originalOrder.paymentInfo.transactionId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600-accessible">
                            Gateway:
                          </span>
                          <span className="text-sm text-gray-900">
                            {originalOrder.paymentInfo.gateway}
                          </span>
                        </div>
                        {originalOrder.paymentInfo.processedAt && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600-accessible">
                              Processed:
                            </span>
                            <span className="text-sm text-gray-900">
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(originalOrder.paymentInfo.processedAt)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-rubik">
                      Order Totals
                    </h3>
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600-accessible">
                            Subtotal:
                          </span>
                          <span className="text-sm text-gray-900">
                            {formatPrice(originalOrder.subtotal)}
                          </span>
                        </div>
                        {originalOrder.discountTotal > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600-accessible">
                              Discount:
                            </span>
                            <span className="text-sm text-red-600">
                              -{formatPrice(originalOrder.discountTotal)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600-accessible">
                            Shipping:
                          </span>
                          <span className="text-sm text-gray-900">
                            {formatPrice(originalOrder.shippingTotal)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600-accessible">
                            Tax:
                          </span>
                          <span className="text-sm text-gray-900">
                            {formatPrice(originalOrder.taxTotal)}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex justify-between">
                            <span className="text-base font-semibold text-gray-900">
                              Total:
                            </span>
                            <span className="text-base font-bold text-gray-900">
                              {formatPrice(originalOrder.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminOrderEditPage;
