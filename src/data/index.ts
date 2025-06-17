import categoriesData from './categories.json';
import productsData from './products.json';
import { Category, Product } from '@/types';

export const categories: Category[] = categoriesData;
export const products: Product[] = productsData;

// Helper functions for data manipulation
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Mock navigation data
export const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Mock footer data
export const footerSections = [
  {
    title: 'Store',
    links: [
      { label: 'Our Store', href: '/store' },
      { label: 'About Us', href: '/about' },
      { label: 'Test Page 12', href: '/test' },
    ],
  },
  {
    title: 'Links',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
    ],
  },
  {
    title: 'Contact Links',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Snapchat', href: 'https://snapchat.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
    ],
  },
];

export const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
];
