import { VariantGroup, ProductVariant } from "@/types";

// Mock variant data generator for different product types
export const generateMockVariants = (productId: string, categoryId: string): VariantGroup[] => {
  const variants: VariantGroup[] = [];

  switch (categoryId) {
    case "4": // Smart Phone
      variants.push(
        {
          type: "color",
          name: "Color",
          required: true,
          variants: [
            {
              id: `${productId}-color-1`,
              name: "Space Black",
              type: "color",
              value: "space-black",
              displayValue: "Space Black",
              colorCode: "#1a1a1a",
              priceModifier: 0,
              stockCount: 15,
              inStock: true,
            },
            {
              id: `${productId}-color-2`,
              name: "Silver",
              type: "color",
              value: "silver",
              displayValue: "Silver",
              colorCode: "#c0c0c0",
              priceModifier: 0,
              stockCount: 12,
              inStock: true,
            },
            {
              id: `${productId}-color-3`,
              name: "Gold",
              type: "color",
              value: "gold",
              displayValue: "Gold",
              colorCode: "#ffd700",
              priceModifier: 0,
              stockCount: 8,
              inStock: true,
            },
            {
              id: `${productId}-color-4`,
              name: "Deep Purple",
              type: "color",
              value: "deep-purple",
              displayValue: "Deep Purple",
              colorCode: "#663399",
              priceModifier: 0,
              stockCount: 0,
              inStock: false,
            },
          ],
        },
        {
          type: "storage",
          name: "Storage",
          required: true,
          variants: [
            {
              id: `${productId}-storage-1`,
              name: "128GB",
              type: "storage",
              value: "128gb",
              displayValue: "128GB",
              priceModifier: 0,
              stockCount: 20,
              inStock: true,
            },
            {
              id: `${productId}-storage-2`,
              name: "256GB",
              type: "storage",
              value: "256gb",
              displayValue: "256GB",
              priceModifier: 100,
              stockCount: 15,
              inStock: true,
            },
            {
              id: `${productId}-storage-3`,
              name: "512GB",
              type: "storage",
              value: "512gb",
              displayValue: "512GB",
              priceModifier: 200,
              stockCount: 8,
              inStock: true,
            },
            {
              id: `${productId}-storage-4`,
              name: "1TB",
              type: "storage",
              value: "1tb",
              displayValue: "1TB",
              priceModifier: 400,
              stockCount: 3,
              inStock: true,
            },
          ],
        }
      );
      break;

    case "3": // Laptop
      variants.push(
        {
          type: "color",
          name: "Color",
          required: true,
          variants: [
            {
              id: `${productId}-color-1`,
              name: "Space Gray",
              type: "color",
              value: "space-gray",
              displayValue: "Space Gray",
              colorCode: "#8e8e93",
              priceModifier: 0,
              stockCount: 10,
              inStock: true,
            },
            {
              id: `${productId}-color-2`,
              name: "Silver",
              type: "color",
              value: "silver",
              displayValue: "Silver",
              colorCode: "#c0c0c0",
              priceModifier: 0,
              stockCount: 8,
              inStock: true,
            },
            {
              id: `${productId}-color-3`,
              name: "Gold",
              type: "color",
              value: "gold",
              displayValue: "Gold",
              colorCode: "#ffd700",
              priceModifier: 0,
              stockCount: 5,
              inStock: true,
            },
          ],
        },
        {
          type: "memory",
          name: "Memory",
          required: true,
          variants: [
            {
              id: `${productId}-memory-1`,
              name: "8GB",
              type: "memory",
              value: "8gb",
              displayValue: "8GB Unified Memory",
              priceModifier: 0,
              stockCount: 15,
              inStock: true,
            },
            {
              id: `${productId}-memory-2`,
              name: "16GB",
              type: "memory",
              value: "16gb",
              displayValue: "16GB Unified Memory",
              priceModifier: 200,
              stockCount: 10,
              inStock: true,
            },
            {
              id: `${productId}-memory-3`,
              name: "24GB",
              type: "memory",
              value: "24gb",
              displayValue: "24GB Unified Memory",
              priceModifier: 400,
              stockCount: 5,
              inStock: true,
            },
          ],
        },
        {
          type: "storage",
          name: "Storage",
          required: true,
          variants: [
            {
              id: `${productId}-storage-1`,
              name: "256GB SSD",
              type: "storage",
              value: "256gb",
              displayValue: "256GB SSD",
              priceModifier: 0,
              stockCount: 12,
              inStock: true,
            },
            {
              id: `${productId}-storage-2`,
              name: "512GB SSD",
              type: "storage",
              value: "512gb",
              displayValue: "512GB SSD",
              priceModifier: 200,
              stockCount: 8,
              inStock: true,
            },
            {
              id: `${productId}-storage-3`,
              name: "1TB SSD",
              type: "storage",
              value: "1tb",
              displayValue: "1TB SSD",
              priceModifier: 400,
              stockCount: 4,
              inStock: true,
            },
            {
              id: `${productId}-storage-4`,
              name: "2TB SSD",
              type: "storage",
              value: "2tb",
              displayValue: "2TB SSD",
              priceModifier: 800,
              stockCount: 2,
              inStock: true,
            },
          ],
        }
      );
      break;

    case "1": // Accessories (Headphones)
      variants.push({
        type: "color",
        name: "Color",
        required: true,
        variants: [
          {
            id: `${productId}-color-1`,
            name: "Black",
            type: "color",
            value: "black",
            displayValue: "Midnight Black",
            colorCode: "#000000",
            priceModifier: 0,
            stockCount: 25,
            inStock: true,
          },
          {
            id: `${productId}-color-2`,
            name: "Silver",
            type: "color",
            value: "silver",
            displayValue: "Silver",
            colorCode: "#c0c0c0",
            priceModifier: 0,
            stockCount: 18,
            inStock: true,
          },
          {
            id: `${productId}-color-3`,
            name: "Blue",
            type: "color",
            value: "blue",
            displayValue: "Midnight Blue",
            colorCode: "#191970",
            priceModifier: 0,
            stockCount: 12,
            inStock: true,
          },
          {
            id: `${productId}-color-4`,
            name: "White",
            type: "color",
            value: "white",
            displayValue: "Smoky White",
            colorCode: "#f5f5f5",
            priceModifier: 0,
            stockCount: 0,
            inStock: false,
          },
        ],
      });
      break;

    case "6": // Smart Watch
      variants.push(
        {
          type: "size",
          name: "Case Size",
          required: true,
          variants: [
            {
              id: `${productId}-size-1`,
              name: "41mm",
              type: "size",
              value: "41mm",
              displayValue: "41mm",
              priceModifier: 0,
              stockCount: 15,
              inStock: true,
            },
            {
              id: `${productId}-size-2`,
              name: "45mm",
              type: "size",
              value: "45mm",
              displayValue: "45mm",
              priceModifier: 30,
              stockCount: 12,
              inStock: true,
            },
          ],
        },
        {
          type: "color",
          name: "Case Color",
          required: true,
          variants: [
            {
              id: `${productId}-color-1`,
              name: "Silver",
              type: "color",
              value: "silver",
              displayValue: "Silver Aluminum",
              colorCode: "#c0c0c0",
              priceModifier: 0,
              stockCount: 20,
              inStock: true,
            },
            {
              id: `${productId}-color-2`,
              name: "Space Gray",
              type: "color",
              value: "space-gray",
              displayValue: "Space Gray Aluminum",
              colorCode: "#8e8e93",
              priceModifier: 0,
              stockCount: 15,
              inStock: true,
            },
            {
              id: `${productId}-color-3`,
              name: "Gold",
              type: "color",
              value: "gold",
              displayValue: "Gold Aluminum",
              colorCode: "#ffd700",
              priceModifier: 0,
              stockCount: 8,
              inStock: true,
            },
          ],
        }
      );
      break;

    default:
      // No variants for other categories
      break;
  }

  return variants;
};

// Helper function to calculate total price with variant modifiers
export const calculateVariantPrice = (
  basePrice: number,
  selectedVariants: { [key: string]: ProductVariant }
): number => {
  const totalModifier = Object.values(selectedVariants).reduce(
    (sum, variant) => sum + variant.priceModifier,
    0
  );
  return basePrice + totalModifier;
};

// Helper function to check if all required variants are selected
export const areRequiredVariantsSelected = (
  variantGroups: VariantGroup[],
  selectedVariants: { [key: string]: ProductVariant }
): boolean => {
  return variantGroups
    .filter(group => group.required)
    .every(group => selectedVariants[group.type]);
};

// Helper function to get variant-specific images
export const getVariantImages = (
  baseImages: string[],
  selectedVariants: { [key: string]: ProductVariant }
): string[] => {
  // Check if any selected variant has specific images
  for (const variant of Object.values(selectedVariants)) {
    if (variant.images && variant.images.length > 0) {
      return variant.images;
    }
  }
  return baseImages;
};
