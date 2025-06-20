"use client";

import React from "react";
import { LoaderIcon } from "./Icons";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  variant = "primary",
  size = "md",
  children,
  disabled,
  className = "",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-500 disabled:bg-gray-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400",
    outline: "border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white focus:ring-teal-500 disabled:border-gray-400 disabled:text-gray-400",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading && (
        <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
      )}
      {loading && loadingText ? loadingText : children}
    </button>
  );
};

export default LoadingButton;
