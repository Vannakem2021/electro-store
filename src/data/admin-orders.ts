import {
  AdminOrder,
  OrderStats,
  OrderFilters,
  OrderSortOptions,
  OrderAction,
} from "@/types/admin-order";
import { adminProducts } from "./admin-products";

// Generate realistic mock order data
export const adminOrders: AdminOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerId: "cust_001",
    customerEmail: "john.doe@example.com",
    customerName: "John Doe",
    customerPhone: "+855 12 345 678",
    status: "delivered",
    paymentStatus: "paid",
    fulfillmentStatus: "fulfilled",
    items: [
      {
        id: "item_1",
        productId: "1",
        productName: "Wireless Bluetooth Headphones",
        productImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        sku: "SKU-000001",
        quantity: 1,
        price: 299.99,
        totalPrice: 299.99,
        requiresShipping: true,
        taxable: true,
        taxRate: 0.1,
        taxAmount: 29.99,
        fulfillmentStatus: "fulfilled",
        trackingNumber: "TRK123456789",
        trackingUrl: "https://tracking.example.com/TRK123456789",
      },
    ],
    subtotal: 299.99,
    taxTotal: 29.99,
    shippingTotal: 15.0,
    discountTotal: 0,
    total: 344.98,
    currency: "USD",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main Street",
      city: "Phnom Penh",
      province: "Phnom Penh",
      postalCode: "12000",
      country: "Cambodia",
      phone: "+855 12 345 678",
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main Street",
      city: "Phnom Penh",
      province: "Phnom Penh",
      postalCode: "12000",
      country: "Cambodia",
      phone: "+855 12 345 678",
    },
    paymentInfo: {
      method: "aba_pay",
      status: "paid",
      transactionId: "txn_001",
      amount: 344.98,
      currency: "USD",
      processedAt: new Date("2024-01-15T10:30:00Z"),
      gateway: "ABA Pay",
    },
    shippingInfo: {
      method: "Standard Shipping",
      cost: 15.0,
      estimatedDelivery: new Date("2024-01-20T00:00:00Z"),
      trackingNumber: "TRK123456789",
      trackingUrl: "https://tracking.example.com/TRK123456789",
      carrier: "Cambodia Post",
      service: "Standard",
      shippedAt: new Date("2024-01-16T09:00:00Z"),
      deliveredAt: new Date("2024-01-19T14:30:00Z"),
    },
    discounts: [],
    notes: [
      {
        id: "note_1",
        message: "Customer requested expedited shipping",
        isPrivate: false,
        createdBy: "admin_001",
        createdAt: new Date("2024-01-15T10:35:00Z"),
      },
    ],
    timeline: [
      {
        id: "timeline_1",
        type: "status_change",
        title: "Order Placed",
        description: "Order was successfully placed",
        createdBy: "system",
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
      {
        id: "timeline_2",
        type: "payment",
        title: "Payment Received",
        description: "Payment of $344.98 was processed via ABA Pay",
        createdBy: "system",
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
      {
        id: "timeline_3",
        type: "fulfillment",
        title: "Order Shipped",
        description: "Order shipped with tracking number TRK123456789",
        createdBy: "admin_001",
        createdAt: new Date("2024-01-16T09:00:00Z"),
      },
      {
        id: "timeline_4",
        type: "fulfillment",
        title: "Order Delivered",
        description: "Order was successfully delivered",
        createdBy: "system",
        createdAt: new Date("2024-01-19T14:30:00Z"),
      },
    ],
    source: "online",
    tags: ["priority", "expedited"],
    riskLevel: "low",
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-19T14:30:00Z"),
    processedAt: new Date("2024-01-15T10:30:00Z"),
    shippedAt: new Date("2024-01-16T09:00:00Z"),
    deliveredAt: new Date("2024-01-19T14:30:00Z"),
    priority: "normal",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerId: "cust_002",
    customerEmail: "jane.smith@example.com",
    customerName: "Jane Smith",
    customerPhone: "+855 98 765 432",
    status: "processing",
    paymentStatus: "paid",
    fulfillmentStatus: "partially_fulfilled",
    items: [
      {
        id: "item_2",
        productId: "2",
        productName: "Smart Watch Series 8",
        productImage:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        sku: "SKU-000002",
        quantity: 1,
        price: 399.99,
        totalPrice: 399.99,
        requiresShipping: true,
        taxable: true,
        taxRate: 0.1,
        taxAmount: 39.99,
        fulfillmentStatus: "fulfilled",
        trackingNumber: "TRK987654321",
      },
      {
        id: "item_3",
        productId: "3",
        productName: "Wireless Charger",
        productImage:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
        sku: "SKU-000003",
        quantity: 2,
        price: 49.99,
        totalPrice: 99.98,
        requiresShipping: true,
        taxable: true,
        taxRate: 0.1,
        taxAmount: 9.99,
        fulfillmentStatus: "unfulfilled",
      },
    ],
    subtotal: 499.97,
    taxTotal: 49.98,
    shippingTotal: 20.0,
    discountTotal: 25.0,
    total: 544.95,
    currency: "USD",
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address1: "456 Oak Avenue",
      city: "Siem Reap",
      province: "Siem Reap",
      postalCode: "17000",
      country: "Cambodia",
      phone: "+855 98 765 432",
    },
    billingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address1: "456 Oak Avenue",
      city: "Siem Reap",
      province: "Siem Reap",
      postalCode: "17000",
      country: "Cambodia",
      phone: "+855 98 765 432",
    },
    paymentInfo: {
      method: "credit_card",
      status: "paid",
      transactionId: "txn_002",
      amount: 544.95,
      currency: "USD",
      processedAt: new Date("2024-01-16T14:20:00Z"),
      gateway: "Stripe",
      cardLast4: "4242",
      cardBrand: "Visa",
    },
    shippingInfo: {
      method: "Express Shipping",
      cost: 20.0,
      estimatedDelivery: new Date("2024-01-22T00:00:00Z"),
      trackingNumber: "TRK987654321",
      carrier: "DHL",
      service: "Express",
      shippedAt: new Date("2024-01-17T11:00:00Z"),
    },
    discounts: [
      {
        id: "discount_1",
        code: "WELCOME25",
        type: "fixed_amount",
        value: 25,
        amount: 25.0,
        description: "Welcome discount - $25 off",
      },
    ],
    notes: [],
    timeline: [
      {
        id: "timeline_5",
        type: "status_change",
        title: "Order Placed",
        description: "Order was successfully placed",
        createdBy: "system",
        createdAt: new Date("2024-01-16T14:20:00Z"),
      },
      {
        id: "timeline_6",
        type: "payment",
        title: "Payment Received",
        description: "Payment of $544.95 was processed via Credit Card",
        createdBy: "system",
        createdAt: new Date("2024-01-16T14:20:00Z"),
      },
      {
        id: "timeline_7",
        type: "fulfillment",
        title: "Partial Shipment",
        description: "Smart Watch shipped with tracking TRK987654321",
        createdBy: "admin_002",
        createdAt: new Date("2024-01-17T11:00:00Z"),
      },
    ],
    source: "online",
    tags: ["new_customer", "express"],
    riskLevel: "low",
    createdAt: new Date("2024-01-16T14:20:00Z"),
    updatedAt: new Date("2024-01-17T11:00:00Z"),
    processedAt: new Date("2024-01-16T14:20:00Z"),
    shippedAt: new Date("2024-01-17T11:00:00Z"),
    priority: "high",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerId: "cust_003",
    customerEmail: "mike.johnson@example.com",
    customerName: "Mike Johnson",
    status: "pending",
    paymentStatus: "pending",
    fulfillmentStatus: "unfulfilled",
    items: [
      {
        id: "item_4",
        productId: "4",
        productName: "Gaming Laptop Pro",
        productImage:
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop",
        sku: "SKU-000004",
        quantity: 1,
        price: 1299.99,
        totalPrice: 1299.99,
        requiresShipping: true,
        taxable: true,
        taxRate: 0.1,
        taxAmount: 129.99,
        fulfillmentStatus: "unfulfilled",
      },
    ],
    subtotal: 1299.99,
    taxTotal: 129.99,
    shippingTotal: 0,
    discountTotal: 0,
    total: 1429.98,
    currency: "USD",
    shippingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      address1: "789 Tech Street",
      city: "Battambang",
      province: "Battambang",
      postalCode: "02000",
      country: "Cambodia",
    },
    billingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      address1: "789 Tech Street",
      city: "Battambang",
      province: "Battambang",
      postalCode: "02000",
      country: "Cambodia",
    },
    paymentInfo: {
      method: "bank_transfer",
      status: "pending",
      amount: 1429.98,
      currency: "USD",
      gateway: "Bank Transfer",
    },
    discounts: [],
    notes: [
      {
        id: "note_2",
        message: "Customer requested invoice for company purchase",
        isPrivate: false,
        createdBy: "admin_001",
        createdAt: new Date("2024-01-17T09:15:00Z"),
      },
    ],
    timeline: [
      {
        id: "timeline_8",
        type: "status_change",
        title: "Order Placed",
        description: "Order was successfully placed",
        createdBy: "system",
        createdAt: new Date("2024-01-17T08:45:00Z"),
      },
    ],
    source: "online",
    tags: ["high_value", "business"],
    riskLevel: "medium",
    createdAt: new Date("2024-01-17T08:45:00Z"),
    updatedAt: new Date("2024-01-17T09:15:00Z"),
    priority: "high",
  },
];

