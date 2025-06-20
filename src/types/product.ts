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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
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
  variants?: VariantGroup[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
