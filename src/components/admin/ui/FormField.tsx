"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  helpText,
  children,
  className = "",
}) => {
  const { isKhmer } = useLanguage();

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        className={`block text-sm font-medium text-gray-700-accessible ${
          isKhmer ? "font-khmer" : "font-rubik"
        }`}
      >
        {label}
        {required && <span className="text-red-700-accessible ml-1">*</span>}
      </label>

      {children}

      {error && (
        <p
          className={`text-sm text-red-700-accessible ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {error}
        </p>
      )}

      {helpText && !error && (
        <p
          className={`text-sm text-gray-600-accessible ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {helpText}
        </p>
      )}
    </div>
  );
};

export default FormField;
