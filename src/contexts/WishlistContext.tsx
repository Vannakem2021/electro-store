"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Product } from "@/types";
import { useToast } from "./ToastContext";
import { useCart } from "./CartContext";

// Wishlist item interface
export interface WishlistItem {
  product: Product;
  addedAt: string; // ISO date string
}

// Wishlist state interface
interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
}

// Wishlist actions interface
interface WishlistActions {
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistItem: (productId: string) => WishlistItem | undefined;
  moveToCart: (productId: string, quantity?: number) => void;
  bulkMoveToCart: (productIds: string[]) => void;
  shareWishlist: () => string;
}

// Combined wishlist context interface
interface WishlistContextType extends WishlistState, WishlistActions {}

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

// Wishlist provider props
interface WishlistProviderProps {
  children: React.ReactNode;
}

// Local storage key
const WISHLIST_STORAGE_KEY = "elecxo-wishlist";

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const { showSuccess, showError, showInfo } = useToast();
  const { addToCart } = useCart();

  const [wishlistState, setWishlistState] = useState<WishlistState>({
    items: [],
    itemCount: 0,
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistState({
          items: parsedWishlist.items || [],
          itemCount: parsedWishlist.items?.length || 0,
        });
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      // Don't show toast during initial load to avoid render phase issues
      // The user will notice if their wishlist is empty and can refresh manually
    }
  }, []); // Remove dependencies to avoid re-running

  // Save wishlist to localStorage whenever wishlist state changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistState));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
      // Don't show toast for save errors to avoid render phase issues
      // The error is logged and the user will notice if changes don't persist
    }
  }, [wishlistState]);

  // Add item to wishlist
  const addToWishlist = useCallback(
    (product: Product) => {
      try {
        let wasAdded = false;
        let alreadyExists = false;

        setWishlistState((prevState) => {
          // Check if item already exists
          const existingItem = prevState.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            alreadyExists = true;
            return prevState;
          }

          const newItem: WishlistItem = {
            product,
            addedAt: new Date().toISOString(),
          };

          const newItems = [...prevState.items, newItem];
          wasAdded = true;

          return {
            items: newItems,
            itemCount: newItems.length,
          };
        });

        // Show toasts after state update
        if (alreadyExists) {
          showInfo(
            t("wishlist.alreadyInWishlist"),
            `${product.name} is already in your wishlist`
          );
        } else if (wasAdded) {
          showSuccess(
            t("wishlist.addedToWishlist"),
            `${product.name} added to wishlist`
          );
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        showError(
          t("toast.error"),
          "Failed to add item to wishlist. Please try again."
        );
      }
    },
    [showSuccess, showError, showInfo, t]
  );

  // Remove item from wishlist
  const removeFromWishlist = useCallback(
    (productId: string, silent: boolean = false) => {
      try {
        let removedItem: WishlistItem | undefined;

        setWishlistState((prevState) => {
          removedItem = prevState.items.find(
            (item) => item.product.id === productId
          );

          const newItems = prevState.items.filter(
            (item) => item.product.id !== productId
          );

          return {
            items: newItems,
            itemCount: newItems.length,
          };
        });

        // Show toast after state update
        if (removedItem && !silent) {
          showSuccess(
            t("wishlist.removedFromWishlist"),
            `${removedItem.product.name} removed from wishlist`
          );
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        showError(
          t("toast.error"),
          "Failed to remove item from wishlist. Please try again."
        );
      }
    },
    [showSuccess, showError, t]
  );

  // Clear entire wishlist
  const clearWishlist = useCallback(() => {
    try {
      setWishlistState({
        items: [],
        itemCount: 0,
      });

      showSuccess(t("wishlist.cleared"), "Wishlist cleared successfully");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      showError(
        t("toast.error"),
        "Failed to clear wishlist. Please try again."
      );
    }
  }, [showSuccess, showError, t]);

  // Check if product is in wishlist
  const isInWishlist = useCallback(
    (productId: string): boolean => {
      return wishlistState.items.some((item) => item.product.id === productId);
    },
    [wishlistState.items]
  );

  // Get specific wishlist item
  const getWishlistItem = useCallback(
    (productId: string): WishlistItem | undefined => {
      return wishlistState.items.find((item) => item.product.id === productId);
    },
    [wishlistState.items]
  );

  // Move item to cart (requires cart context integration)
  const moveToCart = useCallback(
    (productId: string, quantity: number = 1) => {
      try {
        const wishlistItem = getWishlistItem(productId);
        if (!wishlistItem) {
          showError(t("toast.error"), "Item not found in wishlist");
          return;
        }

        // Add to cart (cart context will show "added to cart" toast)
        addToCart(wishlistItem.product, quantity);

        // Remove from wishlist (this will show "removed from wishlist" toast)
        removeFromWishlist(productId);
      } catch (error) {
        console.error("Error moving to cart:", error);
        showError(
          t("toast.error"),
          "Failed to move item to cart. Please try again."
        );
      }
    },
    [getWishlistItem, addToCart, removeFromWishlist, showSuccess, showError, t]
  );

  // Bulk move items to cart
  const bulkMoveToCart = useCallback(
    (productIds: string[]) => {
      try {
        const validItems = productIds
          .map((id) => getWishlistItem(id))
          .filter((item) => item !== undefined) as WishlistItem[];

        if (validItems.length === 0) {
          showError(t("toast.error"), "No valid items to move to cart");
          return;
        }

        // Add items to cart silently (no individual toasts)
        validItems.forEach((item) =>
          addToCart(item.product, 1, undefined, true)
        );

        // Remove items from wishlist silently (no individual toasts)
        productIds.forEach((id) => removeFromWishlist(id, true));

        // Show a summary toast for the bulk operation
        showSuccess(
          t("wishlist.bulkMovedToCart"),
          `${validItems.length} items moved to cart`
        );
      } catch (error) {
        console.error("Error bulk moving to cart:", error);
        showError(
          t("toast.error"),
          "Failed to move items to cart. Please try again."
        );
      }
    },
    [getWishlistItem, addToCart, removeFromWishlist, showSuccess, showError, t]
  );

  // Share wishlist (generate shareable link)
  const shareWishlist = useCallback((): string => {
    try {
      const wishlistData = {
        items: wishlistState.items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          addedAt: item.addedAt,
        })),
        sharedAt: new Date().toISOString(),
      };

      const encodedData = btoa(JSON.stringify(wishlistData));
      const shareUrl = `${window.location.origin}/wishlist/shared/${encodedData}`;

      // Copy to clipboard if available
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        showSuccess(t("wishlist.shared"), "Wishlist link copied to clipboard");
      } else {
        showInfo(
          t("wishlist.shareLink"),
          "Copy this link to share your wishlist"
        );
      }

      return shareUrl;
    } catch (error) {
      console.error("Error sharing wishlist:", error);
      showError(
        t("toast.error"),
        "Failed to generate share link. Please try again."
      );
      return "";
    }
  }, [wishlistState.items, showSuccess, showError, showInfo, t]);

  const contextValue: WishlistContextType = {
    ...wishlistState,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistItem,
    moveToCart,
    bulkMoveToCart,
    shareWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
