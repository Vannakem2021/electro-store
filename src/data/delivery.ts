import {
  CambodiaProvince,
  PhnomPenhDistrict,
  LogisticsCompany,
  DeliveryZone,
  DeliverySettings,
  ProvinceOption,
  DistrictOption,
  DeliveryMethodOption,
} from "@/types/delivery";

// All 25 Cambodia provinces with metadata
export const cambodiaProvinces: ProvinceOption[] = [
  { value: "Phnom Penh", label: "Phnom Penh", isLocal: true },
  { value: "Banteay Meanchey", label: "Banteay Meanchey", isLocal: false },
  { value: "Battambang", label: "Battambang", isLocal: false },
  { value: "Kampong Cham", label: "Kampong Cham", isLocal: false },
  { value: "Kampong Chhnang", label: "Kampong Chhnang", isLocal: false },
  { value: "Kampong Speu", label: "Kampong Speu", isLocal: false },
  { value: "Kampong Thom", label: "Kampong Thom", isLocal: false },
  { value: "Kampot", label: "Kampot", isLocal: false },
  { value: "Kandal", label: "Kandal", isLocal: false },
  { value: "Kep", label: "Kep", isLocal: false },
  { value: "Koh Kong", label: "Koh Kong", isLocal: false },
  { value: "Kratie", label: "Kratie", isLocal: false },
  { value: "Mondulkiri", label: "Mondulkiri", isLocal: false },
  { value: "Oddar Meanchey", label: "Oddar Meanchey", isLocal: false },
  { value: "Pailin", label: "Pailin", isLocal: false },
  { value: "Preah Sihanouk", label: "Preah Sihanouk", isLocal: false },
  { value: "Preah Vihear", label: "Preah Vihear", isLocal: false },
  { value: "Prey Veng", label: "Prey Veng", isLocal: false },
  { value: "Pursat", label: "Pursat", isLocal: false },
  { value: "Ratanakiri", label: "Ratanakiri", isLocal: false },
  { value: "Siem Reap", label: "Siem Reap", isLocal: false },
  { value: "Stung Treng", label: "Stung Treng", isLocal: false },
  { value: "Svay Rieng", label: "Svay Rieng", isLocal: false },
  { value: "Takeo", label: "Takeo", isLocal: false },
  { value: "Tboung Khmum", label: "Tboung Khmum", isLocal: false },
];

// Phnom Penh districts (Khan)
export const phnomPenhDistricts: DistrictOption[] = [
  { value: "Chamkar Mon", label: "Chamkar Mon" },
  { value: "Doun Penh", label: "Doun Penh" },
  { value: "Prampir Meakkakra", label: "Prampir Meakkakra" },
  { value: "Tuol Kouk", label: "Tuol Kouk" },
  { value: "Dangkao", label: "Dangkao" },
  { value: "Mean Chey", label: "Mean Chey" },
  { value: "Russey Keo", label: "Russey Keo" },
  { value: "Sen Sok", label: "Sen Sok" },
  { value: "Pou Senchey", label: "Pou Senchey" },
  { value: "Chroy Changvar", label: "Chroy Changvar" },
  { value: "Prek Pnov", label: "Prek Pnov" },
  { value: "Chbar Ampov", label: "Chbar Ampov" },
  { value: "Boeng Keng Kang", label: "Boeng Keng Kang" },
  { value: "Kamboul", label: "Kamboul" },
];

