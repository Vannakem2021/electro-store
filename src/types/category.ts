export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon?: string;
  slug: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  parentId?: string;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}
