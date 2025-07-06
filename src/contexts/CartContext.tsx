"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Product, CartItem, SelectedVariants } from "@/types";
import { useToast } from "./ToastContext";
import {
  getVariantDisplayName,
  calculateSimpleVariantPrice,
} from "@/lib/simpleVariants";

// Cart state interface
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
}

// Cart actions interface
interface CartActions {
  addToCart: (
    product: Product,
    quantity?: number,
    selectedVariants?: SelectedVariants,
    silent?: boolean
  ) => void;
  removeFromCart: (productId: string, variantKey?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantKey?: string
  ) => void;
  clearCart: () => void;
  getCartItem: (productId: string, variantKey?: string) => CartItem | undefined;
  isInCart: (productId: string, variantKey?: string) => boolean;
}

// Combined cart context interface
interface CartContextType extends CartState, CartActions {}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart provider props
interface CartProviderProps {
  children: React.ReactNode;
}

// Local storage key
const CART_STORAGE_KEY = "elecxo-cart";

// Generate unique key for cart items with variants
const generateCartItemKey = (
  productId: string,
  selectedVariants?: SelectedVariants
): string => {
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) {
    return productId;
  }

  const variantKeys = Object.entries(selectedVariants)
    .filter(([_, variant]) => variant)
    .map(([type, variant]) => `${type}:${variant!.id}`)
    .sort()
    .join("|");

  return `${productId}#${variantKeys}`;
};

// Shipping cost calculation (simplified)
const calculateShipping = (subtotal: number): number => {
  if (subtotal >= 100) return 0; // Free shipping over $100
  return 5.0; // Standard shipping
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();

  const [cartState, setCartState] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0,
    subtotal: 0,
    discount: 0,
    shipping: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartState(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartState]);

  // Calculate cart totals
  const calculateTotals = useCallback((items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => {
      // Use finalPrice if available (for variant pricing), otherwise use product price
      const itemPrice = item.finalPrice || item.product.price;
      return sum + itemPrice * item.quantity;
    }, 0);

    const discount = items.reduce((sum, item) => {
      const itemPrice = item.finalPrice || item.product.price;
      const originalPrice = item.product.originalPrice || itemPrice;
      const discountAmount = (originalPrice - itemPrice) * item.quantity;
      return sum + discountAmount;
    }, 0);

    const shipping = calculateShipping(subtotal);
    const total = subtotal + shipping;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      discount,
      shipping,
      total,
      itemCount,
    };
  }, []);

  // Add item to cart
  const addToCart = useCallback(
    (
      product: Product,
      quantity: number = 1,
      selectedVariants?: SelectedVariants,
      silent: boolean = false
    ) => {
      try {
        const cartItemKey = generateCartItemKey(product.id, selectedVariants);
        const finalPrice = selectedVariants
          ? calculateSimpleVariantPrice(product, selectedVariants)
          : product.price;

        setCartState((prevState) => {
          const existingItemIndex = prevState.items.findIndex((item) => {
            const itemKey = generateCartItemKey(
              item.product.id,
              item.selectedVariants
            );
            return itemKey === cartItemKey;
          });

          let newItems: CartItem[];
          let isNewItem = false;

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            newItems = prevState.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Add new item
            const newCartItem: CartItem = {
              product,
              quantity,
              selectedVariants,
              finalPrice,
            };
            newItems = [...prevState.items, newCartItem];
            isNewItem = true;
          }

          const totals = calculateTotals(newItems);

          return {
            items: newItems,
            ...totals,
          };
        });

        // Show success toast after state update (unless silent)
        if (!silent) {
          const variantInfo = selectedVariants
            ? ` (${getVariantDisplayName(selectedVariants)})`
            : "";
          showSuccess(t("toast.addedToCart"), `${product.name}${variantInfo}`);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        showError(
          t("toast.error"),
          "Failed to add item to cart. Please try again."
        );
      }
    },
    [calculateTotals, showSuccess, showError, t]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    (productId: string, variantKey?: string) => {
      try {
        setCartState((prevState) => {
          const targetKey = variantKey || productId;

          const removedItem = prevState.items.find((item) => {
            const itemKey = generateCartItemKey(
              item.product.id,
              item.selectedVariants
            );
            return itemKey === targetKey;
          });

          const newItems = prevState.items.filter((item) => {
            const itemKey = generateCartItemKey(
              item.product.id,
              item.selectedVariants
            );
            return itemKey !== targetKey;
          });

          const totals = calculateTotals(newItems);

          // Show success toast after state update
          if (removedItem) {
            const variantInfo = removedItem.selectedVariants
              ? ` (${getVariantDisplayName(removedItem.selectedVariants)})`
              : "";
            showSuccess(
              t("toast.removedFromCart"),
              `${removedItem.product.name}${variantInfo}`
            );
          }

          return {
            items: newItems,
            ...totals,
          };
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
        showError(
          t("toast.error"),
          "Failed to remove item from cart. Please try again."
        );
      }
    },
    [calculateTotals, showSuccess, showError, t]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantKey?: string) => {
      const targetKey = variantKey || productId;

      if (quantity <= 0) {
        removeFromCart(productId, variantKey);
        return;
      }

      setCartState((prevState) => {
        const newItems = prevState.items.map((item) => {
          const itemKey = generateCartItemKey(
            item.product.id,
            item.selectedVariants
          );
          return itemKey === targetKey ? { ...item, quantity } : item;
        });
        const totals = calculateTotals(newItems);

        return {
          items: newItems,
          ...totals,
        };
      });
    },
    [calculateTotals, removeFromCart]
  );

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartState({
      items: [],
      total: 0,
      itemCount: 0,
      subtotal: 0,
      discount: 0,
      shipping: 0,
    });
  }, []);

  // Get specific cart item
  const getCartItem = useCallback(
    (productId: string, variantKey?: string): CartItem | undefined => {
      const targetKey = variantKey || productId;
      return cartState.items.find((item) => {
        const itemKey = generateCartItemKey(
          item.product.id,
          item.selectedVariants
        );
        return itemKey === targetKey;
      });
    },
    [cartState.items]
  );

  // Check if product is in cart
  const isInCart = useCallback(
    (productId: string, variantKey?: string): boolean => {
      const targetKey = variantKey || productId;
      return cartState.items.some((item) => {
        const itemKey = generateCartItemKey(
          item.product.id,
          item.selectedVariants
        );
        return itemKey === targetKey;
      });
    },
    [cartState.items]
  );

  const contextValue: CartContextType = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
    isInCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
