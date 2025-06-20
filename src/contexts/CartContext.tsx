"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Product, CartItem } from "@/types";
import { useToast } from "./ToastContext";

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
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (productId: string) => CartItem | undefined;
  isInCart: (productId: string) => boolean;
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
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const discount = items.reduce((sum, item) => {
      const originalPrice = item.product.originalPrice || item.product.price;
      const discountAmount =
        (originalPrice - item.product.price) * item.quantity;
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
    (product: Product, quantity: number = 1, silent: boolean = false) => {
      try {
        setCartState((prevState) => {
          const existingItemIndex = prevState.items.findIndex(
            (item) => item.product.id === product.id
          );

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
            newItems = [...prevState.items, { product, quantity }];
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
          showSuccess(t("toast.addedToCart"), `${product.name}`);
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
    (productId: string) => {
      try {
        setCartState((prevState) => {
          const removedItem = prevState.items.find(
            (item) => item.product.id === productId
          );

          const newItems = prevState.items.filter(
            (item) => item.product.id !== productId
          );
          const totals = calculateTotals(newItems);

          // Show success toast after state update
          if (removedItem) {
            showSuccess(
              t("toast.removedFromCart"),
              `${removedItem.product.name}`
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
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartState((prevState) => {
        const newItems = prevState.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
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
    (productId: string): CartItem | undefined => {
      return cartState.items.find((item) => item.product.id === productId);
    },
    [cartState.items]
  );

  // Check if product is in cart
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cartState.items.some((item) => item.product.id === productId);
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
