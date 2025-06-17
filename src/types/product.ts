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