// Helper functions for order management
export const getOrderStats = (): OrderStats => {
  const totalOrders = adminOrders.length;
  const totalRevenue = adminOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  const statusCounts = adminOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    pendingOrders: statusCounts.pending || 0,
    processingOrders: statusCounts.processing || 0,
    shippedOrders: statusCounts.shipped || 0,
    deliveredOrders: statusCounts.delivered || 0,
    cancelledOrders: statusCounts.cancelled || 0,
    refundedOrders: statusCounts.refunded || 0,
    revenueChange: 12.5, // Mock percentage change
    ordersChange: 8.3, // Mock percentage change
    conversionRate: 3.2, // Mock conversion rate
  };
};

// Filter orders based on criteria
export const filterOrders = (
  orders: AdminOrder[],
  filters: OrderFilters
): AdminOrder[] => {
  return orders.filter((order) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        order.orderNumber,
        order.customerName,
        order.customerEmail,
        ...order.items.map((item) => item.productName),
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    // Status filters
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(order.status)) {
        return false;
      }
    }

    if (filters.paymentStatus && filters.paymentStatus.length > 0) {
      if (!filters.paymentStatus.includes(order.paymentStatus)) {
        return false;
      }
    }

    if (filters.fulfillmentStatus && filters.fulfillmentStatus.length > 0) {
      if (!filters.fulfillmentStatus.includes(order.fulfillmentStatus)) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateFrom && order.createdAt < filters.dateFrom) {
      return false;
    }

    if (filters.dateTo && order.createdAt > filters.dateTo) {
      return false;
    }

    // Amount range filter
    if (filters.minAmount && order.total < filters.minAmount) {
      return false;
    }

    if (filters.maxAmount && order.total > filters.maxAmount) {
      return false;
    }

    // Customer filter
    if (filters.customerId && order.customerId !== filters.customerId) {
      return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        order.tags.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Source filter
    if (filters.source && filters.source.length > 0) {
      if (!filters.source.includes(order.source)) {
        return false;
      }
    }

    // Risk level filter
    if (filters.riskLevel && filters.riskLevel.length > 0) {
      if (!filters.riskLevel.includes(order.riskLevel)) {
        return false;
      }
    }

    return true;
  });
};