// Mock logistics companies
export const logisticsCompanies: LogisticsCompany[] = [
  {
    id: "cambodia-express",
    name: "Cambodia Express",
    description: "Fast and reliable delivery across Cambodia",
    contactPhone: "+855 12 345 678",
    contactEmail: "info@cambodiaexpress.com",
    website: "https://cambodiaexpress.com",
    coverageProvinces: [
      "Battambang", "Siem Reap", "Kampong Cham", "Kampong Thom", 
      "Pursat", "Banteay Meanchey", "Oddar Meanchey"
    ],
    estimatedDeliveryDays: { min: 2, max: 4 },
    basePrice: 8.00,
    pricePerKg: 2.50,
    maxWeight: 30,
    trackingSupported: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 1250,
  },
  {
    id: "angkor-delivery",
    name: "Angkor Delivery",
    description: "Connecting Cambodia with reliable logistics",
    contactPhone: "+855 17 888 999",
    contactEmail: "support@angkordelivery.com",
    website: "https://angkordelivery.com",
    coverageProvinces: [
      "Siem Reap", "Preah Vihear", "Banteay Meanchey", "Battambang",
      "Pursat", "Kampong Chhnang", "Kampong Thom"
    ],
    estimatedDeliveryDays: { min: 1, max: 3 },
    basePrice: 10.00,
    pricePerKg: 3.00,
    maxWeight: 25,
    trackingSupported: true,
    isActive: true,
    rating: 4.3,
    reviewCount: 890,
  },
  {
    id: "mekong-logistics",
    name: "Mekong Logistics",
    description: "Your trusted partner for nationwide delivery",
    contactPhone: "+855 23 456 789",
    contactEmail: "hello@mekonglogistics.com",
    coverageProvinces: [
      "Kampong Cham", "Prey Veng", "Svay Rieng", "Kandal", "Takeo",
      "Kampot", "Kep", "Preah Sihanouk", "Koh Kong"
    ],
    estimatedDeliveryDays: { min: 2, max: 5 },
    basePrice: 7.50,
    pricePerKg: 2.00,
    maxWeight: 40,
    trackingSupported: true,
    isActive: true,
    rating: 4.2,
    reviewCount: 2100,
  },
  {
    id: "royal-express",
    name: "Royal Express",
    description: "Premium delivery service across Cambodia",
    contactPhone: "+855 96 123 456",
    contactEmail: "service@royalexpress.com.kh",
    coverageProvinces: [
      "Siem Reap", "Battambang", "Kampong Cham", "Preah Sihanouk",
      "Kampot", "Kandal", "Takeo", "Kampong Speu"
    ],
    estimatedDeliveryDays: { min: 1, max: 2 },
    basePrice: 12.00,
    pricePerKg: 3.50,
    maxWeight: 20,
    trackingSupported: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 650,
  },
  {
    id: "khmer-cargo",
    name: "Khmer Cargo",
    description: "Affordable shipping solutions for all provinces",
    contactPhone: "+855 78 999 888",
    contactEmail: "info@khmercargo.com",
    coverageProvinces: [
      "Kratie", "Stung Treng", "Ratanakiri", "Mondulkiri", "Kampong Thom",
      "Preah Vihear", "Tboung Khmum", "Kampong Cham"
    ],
    estimatedDeliveryDays: { min: 3, max: 7 },
    basePrice: 6.00,
    pricePerKg: 1.50,
    maxWeight: 50,
    trackingSupported: false,
    isActive: true,
    rating: 3.9,
    reviewCount: 420,
  },
  {
    id: "tonle-transport",
    name: "Tonle Transport",
    description: "Connecting remote areas with urban centers",
    contactPhone: "+855 15 777 666",
    contactEmail: "contact@tonletransport.com",
    coverageProvinces: [
      "Ratanakiri", "Mondulkiri", "Kratie", "Stung Treng", "Preah Vihear",
      "Oddar Meanchey", "Pailin", "Banteay Meanchey"
    ],
    estimatedDeliveryDays: { min: 4, max: 8 },
    basePrice: 5.50,
    pricePerKg: 1.80,
    maxWeight: 35,
    trackingSupported: false,
    isActive: true,
    rating: 3.8,
    reviewCount: 280,
  },
];

// Delivery method options
export const deliveryMethodOptions: DeliveryMethodOption[] = [
  {
    value: "local",
    label: "Local Delivery",
    description: "Direct delivery within Phnom Penh",
    icon: "truck",
  },
  {
    value: "logistics",
    label: "Logistics Partner",
    description: "Delivery via third-party logistics companies",
    icon: "package",
  },
];

