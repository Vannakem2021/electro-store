/**
 * Order Management Types for Admin Interface
 * Comprehensive order data structures with full type safety
 */

// Order Status Enums
export type OrderStatus = 
  | "pending"
  | "confirmed" 
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = 
  | "pending"
  | "paid"
  | "partially_paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type FulfillmentStatus = 
  | "unfulfilled"
  | "partially_fulfilled"
  | "fulfilled"
  | "shipped"
  | "delivered"
  | "returned";

export type PaymentMethod = 
  | "credit_card"
  | "debit_card"
  | "aba_pay"
  | "bank_transfer"
  | "cash_on_delivery"
  | "digital_wallet";

// Address Interface
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Order Item Interface
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku?: string;
  variantId?: string;
  variantTitle?: string;
  quantity: number;
  price: number;
  comparePrice?: number;
  totalPrice: number;
  weight?: number;
  requiresShipping: boolean;
  taxable: boolean;
  taxRate?: number;
  taxAmount?: number;
  discountAmount?: number;
  fulfillmentStatus: FulfillmentStatus;
  fulfillmentService?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

// Payment Information
export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  gatewayTransactionId?: string;
  amount: number;
  currency: string;
  processedAt?: Date;
  gateway?: string;
  cardLast4?: string;
  cardBrand?: string;
  billingAddress?: Address;
}

// Shipping Information
export interface ShippingInfo {
  method: string;
  cost: number;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  service?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// Order Discount
export interface OrderDiscount {
  id: string;
  code?: string;
  type: "percentage" | "fixed_amount" | "free_shipping";
  value: number;
  amount: number;
  description: string;
}

// Order Note
export interface OrderNote {
  id: string;
  message: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
}

// Order Timeline Event
export interface OrderTimelineEvent {
  id: string;
  type: "status_change" | "payment" | "fulfillment" | "note" | "refund";
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

// Main Order Interface
export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  
  // Order Status
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  
  // Order Items
  items: OrderItem[];
  
  // Financial Information
  subtotal: number;
  taxTotal: number;
  shippingTotal: number;
  discountTotal: number;
  total: number;
  currency: string;
  
  // Addresses
  shippingAddress: Address;
  billingAddress: Address;
  
  // Payment & Shipping
  paymentInfo: PaymentInfo;
  shippingInfo?: ShippingInfo;
  
  // Discounts & Promotions
  discounts: OrderDiscount[];
  
  // Notes & Communication
  notes: OrderNote[];
  customerNotes?: string;
  
  // Timeline & History
  timeline: OrderTimelineEvent[];
  
  // Metadata
  source: "online" | "admin" | "pos" | "api";
  tags: string[];
  riskLevel: "low" | "medium" | "high";
  fraudScore?: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  
  // Additional Fields
  referrerUrl?: string;
  landingPageUrl?: string;
  browserInfo?: string;
  ipAddress?: string;
  
  // Admin Fields
  assignedTo?: string;
  priority: "low" | "normal" | "high" | "urgent";
  internalNotes?: string;
}

// Order Filters
export interface OrderFilters {
  search?: string;
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  fulfillmentStatus?: FulfillmentStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  customerId?: string;
  minAmount?: number;
  maxAmount?: number;
  tags?: string[];
  source?: string[];
  riskLevel?: string[];
  assignedTo?: string;
}

// Order Sort Options
export interface OrderSortOptions {
  field: "orderNumber" | "customerName" | "total" | "status" | "createdAt" | "updatedAt";
  direction: "asc" | "desc";
}

// Order Statistics
export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  refundedOrders: number;
  revenueChange: number;
  ordersChange: number;
  conversionRate: number;
}

// Order Actions
export interface OrderAction {
  type: "fulfill" | "ship" | "deliver" | "cancel" | "refund" | "capture_payment";
  orderId: string;
  items?: string[]; // For partial fulfillment
  amount?: number; // For partial refunds
  reason?: string;
  notifyCustomer?: boolean;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
}

// Bulk Order Operations
export interface BulkOrderOperation {
  action: "fulfill" | "cancel" | "archive" | "tag" | "assign";
  orderIds: string[];
  parameters?: Record<string, any>;
}

// Order Export Options
export interface OrderExportOptions {
  format: "csv" | "xlsx" | "pdf";
  fields: string[];
  filters?: OrderFilters;
  dateRange?: {
    from: Date;
    to: Date;
  };
}
