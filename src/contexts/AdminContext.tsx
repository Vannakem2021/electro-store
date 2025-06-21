"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AdminUser, LoginCredentials, Permission } from "@/types/admin";
import { validateAdminCredentials, hasPermission as checkPermission } from "@/data/admin";
import { useToast } from "./ToastContext";

// Admin context interface
interface AdminContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Permission[];
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  isRole: (roleName: string) => boolean;
  getRoleLevel: () => number;
}

// Create the context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Custom hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

// Admin provider props
interface AdminProviderProps {
  children: React.ReactNode;
}

// Local storage keys
const ADMIN_TOKEN_KEY = "elecxo-admin-token";
const ADMIN_USER_KEY = "elecxo-admin-user";

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize admin state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(ADMIN_TOKEN_KEY);
        const userData = localStorage.getItem(ADMIN_USER_KEY);

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          // In a real app, you would validate the token with the server
          // For now, we'll just check if the token exists
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error initializing admin auth:", error);
        // Clear invalid data
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate credentials using mock data
      const authenticatedUser = validateAdminCredentials(credentials.email, credentials.password);

      if (!authenticatedUser) {
        showError(
          "Authentication Failed",
          "Invalid email or password. Please try again."
        );
        return false;
      }

      if (!authenticatedUser.isActive) {
        showError(
          "Account Disabled",
          "Your account has been disabled. Please contact an administrator."
        );
        return false;
      }

      // Generate mock token (in real app, this would come from server)
      const token = `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Update user's last login time
      const updatedUser = {
        ...authenticatedUser,
        lastLoginAt: new Date(),
      };

      // Store authentication data
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);

      showSuccess(
        "Login Successful",
        `Welcome back, ${updatedUser.firstName}!`
      );

      return true;
    } catch (error) {
      console.error("Login error:", error);
      showError(
        "Login Error",
        "An unexpected error occurred. Please try again."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  // Logout function
  const logout = useCallback(() => {
    try {
      // Clear localStorage
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);

      // Clear state
      setUser(null);

      // Show success message
      showSuccess("Logged Out", "You have been successfully logged out.");

      // Redirect to admin login
      router.push("/admin/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      showError("Logout Error", "An error occurred during logout.");
    }
  }, [router, showSuccess, showError]);

  // Check if user has specific permission
  const hasPermission = useCallback((resource: string, action: string): boolean => {
    if (!user) return false;
    return checkPermission(user, resource, action);
  }, [user]);

  // Check if user has specific role
  const isRole = useCallback((roleName: string): boolean => {
    if (!user) return false;
    return user.role.name.toLowerCase() === roleName.toLowerCase();
  }, [user]);

  // Get user's role level
  const getRoleLevel = useCallback((): number => {
    if (!user) return 999; // Lowest priority for unauthenticated users
    return user.role.level;
  }, [user]);

  // Computed values
  const isAuthenticated = !!user;
  const permissions = user?.permissions || [];

  const contextValue: AdminContextType = {
    user,
    isAuthenticated,
    isLoading,
    permissions,
    login,
    logout,
    hasPermission,
    isRole,
    getRoleLevel,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
