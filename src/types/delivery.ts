/**
 * Delivery System Types for Elecxo E-commerce Platform
 * Simplified delivery system for Cambodia with local and logistics options
 */

// Delivery method types
export type DeliveryMethod = "local" | "logistics";

// Delivery status for tracking
export type DeliveryStatus = 
  | "pending"
  | "confirmed"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed"
  | "returned";

// Cambodia provinces (all 25 provinces)
export type CambodiaProvince = 
  | "Banteay Meanchey"
  | "Battambang"
  | "Kampong Cham"
  | "Kampong Chhnang"
  | "Kampong Speu"
  | "Kampong Thom"
  | "Kampot"
  | "Kandal"
  | "Kep"
  | "Koh Kong"
  | "Kratie"
  | "Mondulkiri"
  | "Oddar Meanchey"
  | "Pailin"
  | "Phnom Penh"
  | "Preah Sihanouk"
  | "Preah Vihear"
  | "Prey Veng"
  | "Pursat"
  | "Ratanakiri"
  | "Siem Reap"
  | "Stung Treng"
  | "Svay Rieng"
  | "Takeo"
  | "Tboung Khmum";

// Phnom Penh districts (Khan)
export type PhnomPenhDistrict = 
  | "Chamkar Mon"
  | "Doun Penh"
  | "Prampir Meakkakra"
  | "Tuol Kouk"
  | "Dangkao"
  | "Mean Chey"
  | "Russey Keo"
  | "Sen Sok"
  | "Pou Senchey"
  | "Chroy Changvar"
  | "Prek Pnov"
  | "Chbar Ampov"
  | "Boeng Keng Kang"
  | "Kamboul";

// Logistics company interface
export interface LogisticsCompany {
  id: string;
  name: string;
  description: string;
  logo?: string;
  contactPhone: string;
  contactEmail: string;
  website?: string;
  coverageProvinces: CambodiaProvince[];
  estimatedDeliveryDays: {
    min: number;
    max: number;
  };
  basePrice: number;
  pricePerKg?: number;
  maxWeight?: number;
  trackingSupported: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
}

// Local delivery address (Phnom Penh only)
export interface LocalDeliveryAddress {
  houseNumber: string;
  streetNumber?: string;
  streetName?: string;
  district: PhnomPenhDistrict;
  additionalDetails?: string;
  landmark?: string;
  phone: string;
  recipientName: string;
}

// Logistics delivery address (outside Phnom Penh)
export interface LogisticsDeliveryAddress {
  recipientName: string;
  phone: string;
  province: CambodiaProvince;
  city: string;
  address: string;
  postalCode?: string;
  additionalDetails?: string;
  logisticsCompanyId: string;
}

// Unified delivery address
export interface DeliveryAddress {
  id?: string;
  type: DeliveryMethod;
  localAddress?: LocalDeliveryAddress;
  logisticsAddress?: LogisticsDeliveryAddress;
}

// Delivery pricing
export interface DeliveryPricing {
  basePrice: number;
  weightPrice?: number;
  distancePrice?: number;
  totalPrice: number;
  currency: string;
  estimatedDays: {
    min: number;
    max: number;
  };
}

// Delivery tracking information
export interface DeliveryTracking {
  trackingNumber?: string;
  trackingUrl?: string;
  status: DeliveryStatus;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  updates: DeliveryTrackingUpdate[];
}

// Delivery tracking update
export interface DeliveryTrackingUpdate {
  id: string;
  status: DeliveryStatus;
  message: string;
  location?: string;
  timestamp: Date;
  isCustomerVisible: boolean;
}

// Delivery option for checkout
export interface DeliveryOption {
  id: string;
  method: DeliveryMethod;
  name: string;
  description: string;
  pricing: DeliveryPricing;
  logisticsCompany?: LogisticsCompany;
  isAvailable: boolean;
  requirements?: string[];
}

// Delivery zone configuration
export interface DeliveryZone {
  id: string;
  name: string;
  type: DeliveryMethod;
  provinces: CambodiaProvince[];
  isActive: boolean;
  basePrice: number;
  freeShippingThreshold?: number;
  maxWeight?: number;
  estimatedDays: {
    min: number;
    max: number;
  };
}

// Delivery settings for admin
export interface DeliverySettings {
  localDelivery: {
    isEnabled: boolean;
    basePrice: number;
    freeShippingThreshold: number;
    maxWeight: number;
    operatingHours: {
      start: string;
      end: string;
    };
    operatingDays: string[];
  };
  logisticsDelivery: {
    isEnabled: boolean;
    defaultLogisticsCompany?: string;
    requiresApproval: boolean;
    autoAssignCompany: boolean;
  };
  general: {
    currency: string;
    weightUnit: "kg" | "g";
    defaultEstimatedDays: number;
    maxOrderWeight: number;
  };
}

// Delivery analytics
export interface DeliveryAnalytics {
  totalDeliveries: number;
  localDeliveries: number;
  logisticsDeliveries: number;
  averageDeliveryTime: number;
  successRate: number;
  topLogisticsCompanies: Array<{
    companyId: string;
    companyName: string;
    deliveryCount: number;
    successRate: number;
    averageRating: number;
  }>;
  deliveryByProvince: Array<{
    province: CambodiaProvince;
    deliveryCount: number;
    averageTime: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    localDeliveries: number;
    logisticsDeliveries: number;
    totalRevenue: number;
  }>;
}

// Delivery filters for admin
export interface DeliveryFilters {
  method?: DeliveryMethod;
  status?: DeliveryStatus;
  province?: CambodiaProvince;
  logisticsCompany?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

// Delivery sort options
export interface DeliverySortOptions {
  field: "createdAt" | "estimatedDelivery" | "actualDelivery" | "status" | "province";
  direction: "asc" | "desc";
}

// Export utility types
export type DeliveryMethodOption = {
  value: DeliveryMethod;
  label: string;
  description: string;
  icon: string;
};

export type ProvinceOption = {
  value: CambodiaProvince;
  label: string;
  isLocal: boolean;
};

export type DistrictOption = {
  value: PhnomPenhDistrict;
  label: string;
};
