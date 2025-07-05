// Admin Analytics types for the Elecxo admin dashboard

export interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  revenueChange: number;
  ordersChange: number;
  aovChange: number;
  conversionChange: number;
}

export interface SalesReportData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface ProductMetrics {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalViews: number;
  totalSales: number;
  averageRating: number;
  topSellingProducts: number;
}

export interface ProductReportData {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  views: number;
  conversionRate: number;
  rating: number;
  status: 'active' | 'inactive' | 'out_of_stock' | 'low_stock';
  createdAt: Date;
  updatedAt: Date;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  revenue: number;
  unitsSold: number;
  growth: number;
}

export interface SalesAnalytics {
  metrics: SalesMetrics;
  dailyData: SalesReportData[];
  weeklyData: SalesReportData[];
  monthlyData: SalesReportData[];
  topProducts: TopProduct[];
  revenueByCategory: CategoryRevenue[];
  salesByRegion: RegionSales[];
}

export interface ProductAnalytics {
  metrics: ProductMetrics;
  products: ProductReportData[];
  topPerformers: TopProduct[];
  categoryPerformance: CategoryPerformance[];
  stockAlerts: StockAlert[];
  recentlyAdded: ProductReportData[];
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
  orders: number;
  percentage: number;
  growth: number;
}

export interface RegionSales {
  region: string;
  revenue: number;
  orders: number;
  customers: number;
  percentage: number;
}

export interface CategoryPerformance {
  category: string;
  totalProducts: number;
  activeProducts: number;
  totalRevenue: number;
  totalSales: number;
  averagePrice: number;
  averageRating: number;
  growth: number;
}

export interface StockAlert {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
  status: 'low_stock' | 'out_of_stock';
  lastRestocked: Date;
}

export interface AnalyticsFilters {
  dateRange?: {
    start: Date;
    end: Date;
    preset?: 'today' | 'yesterday' | 'last7days' | 'last30days' | 'last90days' | 'custom';
  };
  category?: string;
  status?: string;
  region?: string;
  search?: string;
}

export interface AnalyticsSortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Sales report specific types
export type SalesReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type SalesMetricType = 'revenue' | 'orders' | 'customers' | 'aov' | 'conversion';

// Product report specific types
export type ProductSortField = 'name' | 'category' | 'price' | 'stock' | 'sold' | 'revenue' | 'views' | 'conversionRate' | 'rating' | 'createdAt';
export type ProductStatusFilter = 'all' | 'active' | 'inactive' | 'out_of_stock' | 'low_stock';

export interface ProductFilters extends AnalyticsFilters {
  status?: ProductStatusFilter;
  priceRange?: {
    min: number;
    max: number;
  };
  stockRange?: {
    min: number;
    max: number;
  };
}

export interface SalesFilters extends AnalyticsFilters {
  minRevenue?: number;
  maxRevenue?: number;
  orderStatus?: string;
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  change?: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface ComparisonData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
}

// Export types
export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  dateRange: {
    start: Date;
    end: Date;
  };
  includeCharts?: boolean;
  filters?: AnalyticsFilters;
}
