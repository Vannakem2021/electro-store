"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLogisticsCompaniesByProvince } from "@/data/delivery";
import { CambodiaProvince, LogisticsCompany } from "@/types/delivery";
import { TruckIcon, ChevronDownIcon, StarIcon, ClockIcon } from "@/components/ui";

interface LogisticsSelectorProps {
  province: CambodiaProvince;
  value: string;
  onChange: (companyId: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  showDetails?: boolean;
}

const LogisticsSelector: React.FC<LogisticsSelectorProps> = ({
  province,
  value,
  onChange,
  label = "Logistics Company",
  placeholder = "Select a logistics company",
  required = false,
  error,
  disabled = false,
  className = "",
  showDetails = true,
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();

  const availableCompanies = getLogisticsCompaniesByProvince(province);
  const selectedCompany = availableCompanies.find(company => company.id === value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (availableCompanies.length === 0) {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label
            className={`block text-sm font-medium text-gray-800 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {label}
          </label>
        )}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <TruckIcon className="w-5 h-5 text-yellow-600 mr-2" />
            <p
              className={`text-sm text-yellow-800 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              No logistics companies available for {province}. Please contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <TruckIcon className="w-5 h-5 text-gray-500" />
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
          
          {availableCompanies.map((company) => (
            <option
              key={company.id}
              value={company.id}
              className="text-gray-900 bg-white"
            >
              {company.name} - ${company.basePrice.toFixed(2)} ({company.estimatedDeliveryDays.min}-{company.estimatedDeliveryDays.max} days)
            </option>
          ))}
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

      {/* Company Details */}
      {showDetails && selectedCompany && (
        <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4
                className={`font-medium text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {selectedCompany.name}
              </h4>
              <p
                className={`text-sm text-gray-600 mt-1 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {selectedCompany.description}
              </p>
              
              <div className="flex items-center space-x-4 mt-2">
                {/* Rating */}
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-700">
                    {selectedCompany.rating.toFixed(1)} ({selectedCompany.reviewCount} reviews)
                  </span>
                </div>
                
                {/* Delivery Time */}
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">
                    {selectedCompany.estimatedDeliveryDays.min}-{selectedCompany.estimatedDeliveryDays.max} days
                  </span>
                </div>
              </div>
              
              {/* Pricing */}
              <div className="mt-2">
                <span className="text-sm text-gray-600">
                  Base price: <span className="font-medium text-gray-900">${selectedCompany.basePrice.toFixed(2)}</span>
                  {selectedCompany.pricePerKg && (
                    <span> + ${selectedCompany.pricePerKg.toFixed(2)}/kg</span>
                  )}
                </span>
              </div>
              
              {/* Tracking */}
              {selectedCompany.trackingSupported && (
                <div className="mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Tracking Available
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticsSelector;
