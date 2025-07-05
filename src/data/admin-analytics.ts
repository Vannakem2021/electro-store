import {
  SalesAnalytics,
  ProductAnalytics,
  SalesMetrics,
  ProductMetrics,
  SalesReportData,
  ProductReportData,
  TopProduct,
  CategoryRevenue,
  RegionSales,
  CategoryPerformance,
  StockAlert,
  SalesFilters,
  ProductFilters,
  AnalyticsSortOptions,
} from "@/types/admin-analytics";

// Mock Sales Metrics
export const mockSalesMetrics: SalesMetrics = {
  totalRevenue: 125430.5,
  totalOrders: 1247,
  averageOrderValue: 100.58,
  conversionRate: 3.2,
  revenueChange: 12.5,
  ordersChange: 8.3,
  aovChange: 4.1,
  conversionChange: 0.8,
};

// Mock Product Metrics
export const mockProductMetrics: ProductMetrics = {
  totalProducts: 156,
  activeProducts: 142,
  lowStockProducts: 8,
  outOfStockProducts: 6,
  totalViews: 45230,
  totalSales: 3420,
  averageRating: 4.3,
  topSellingProducts: 25,
};

// Generate mock daily sales data for the last 30 days
export const generateDailySalesData = (): SalesReportData[] => {
  const data: SalesReportData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseRevenue = 3000 + Math.random() * 2000;
    const orders = Math.floor(baseRevenue / (80 + Math.random() * 40));
    const customers = Math.floor(orders * (0.7 + Math.random() * 0.3));

    data.push({
      date: date.toISOString().split("T")[0],
      revenue: Math.round(baseRevenue * 100) / 100,
      orders,
      customers,
      averageOrderValue: Math.round((baseRevenue / orders) * 100) / 100,
      conversionRate:
        Math.round((orders / (orders * 25 + Math.random() * 100)) * 1000) / 10,
    });
  }

  return data;
};

// Mock Top Products
export const mockTopProducts: TopProduct[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    image: "/images/products/iphone-15-pro-max.jpg",
    revenue: 25430.0,
    unitsSold: 42,
    growth: 15.2,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    image: "/images/products/samsung-s24-ultra.jpg",
    revenue: 18750.0,
    unitsSold: 35,
    growth: 8.7,
  },
  {
    id: "3",
    name: "MacBook Pro 16-inch",
    category: "Laptops",
    image: "/images/products/macbook-pro-16.jpg",
    revenue: 15200.0,
    unitsSold: 8,
    growth: 22.1,
  },
  {
    id: "4",
    name: "AirPods Pro 2nd Gen",
    category: "Audio",
    image: "/images/products/airpods-pro-2.jpg",
    revenue: 12800.0,
    unitsSold: 64,
    growth: 12.4,
  },
  {
    id: "5",
    name: "iPad Air 5th Gen",
    category: "Tablets",
    image: "/images/products/ipad-air-5.jpg",
    revenue: 9650.0,
    unitsSold: 18,
    growth: -3.2,
  },
];

// Mock Category Revenue
export const mockCategoryRevenue: CategoryRevenue[] = [
  {
    category: "Smartphones",
    revenue: 52430.0,
    orders: 87,
    percentage: 41.8,
    growth: 15.2,
  },
  {
    category: "Laptops",
    revenue: 28750.0,
    orders: 23,
    percentage: 22.9,
    growth: 8.7,
  },
  {
    category: "Audio",
    revenue: 18200.0,
    orders: 91,
    percentage: 14.5,
    growth: 22.1,
  },
  {
    category: "Tablets",
    revenue: 15650.0,
    orders: 32,
    percentage: 12.5,
    growth: -2.1,
  },
  {
    category: "Accessories",
    revenue: 10400.0,
    orders: 156,
    percentage: 8.3,
    growth: 5.8,
  },
];

// Mock Region Sales
export const mockRegionSales: RegionSales[] = [
  {
    region: "Phnom Penh",
    revenue: 65200.0,
    orders: 412,
    customers: 298,
    percentage: 52.0,
  },
  {
    region: "Siem Reap",
    revenue: 28750.0,
    orders: 186,
    customers: 142,
    percentage: 22.9,
  },
  {
    region: "Battambang",
    revenue: 18430.0,
    orders: 124,
    customers: 95,
    percentage: 14.7,
  },
  {
    region: "Kampong Cham",
    revenue: 13050.0,
    orders: 89,
    customers: 67,
    percentage: 10.4,
  },
];

// Generate mock product data
export const generateMockProducts = (): ProductReportData[] => {
  const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Audio",
    "Accessories",
  ];
  const statuses: Array<"active" | "inactive" | "out_of_stock" | "low_stock"> =
    ["active", "inactive", "out_of_stock", "low_stock"];
  const products: ProductReportData[] = [];

  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.round((50 + Math.random() * 2000) * 100) / 100;
    const stock = Math.floor(Math.random() * 100);
    const sold = Math.floor(Math.random() * 200);
    const views = Math.floor(sold * (10 + Math.random() * 20));

    let status: "active" | "inactive" | "out_of_stock" | "low_stock" = "active";
    if (stock === 0) status = "out_of_stock";
    else if (stock < 10) status = "low_stock";
    else if (Math.random() < 0.1) status = "inactive";

    products.push({
      id: i.toString(),
      name: `Product ${i}`,
      category,
      sku: `SKU-${i.toString().padStart(3, "0")}`,
      price,
      stock,
      sold,
      revenue: Math.round(price * sold * 100) / 100,
      views,
      conversionRate: Math.round((sold / views) * 10000) / 100,
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      status,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ),
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
    });
  }

  return products.sort((a, b) => b.revenue - a.revenue);
};

