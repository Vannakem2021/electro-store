"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  AdminLayout,
  ProtectedRoute,
  StatusBadge,
  PermissionGate,
} from "@/components/admin";
import {
  ShoppingBagIcon,
  UserIcon,
  MapPinIcon,
  CreditCardIcon,
  TruckIcon,
  ClockIcon,
  EditIcon,
  DownloadIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@/components/ui";
import { getOrderById } from "@/data/admin-orders";
import type { AdminOrder } from "@/types/admin-order";

const AdminOrderDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";
  const orderId = params.id as string;

  // State
  const [showTimeline, setShowTimeline] = useState(true);
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);

  // Get order data
  const order = useMemo(() => getOrderById(orderId), [orderId]);

  if (!order) {
    return (
      <ProtectedRoute resource="orders" action="read">
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
              The order you're looking for doesn't exist or has been removed.
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

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "fulfilled":
      case "paid":
        return "text-green-600";
      case "shipped":
      case "processing":
        return "text-blue-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
      case "refunded":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <ProtectedRoute resource="orders" action="read">
      <AdminLayout
        title={`Order ${order.orderNumber}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: order.orderNumber },
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Print
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700-accessible bg-white hover:bg-gray-50 focus-accessible transition-colors duration-200">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </button>
            <PermissionGate resource="orders" action="update">
              <Link
                href={`/admin/orders/${order.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus-accessible transition-colors duration-200"
              >
                <EditIcon className="w-4 h-4 mr-2" />
                Edit Order
              </Link>
            </PermissionGate>
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
                      {order.orderNumber}
                    </h1>
                    <p className="text-sm text-gray-500-accessible">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6">
                <div className="text-center lg:text-right">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Order Status
                  </p>
                  <StatusBadge status={order.status} type="order" size="lg" />
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Payment Status
                  </p>
                  <StatusBadge
                    status={order.paymentStatus}
                    type="payment"
                    size="lg"
                  />
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-sm font-medium text-gray-600-accessible">
                    Fulfillment
                  </p>
                  <StatusBadge
                    status={order.fulfillmentStatus}
                    type="fulfillment"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <h2
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Order Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-600-accessible">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(order.total)}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-600-accessible">
                  Items
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-600-accessible">
                  Customer
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {order.customerName}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-600-accessible">
                  Source
                </p>
                <p className="text-lg font-bold text-gray-900 capitalize">
                  {order.source}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3
                className={`text-lg font-semibold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Order Items ({order.items.length})
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md"
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.productName}
                      </h4>
                      {item.sku && (
                        <p className="text-sm text-gray-500-accessible font-mono">
                          SKU: {item.sku}
                        </p>
                      )}
                      {item.variantTitle && (
                        <p className="text-sm text-gray-600-accessible">
                          {item.variantTitle}
                        </p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600-accessible">
                        Quantity
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600-accessible">
                        Price
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600-accessible">
                        Total
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600-accessible">
                        Status
                      </p>
                      <StatusBadge
                        status={item.fulfillmentStatus}
                        type="fulfillment"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Totals */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Order Totals
            </h3>
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600-accessible">Subtotal:</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600-accessible">Discount:</span>
                  <span className="font-medium text-red-600">
                    -{formatPrice(order.discountTotal)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600-accessible">Shipping:</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(order.shippingTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600-accessible">Tax:</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(order.taxTotal)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-semibold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Customer Information
                </h3>
                <button
                  onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                  className="text-gray-400-accessible hover:text-gray-600 focus-accessible"
                >
                  {showCustomerInfo ? (
                    <XCircleIcon className="w-5 h-5" />
                  ) : (
                    <CheckCircleIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {showCustomerInfo && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <UserIcon className="w-5 h-5 text-gray-400-accessible" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-gray-500-accessible">
                        {order.customerEmail}
                      </p>
                      {order.customerPhone && (
                        <p className="text-sm text-gray-500-accessible">
                          {order.customerPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Billing Address
                    </h4>
                    <div className="text-sm text-gray-600-accessible space-y-1">
                      <p>
                        {order.billingAddress.firstName}{" "}
                        {order.billingAddress.lastName}
                      </p>
                      {order.billingAddress.company && (
                        <p>{order.billingAddress.company}</p>
                      )}
                      <p>{order.billingAddress.address1}</p>
                      {order.billingAddress.address2 && (
                        <p>{order.billingAddress.address2}</p>
                      )}
                      <p>
                        {order.billingAddress.city},{" "}
                        {order.billingAddress.province}{" "}
                        {order.billingAddress.postalCode}
                      </p>
                      <p>{order.billingAddress.country}</p>
                      {order.billingAddress.phone && (
                        <p>{order.billingAddress.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h3
                className={`text-lg font-semibold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Shipping Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400-accessible" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Shipping Address
                    </h4>
                    <div className="text-sm text-gray-600-accessible space-y-1">
                      <p>
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      {order.shippingAddress.company && (
                        <p>{order.shippingAddress.company}</p>
                      )}
                      <p>{order.shippingAddress.address1}</p>
                      {order.shippingAddress.address2 && (
                        <p>{order.shippingAddress.address2}</p>
                      )}
                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.province}{" "}
                        {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                      {order.shippingAddress.phone && (
                        <p>{order.shippingAddress.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {order.shippingInfo && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <TruckIcon className="w-5 h-5 text-gray-400-accessible" />
                      <h4 className="font-medium text-gray-900">
                        Shipping Details
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600-accessible">
                          Method:
                        </span>
                        <span className="text-gray-900">
                          {order.shippingInfo.method}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600-accessible">Cost:</span>
                        <span className="text-gray-900">
                          {formatPrice(order.shippingInfo.cost)}
                        </span>
                      </div>
                      {order.shippingInfo.carrier && (
                        <div className="flex justify-between">
                          <span className="text-gray-600-accessible">
                            Carrier:
                          </span>
                          <span className="text-gray-900">
                            {order.shippingInfo.carrier}
                          </span>
                        </div>
                      )}
                      {order.shippingInfo.trackingNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600-accessible">
                            Tracking:
                          </span>
                          <span className="text-gray-900 font-mono">
                            {order.shippingInfo.trackingNumber}
                          </span>
                        </div>
                      )}
                      {order.shippingInfo.estimatedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-gray-600-accessible">
                            Est. Delivery:
                          </span>
                          <span className="text-gray-900">
                            {formatDate(order.shippingInfo.estimatedDelivery)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Payment Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CreditCardIcon className="w-5 h-5 text-gray-400-accessible" />
                  <div>
                    <p className="font-medium text-gray-900">Payment Method</p>
                    <p className="text-sm text-gray-600-accessible capitalize">
                      {order.paymentInfo.method.replace("_", " ")}
                    </p>
                  </div>
                </div>

                {order.paymentInfo.cardLast4 && (
                  <div className="text-sm">
                    <span className="text-gray-600-accessible">
                      Card ending in:{" "}
                    </span>
                    <span className="font-mono text-gray-900">
                      ****{order.paymentInfo.cardLast4}
                    </span>
                  </div>
                )}

                {order.paymentInfo.cardBrand && (
                  <div className="text-sm">
                    <span className="text-gray-600-accessible">
                      Card type:{" "}
                    </span>
                    <span className="text-gray-900">
                      {order.paymentInfo.cardBrand}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-gray-600-accessible">
                    Transaction ID:{" "}
                  </span>
                  <span className="font-mono text-gray-900">
                    {order.paymentInfo.transactionId}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600-accessible">Gateway: </span>
                  <span className="text-gray-900">
                    {order.paymentInfo.gateway}
                  </span>
                </div>

                {order.paymentInfo.processedAt && (
                  <div className="text-sm">
                    <span className="text-gray-600-accessible">
                      Processed:{" "}
                    </span>
                    <span className="text-gray-900">
                      {formatDate(order.paymentInfo.processedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Order Timeline
              </h3>
              <button
                onClick={() => setShowTimeline(!showTimeline)}
                className="text-gray-400-accessible hover:text-gray-600 focus-accessible"
              >
                {showTimeline ? (
                  <XCircleIcon className="w-5 h-5" />
                ) : (
                  <CheckCircleIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {showTimeline && (
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <ClockIcon className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {event.title}
                        </p>
                        <p className="text-sm text-gray-500-accessible">
                          {formatDate(event.createdAt)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600-accessible">
                        {event.description}
                      </p>
                      {event.createdBy !== "system" && (
                        <p className="text-xs text-gray-500-accessible">
                          by {event.createdBy}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Notes */}
          {order.notes.length > 0 && (
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <h3
                className={`text-lg font-semibold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Order Notes
              </h3>
              <div className="space-y-4">
                {order.notes.map((note) => (
                  <div
                    key={note.id}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {note.isPrivate ? "Private Note" : "Customer Note"}
                      </span>
                      <span className="text-sm text-gray-500-accessible">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600-accessible">
                      {note.message}
                    </p>
                    <p className="text-xs text-gray-500-accessible mt-1">
                      by {note.createdBy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminOrderDetailPage;
