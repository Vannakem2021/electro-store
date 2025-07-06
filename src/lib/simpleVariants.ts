import { SimpleVariant, SimpleVariantOptions, SelectedVariants, Product } from "@/types";

/**
 * Utility functions for the simplified variant system
 */

// Calculate final price based on selected variants
export const calculateSimpleVariantPrice = (
  product: Product,
  selectedVariants: SelectedVariants
): number => {
  // For simplified system, we use the variant's full price, not modifiers
  // Priority: storage > memory > color (storage usually determines price)
  
  if (selectedVariants.storage) {
    return selectedVariants.storage.price;
  }
  
  if (selectedVariants.memory) {
    return selectedVariants.memory.price;
  }
  
  if (selectedVariants.color) {
    return selectedVariants.color.price;
  }
  
  return product.price; // Fallback to base price
};

// Calculate total stock based on selected variants
export const calculateSimpleVariantStock = (
  selectedVariants: SelectedVariants
): number => {
  const stocks: number[] = [];
  
  if (selectedVariants.storage) {
    stocks.push(selectedVariants.storage.stockCount);
  }
  
  if (selectedVariants.color) {
    stocks.push(selectedVariants.color.stockCount);
  }
  
  if (selectedVariants.memory) {
    stocks.push(selectedVariants.memory.stockCount);
  }
  
  // Return minimum stock (bottleneck)
  return stocks.length > 0 ? Math.min(...stocks) : 0;
};

// Get default variants for a product
export const getDefaultVariants = (
  variantOptions: SimpleVariantOptions
): SelectedVariants => {
  const defaults: SelectedVariants = {};
  
  if (variantOptions.storage) {
    defaults.storage = variantOptions.storage.find(v => v.isDefault) || variantOptions.storage[0];
  }
  
  if (variantOptions.color) {
    defaults.color = variantOptions.color.find(v => v.isDefault) || variantOptions.color[0];
  }
  
  if (variantOptions.memory) {
    defaults.memory = variantOptions.memory.find(v => v.isDefault) || variantOptions.memory[0];
  }
  
  return defaults;
};

// Check if product has any variants
export const hasVariants = (product: Product): boolean => {
  if (!product.variantOptions) return false;
  
  return !!(
    product.variantOptions.storage?.length ||
    product.variantOptions.color?.length ||
    product.variantOptions.memory?.length
  );
};

// Get variant display name for cart/order items
export const getVariantDisplayName = (selectedVariants: SelectedVariants): string => {
  const parts: string[] = [];
  
  if (selectedVariants.storage) {
    parts.push(selectedVariants.storage.name);
  }
  
  if (selectedVariants.memory) {
    parts.push(selectedVariants.memory.name);
  }
  
  if (selectedVariants.color) {
    parts.push(selectedVariants.color.name);
  }
  
  return parts.join(", ");
};

// Validate variant selection
export const isValidVariantSelection = (
  variantOptions: SimpleVariantOptions,
  selectedVariants: SelectedVariants
): boolean => {
  // Check if all available variant types have selections
  if (variantOptions.storage && !selectedVariants.storage) return false;
  if (variantOptions.color && !selectedVariants.color) return false;
  if (variantOptions.memory && !selectedVariants.memory) return false;
  
  return true;
};

// Generate variant combinations for inventory tracking
export const getVariantCombinations = (variantOptions: SimpleVariantOptions) => {
  const combinations: Array<{
    id: string;
    name: string;
    price: number;
    stock: number;
    variants: SelectedVariants;
  }> = [];
  
  const storageOptions = variantOptions.storage || [undefined];
  const colorOptions = variantOptions.color || [undefined];
  const memoryOptions = variantOptions.memory || [undefined];
  
  storageOptions.forEach(storage => {
    colorOptions.forEach(color => {
      memoryOptions.forEach(memory => {
        const variants: SelectedVariants = {};
        const nameParts: string[] = [];
        
        if (storage) {
          variants.storage = storage;
          nameParts.push(storage.name);
        }
        if (color) {
          variants.color = color;
          nameParts.push(color.name);
        }
        if (memory) {
          variants.memory = memory;
          nameParts.push(memory.name);
        }
        
        // Skip if no variants selected
        if (Object.keys(variants).length === 0) return;
        
        const price = storage?.price || memory?.price || color?.price || 0;
        const stock = calculateSimpleVariantStock(variants);
        
        combinations.push({
          id: `${storage?.id || 'none'}-${color?.id || 'none'}-${memory?.id || 'none'}`,
          name: nameParts.join(" "),
          price,
          stock,
          variants
        });
      });
    });
  });
  
  return combinations;
};

