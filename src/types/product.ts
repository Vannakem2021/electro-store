// Legacy variant interfaces (to be removed)
export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "size" | "storage" | "memory" | "style";
  value: string;
  displayValue: string;
  colorCode?: string;
  priceModifier: number;
  stockCount: number;
  inStock: boolean;
  images?: string[];
}

export interface VariantGroup {
  type: "color" | "size" | "storage" | "memory" | "style";
  name: string;
  variants: ProductVariant[];
  required: boolean;
}

// New simplified variant system for electronics
export interface SimpleVariant {
  id: string;
  name: string; // "128GB", "Space Black", "16GB RAM"
  value: string; // "128gb", "space-black", "16gb"
  price: number; // Full price, not modifier
  stockCount: number;
  isDefault: boolean;
  colorCode?: string; // For color variants
  images?: string[]; // Optional variant-specific images
}

export interface SimpleVariantOptions {
  storage?: SimpleVariant[];
  color?: SimpleVariant[];
  memory?: SimpleVariant[];
}

export interface SelectedVariants {
  storage?: SimpleVariant;
  color?: SimpleVariant;
  memory?: SimpleVariant;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Base price (will be overridden by variant selection)
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  categoryId: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;

  // Legacy variant system (to be removed)
  variants?: VariantGroup[];

  // New simplified variant system
  variantOptions?: SimpleVariantOptions;

  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: SelectedVariants; // New: track selected variants
  finalPrice?: number; // New: final price with variants
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
