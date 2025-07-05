"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { cambodiaProvinces } from "@/data/delivery";
import { CambodiaProvince } from "@/types/delivery";
import { MapPinIcon, ChevronDownIcon } from "@/components/ui";

interface ProvinceSelectorProps {
  value: CambodiaProvince | "";
  onChange: (province: CambodiaProvince | "") => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  value,
  onChange,
  label = "Province",
  placeholder = "Select a province",
  required = false,
  error,
  disabled = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as CambodiaProvince | "";
    onChange(selectedValue);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPinIcon className="w-5 h-5 text-gray-500" />
        </div>
        
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`
            w-full pl-10 pr-10 py-3 border rounded-md text-gray-900 bg-white
            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
            focus:outline-none transition-colors duration-200 appearance-none
            ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
            ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "hover:border-teal-400"}
            ${isKhmer ? "font-khmer" : "font-rubik"}
          `}
        >
          <option value="" className="text-gray-500 bg-white">
            {placeholder}
          </option>
          
          {/* Phnom Penh (Local Delivery) */}
          <optgroup label="Local Delivery" className="text-gray-900 bg-white">
            {cambodiaProvinces
              .filter(province => province.isLocal)
              .map((province) => (
                <option
                  key={province.value}
                  value={province.value}
                  className="text-gray-900 bg-white"
                >
                  {province.label} (Local Delivery)
                </option>
              ))}
          </optgroup>
          
          {/* Other Provinces (Logistics Delivery) */}
          <optgroup label="Logistics Delivery" className="text-gray-900 bg-white">
            {cambodiaProvinces
              .filter(province => !province.isLocal)
              .map((province) => (
                <option
                  key={province.value}
                  value={province.value}
                  className="text-gray-900 bg-white"
                >
                  {province.label}
                </option>
              ))}
          </optgroup>
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p
          className={`text-sm text-red-600 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {value && (
        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPinIcon className="w-3 h-3 mr-1" />
          <span className={isKhmer ? "font-khmer" : "font-rubik"}>
            {cambodiaProvinces.find(p => p.value === value)?.isLocal
              ? "Local delivery available"
              : "Logistics delivery required"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProvinceSelector;