// Sort orders
export const sortOrders = (
  orders: AdminOrder[],
  sortOptions: OrderSortOptions
): AdminOrder[] => {
  return [...orders].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortOptions.field) {
      case "orderNumber":
        aValue = a.orderNumber;
        bValue = b.orderNumber;
        break;
      case "customerName":
        aValue = a.customerName;
        bValue = b.customerName;
        break;
      case "total":
        aValue = a.total;
        bValue = b.total;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      case "createdAt":
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      case "updatedAt":
        aValue = a.updatedAt.getTime();
        bValue = b.updatedAt.getTime();
        break;
      default:
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
    }

    if (aValue < bValue) {
      return sortOptions.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOptions.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

// Get unique values for filters
export const getUniqueOrderTags = (): string[] => {
  const allTags = adminOrders.flatMap((order) => order.tags);
  return [...new Set(allTags)].sort();
};

export const getUniqueOrderSources = (): string[] => {
  const allSources = adminOrders.map((order) => order.source);
  return [...new Set(allSources)].sort();
};

// Order actions
export const processOrderAction = async (
  action: OrderAction
): Promise<boolean> => {
  // Mock implementation - in real app this would call API
  console.log("Processing order action:", action);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success response
  return true;
};

// Get order by ID
export const getOrderById = (id: string): AdminOrder | undefined => {
  return adminOrders.find((order) => order.id === id);
};

// Get orders by customer
export const getOrdersByCustomer = (customerId: string): AdminOrder[] => {
  return adminOrders.filter((order) => order.customerId === customerId);
};

// Calculate order metrics
export const calculateOrderMetrics = (orders: AdminOrder[]) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const statusBreakdown = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    statusBreakdown,
  };
};