// Delivery zones configuration
export const deliveryZones: DeliveryZone[] = [
  {
    id: "phnom-penh-local",
    name: "Phnom Penh Local Delivery",
    type: "local",
    provinces: ["Phnom Penh"],
    isActive: true,
    basePrice: 3.00,
    freeShippingThreshold: 50.00,
    maxWeight: 15,
    estimatedDays: { min: 1, max: 2 },
  },
  {
    id: "central-provinces",
    name: "Central Provinces",
    type: "logistics",
    provinces: ["Kandal", "Kampong Speu", "Takeo", "Kampong Cham", "Prey Veng"],
    isActive: true,
    basePrice: 8.00,
    freeShippingThreshold: 100.00,
    maxWeight: 30,
    estimatedDays: { min: 2, max: 4 },
  },
  {
    id: "northern-provinces",
    name: "Northern Provinces",
    type: "logistics",
    provinces: ["Siem Reap", "Battambang", "Banteay Meanchey", "Pursat", "Kampong Thom"],
    isActive: true,
    basePrice: 10.00,
    freeShippingThreshold: 120.00,
    maxWeight: 25,
    estimatedDays: { min: 3, max: 5 },
  },
  {
    id: "coastal-provinces",
    name: "Coastal Provinces",
    type: "logistics",
    provinces: ["Preah Sihanouk", "Kampot", "Kep", "Koh Kong"],
    isActive: true,
    basePrice: 9.00,
    freeShippingThreshold: 100.00,
    maxWeight: 30,
    estimatedDays: { min: 2, max: 4 },
  },
  {
    id: "remote-provinces",
    name: "Remote Provinces",
    type: "logistics",
    provinces: ["Ratanakiri", "Mondulkiri", "Kratie", "Stung Treng", "Preah Vihear"],
    isActive: true,
    basePrice: 12.00,
    freeShippingThreshold: 150.00,
    maxWeight: 20,
    estimatedDays: { min: 4, max: 8 },
  },
];

// Default delivery settings
export const defaultDeliverySettings: DeliverySettings = {
  localDelivery: {
    isEnabled: true,
    basePrice: 3.00,
    freeShippingThreshold: 50.00,
    maxWeight: 15,
    operatingHours: {
      start: "08:00",
      end: "18:00",
    },
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  logisticsDelivery: {
    isEnabled: true,
    defaultLogisticsCompany: "cambodia-express",
    requiresApproval: false,
    autoAssignCompany: true,
  },
  general: {
    currency: "USD",
    weightUnit: "kg",
    defaultEstimatedDays: 3,
    maxOrderWeight: 50,
  },
};

// Helper functions
export const getLogisticsCompaniesByProvince = (province: CambodiaProvince): LogisticsCompany[] => {
  return logisticsCompanies.filter(company => 
    company.coverageProvinces.includes(province) && company.isActive
  );
};

export const getDeliveryZoneByProvince = (province: CambodiaProvince): DeliveryZone | undefined => {
  return deliveryZones.find(zone => zone.provinces.includes(province) && zone.isActive);
};

export const isLocalDeliveryAvailable = (province: CambodiaProvince): boolean => {
  return province === "Phnom Penh";
};

export const calculateDeliveryPrice = (
  province: CambodiaProvince,
  weight: number,
  subtotal: number,
  logisticsCompanyId?: string
): number => {
  if (isLocalDeliveryAvailable(province)) {
    const zone = getDeliveryZoneByProvince(province);
    if (zone && subtotal >= zone.freeShippingThreshold) {
      return 0;
    }
    return zone?.basePrice || defaultDeliverySettings.localDelivery.basePrice;
  }

  if (logisticsCompanyId) {
    const company = logisticsCompanies.find(c => c.id === logisticsCompanyId);
    if (company) {
      const zone = getDeliveryZoneByProvince(province);
      if (zone && subtotal >= zone.freeShippingThreshold) {
        return 0;
      }
      return company.basePrice + (company.pricePerKg || 0) * weight;
    }
  }

  const zone = getDeliveryZoneByProvince(province);
  return zone?.basePrice || 10.00;
};