// Mock Category Performance
export const mockCategoryPerformance: CategoryPerformance[] = [
  {
    category: "Smartphones",
    totalProducts: 25,
    activeProducts: 23,
    totalRevenue: 52430.0,
    totalSales: 87,
    averagePrice: 602.41,
    averageRating: 4.5,
    growth: 15.2,
  },
  {
    category: "Laptops",
    totalProducts: 18,
    activeProducts: 16,
    totalRevenue: 28750.0,
    totalSales: 23,
    averagePrice: 1250.0,
    averageRating: 4.3,
    growth: 8.7,
  },
  {
    category: "Audio",
    totalProducts: 32,
    activeProducts: 28,
    totalRevenue: 18200.0,
    totalSales: 91,
    averagePrice: 200.0,
    averageRating: 4.2,
    growth: 22.1,
  },
  {
    category: "Tablets",
    totalProducts: 15,
    activeProducts: 14,
    totalRevenue: 15650.0,
    totalSales: 32,
    averagePrice: 489.06,
    averageRating: 4.1,
    growth: -2.1,
  },
  {
    category: "Accessories",
    totalProducts: 66,
    activeProducts: 61,
    totalRevenue: 10400.0,
    totalSales: 156,
    averagePrice: 66.67,
    averageRating: 4.0,
    growth: 5.8,
  },
];

// Mock Stock Alerts
export const mockStockAlerts: StockAlert[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    sku: "SKU-001",
    currentStock: 3,
    minimumStock: 10,
    status: "low_stock",
    lastRestocked: new Date("2024-01-10"),
  },
  {
    id: "2",
    name: "AirPods Pro 2nd Gen",
    sku: "SKU-004",
    currentStock: 0,
    minimumStock: 20,
    status: "out_of_stock",
    lastRestocked: new Date("2024-01-05"),
  },
  {
    id: "3",
    name: "MacBook Air M2",
    sku: "SKU-007",
    currentStock: 2,
    minimumStock: 5,
    status: "low_stock",
    lastRestocked: new Date("2024-01-12"),
  },
];

// Mock data instances
export const mockSalesAnalytics: SalesAnalytics = {
  metrics: mockSalesMetrics,
  dailyData: generateDailySalesData(),
  weeklyData: [], // Would be generated similarly
  monthlyData: [], // Would be generated similarly
  topProducts: mockTopProducts,
  revenueByCategory: mockCategoryRevenue,
  salesByRegion: mockRegionSales,
};

export const mockProductAnalytics: ProductAnalytics = {
  metrics: mockProductMetrics,
  products: generateMockProducts(),
  topPerformers: mockTopProducts,
  categoryPerformance: mockCategoryPerformance,
  stockAlerts: mockStockAlerts,
  recentlyAdded: generateMockProducts().slice(0, 10),
};

// Helper functions for filtering and sorting

// Filter sales data
export const filterSalesData = (
  data: SalesReportData[],
  filters: SalesFilters
): SalesReportData[] => {
  return data.filter((item) => {
    // Date range filter
    if (filters.dateRange) {
      const itemDate = new Date(item.date);
      if (
        itemDate < filters.dateRange.start ||
        itemDate > filters.dateRange.end
      ) {
        return false;
      }
    }

    // Revenue filter
    if (filters.minRevenue && item.revenue < filters.minRevenue) {
      return false;
    }
    if (filters.maxRevenue && item.revenue > filters.maxRevenue) {
      return false;
    }

    return true;
  });
};

// Filter product data
export const filterProducts = (
  products: ProductReportData[],
  filters: ProductFilters
): ProductReportData[] => {
  return products.filter((product) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (
        !product.name.toLowerCase().includes(searchTerm) &&
        !product.category.toLowerCase().includes(searchTerm) &&
        !product.sku.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    // Status filter
    if (
      filters.status &&
      filters.status !== "all" &&
      product.status !== filters.status
    ) {
      return false;
    }

    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }
    }

    // Stock range filter
    if (filters.stockRange) {
      if (
        product.stock < filters.stockRange.min ||
        product.stock > filters.stockRange.max
      ) {
        return false;
      }
    }

    return true;
  });
};

// Sort product data
export const sortProducts = (
  products: ProductReportData[],
  sortOptions: AnalyticsSortOptions
): ProductReportData[] => {
  return [...products].sort((a, b) => {
    const { field, direction } = sortOptions;
    let aValue: any = a[field as keyof ProductReportData];
    let bValue: any = b[field as keyof ProductReportData];

    // Handle date fields
    if (field === "createdAt" || field === "updatedAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Handle string fields
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (direction === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

// Get product statistics
export const getProductStats = () => {
  const products = generateMockProducts();
  return {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    lowStock: products.filter((p) => p.status === "low_stock").length,
    outOfStock: products.filter((p) => p.status === "out_of_stock").length,
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    totalSales: products.reduce((sum, p) => sum + p.sold, 0),
  };
};

// Get sales statistics
export const getSalesStats = () => {
  const salesData = generateDailySalesData();
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue: totalRevenue / totalOrders,
    averageDailyRevenue: totalRevenue / salesData.length,
    averageDailyOrders: totalOrders / salesData.length,
  };
};
