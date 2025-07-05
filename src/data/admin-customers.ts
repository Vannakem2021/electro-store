/**
 * Admin Customer Data
 * Mock data and functions for customer management
 */

import {
  AdminCustomer,
  CustomerFormData,
  CustomerFilters,
  CustomerSortOptions,
  CustomerStats,
  CustomerStatus,
  CustomerType,
} from "@/types/admin-customer";

// Mock customer data
export const adminCustomers: AdminCustomer[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+855 12 345 678",
    dateOfBirth: "1990-05-15",
    status: "active",
    type: "vip",
    isVerified: true,
    address: {
      street: "123 Main St",
      city: "Phnom Penh",
      province: "Phnom Penh",
      postalCode: "12000",
      country: "Cambodia",
    },
    totalOrders: 15,
    totalSpent: 2450.75,
    averageOrderValue: 163.38,
    lastOrderDate: "2024-01-10T10:30:00Z",
    createdAt: "2023-06-15T08:00:00Z",
    updatedAt: "2024-01-10T10:30:00Z",
    lastLoginAt: "2024-01-12T14:20:00Z",
    notes: "VIP customer, excellent payment history",
    tags: ["vip", "loyal", "electronics"],
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+855 98 765 432",
    status: "active",
    type: "regular",
    isVerified: true,
    totalOrders: 8,
    totalSpent: 1200.50,
    averageOrderValue: 150.06,
    lastOrderDate: "2024-01-08T16:45:00Z",
    createdAt: "2023-08-20T12:00:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    lastLoginAt: "2024-01-11T09:15:00Z",
    tags: ["regular", "mobile"],
  },
  {
    id: "3",
    email: "mike.wilson@business.com",
    firstName: "Mike",
    lastName: "Wilson",
    phone: "+855 77 888 999",
    status: "active",
    type: "wholesale",
    isVerified: true,
    totalOrders: 25,
    totalSpent: 8750.00,
    averageOrderValue: 350.00,
    lastOrderDate: "2024-01-09T11:20:00Z",
    createdAt: "2023-04-10T10:00:00Z",
    updatedAt: "2024-01-09T11:20:00Z",
    lastLoginAt: "2024-01-09T11:25:00Z",
    notes: "Wholesale customer, bulk orders",
    tags: ["wholesale", "business", "bulk"],
  },
  {
    id: "4",
    email: "sarah.johnson@gmail.com",
    firstName: "Sarah",
    lastName: "Johnson",
    status: "inactive",
    type: "regular",
    isVerified: false,
    totalOrders: 2,
    totalSpent: 89.99,
    averageOrderValue: 44.99,
    lastOrderDate: "2023-12-15T14:30:00Z",
    createdAt: "2023-11-20T15:30:00Z",
    updatedAt: "2023-12-15T14:30:00Z",
    lastLoginAt: "2023-12-20T10:00:00Z",
    tags: ["new"],
  },
  {
    id: "5",
    email: "david.brown@example.com",
    firstName: "David",
    lastName: "Brown",
    phone: "+855 11 222 333",
    status: "suspended",
    type: "regular",
    isVerified: true,
    totalOrders: 3,
    totalSpent: 450.25,
    averageOrderValue: 150.08,
    lastOrderDate: "2023-10-05T09:15:00Z",
    createdAt: "2023-09-01T11:00:00Z",
    updatedAt: "2023-11-01T16:00:00Z",
    lastLoginAt: "2023-10-10T13:45:00Z",
    notes: "Suspended due to payment issues",
    tags: ["suspended", "payment-issues"],
  },
];

// Get customer statistics
export const getCustomerStats = (): CustomerStats => {
  const total = adminCustomers.length;
  const active = adminCustomers.filter((c) => c.status === "active").length;
  const inactive = adminCustomers.filter((c) => c.status === "inactive").length;
  const suspended = adminCustomers.filter((c) => c.status === "suspended").length;
  const verified = adminCustomers.filter((c) => c.isVerified).length;
  const unverified = adminCustomers.filter((c) => !c.isVerified).length;
  const vip = adminCustomers.filter((c) => c.type === "vip").length;
  const wholesale = adminCustomers.filter((c) => c.type === "wholesale").length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newThisMonth = adminCustomers.filter((c) => {
    const createdDate = new Date(c.createdAt);
    return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
  }).length;
  
  const totalRevenue = adminCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageOrderValue = totalRevenue / adminCustomers.reduce((sum, c) => sum + c.totalOrders, 0) || 0;

  return {
    total,
    active,
    inactive,
    suspended,
    verified,
    unverified,
    vip,
    wholesale,
    newThisMonth,
    totalRevenue,
    averageOrderValue,
  };
};

// Filter customers
export const filterCustomers = (
  customers: AdminCustomer[],
  filters: CustomerFilters
): AdminCustomer[] => {
  return customers.filter((customer) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(customer.status)) return false;
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(customer.type)) return false;
    }

    // Verified filter
    if (filters.verified !== undefined) {
      if (customer.isVerified !== filters.verified) return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        customer.tags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

// Sort customers
export const sortCustomers = (
  customers: AdminCustomer[],
  sortOptions: CustomerSortOptions
): AdminCustomer[] => {
  return [...customers].sort((a, b) => {
    const { field, direction } = sortOptions;
    let aValue: any = a[field];
    let bValue: any = b[field];

    // Handle nested fields
    if (field === "firstName" || field === "lastName") {
      aValue = aValue?.toLowerCase() || "";
      bValue = bValue?.toLowerCase() || "";
    }

    // Handle dates
    if (field === "createdAt" || field === "lastLoginAt") {
      aValue = new Date(aValue || 0).getTime();
      bValue = new Date(bValue || 0).getTime();
    }

    // Handle numbers
    if (field === "totalOrders" || field === "totalSpent") {
      aValue = aValue || 0;
      bValue = bValue || 0;
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

// Get unique customer tags
export const getUniqueCustomerTags = (): string[] => {
  const allTags = adminCustomers.flatMap((customer) => customer.tags);
  return [...new Set(allTags)].sort();
};

// Mock CRUD operations
export const createCustomer = async (customerData: CustomerFormData): Promise<AdminCustomer> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newCustomer: AdminCustomer = {
    id: (adminCustomers.length + 1).toString(),
    email: customerData.email,
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    phone: customerData.phone,
    status: customerData.status,
    type: customerData.type,
    isVerified: false,
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: customerData.notes,
    tags: customerData.tags,
  };

  adminCustomers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = async (id: string, customerData: CustomerFormData): Promise<AdminCustomer> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const customerIndex = adminCustomers.findIndex(c => c.id === id);
  if (customerIndex === -1) {
    throw new Error("Customer not found");
  }

  const updatedCustomer = {
    ...adminCustomers[customerIndex],
    ...customerData,
    updatedAt: new Date().toISOString(),
  };

  adminCustomers[customerIndex] = updatedCustomer;
  return updatedCustomer;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const customerIndex = adminCustomers.findIndex(c => c.id === id);
  if (customerIndex === -1) {
    throw new Error("Customer not found");
  }

  adminCustomers.splice(customerIndex, 1);
};