// Create mock simple variants for electronics categories
export const createMockSimpleVariants = (categoryId: string): SimpleVariantOptions => {
  const variants: SimpleVariantOptions = {};
  
  switch (categoryId) {
    case "4": // Smart Phone
      variants.storage = [
        { id: "128gb", name: "128GB", value: "128gb", price: 999, stockCount: 15, isDefault: true },
        { id: "256gb", name: "256GB", value: "256gb", price: 1099, stockCount: 12, isDefault: false },
        { id: "512gb", name: "512GB", value: "512gb", price: 1199, stockCount: 8, isDefault: false },
        { id: "1tb", name: "1TB", value: "1tb", price: 1399, stockCount: 3, isDefault: false }
      ];
      
      variants.color = [
        { id: "space-black", name: "Space Black", value: "space-black", price: 999, stockCount: 20, isDefault: true, colorCode: "#1a1a1a" },
        { id: "silver", name: "Silver", value: "silver", price: 999, stockCount: 15, isDefault: false, colorCode: "#c0c0c0" },
        { id: "gold", name: "Gold", value: "gold", price: 999, stockCount: 10, isDefault: false, colorCode: "#ffd700" },
        { id: "deep-purple", name: "Deep Purple", value: "deep-purple", price: 999, stockCount: 5, isDefault: false, colorCode: "#663399" }
      ];
      break;
      
    case "3": // Laptop
      variants.memory = [
        { id: "8gb", name: "8GB RAM", value: "8gb", price: 1299, stockCount: 15, isDefault: true },
        { id: "16gb", name: "16GB RAM", value: "16gb", price: 1499, stockCount: 10, isDefault: false },
        { id: "32gb", name: "32GB RAM", value: "32gb", price: 1899, stockCount: 5, isDefault: false }
      ];
      
      variants.storage = [
        { id: "256gb-ssd", name: "256GB SSD", value: "256gb-ssd", price: 1299, stockCount: 12, isDefault: true },
        { id: "512gb-ssd", name: "512GB SSD", value: "512gb-ssd", price: 1499, stockCount: 8, isDefault: false },
        { id: "1tb-ssd", name: "1TB SSD", value: "1tb-ssd", price: 1699, stockCount: 4, isDefault: false }
      ];
      
      variants.color = [
        { id: "space-gray", name: "Space Gray", value: "space-gray", price: 1299, stockCount: 15, isDefault: true, colorCode: "#8e8e93" },
        { id: "silver", name: "Silver", value: "silver", price: 1299, stockCount: 12, isDefault: false, colorCode: "#c0c0c0" },
        { id: "gold", name: "Gold", value: "gold", price: 1299, stockCount: 8, isDefault: false, colorCode: "#ffd700" }
      ];
      break;
      
    case "1": // Accessories (Headphones)
      variants.color = [
        { id: "black", name: "Black", value: "black", price: 399, stockCount: 20, isDefault: true, colorCode: "#000000" },
        { id: "white", name: "White", value: "white", price: 399, stockCount: 15, isDefault: false, colorCode: "#ffffff" },
        { id: "red", name: "Red", value: "red", price: 399, stockCount: 10, isDefault: false, colorCode: "#ff0000" }
      ];
      break;
      
    case "6": // Smart Watch
      variants.color = [
        { id: "midnight", name: "Midnight", value: "midnight", price: 399, stockCount: 15, isDefault: true, colorCode: "#1a1a1a" },
        { id: "starlight", name: "Starlight", value: "starlight", price: 399, stockCount: 12, isDefault: false, colorCode: "#f5f5dc" },
        { id: "red", name: "Product RED", value: "red", price: 399, stockCount: 8, isDefault: false, colorCode: "#ff0000" }
      ];
      break;
  }
  
  return variants;
};
