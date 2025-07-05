"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogisticsDeliveryAddress, CambodiaProvince } from "@/types/delivery";
import LogisticsSelector from "./LogisticsSelector";
import { TruckIcon, PhoneIcon, UserIcon, MapPinIcon, BuildingOfficeIcon } from "@/components/ui";

interface LogisticsAddressFormProps {
  address: Partial<LogisticsDeliveryAddress>;
  province: CambodiaProvince;
  onChange: (address: Partial<LogisticsDeliveryAddress>) => void;
  errors?: Partial<Record<keyof LogisticsDeliveryAddress, string>>;
  className?: string;
}

const LogisticsAddressForm: React.FC<LogisticsAddressFormProps> = ({
  address,
  province,
  onChange,
  errors = {},
  className = "",
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();

  const handleInputChange = (field: keyof LogisticsDeliveryAddress, value: string) => {
    onChange({
      ...address,
      [field]: value,
    });
  };

  const handleLogisticsCompanyChange = (companyId: string) => {
    onChange({
      ...address,
      logisticsCompanyId: companyId,
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Form Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <TruckIcon className="w-4 h-4 text-blue-600" />
        </div>
        <h3
          className={`text-lg font-semibold text-gray-900 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Logistics Delivery Address ({province})
        </h3>
      </div>

      {/* Recipient Name */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Recipient Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={address.recipientName || ""}
            onChange={(e) => handleInputChange("recipientName", e.target.value)}
            placeholder="Enter recipient name"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200
              ${errors.recipientName ? "border-red-300" : "border-gray-300 hover:border-teal-400"}
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
        </div>
        {errors.recipientName && (
          <p className="text-sm text-red-600">{errors.recipientName}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="tel"
            value={address.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+855 12 345 678"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200
              ${errors.phone ? "border-red-300" : "border-gray-300 hover:border-teal-400"}
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          City/District <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={address.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter city or district name"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200
              ${errors.city ? "border-red-300" : "border-gray-300 hover:border-teal-400"}
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
        </div>
        {errors.city && (
          <p className="text-sm text-red-600">{errors.city}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Full Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 flex items-center pointer-events-none">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
          </div>
          <textarea
            value={address.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter complete address including house number, street, village..."
            rows={3}
            className={`
              w-full pl-10 pr-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200
              ${errors.address ? "border-red-300" : "border-gray-300 hover:border-teal-400"}
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
        </div>
        {errors.address && (
          <p className="text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      {/* Postal Code */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Postal Code (Optional)
        </label>
        <input
          type="text"
          value={address.postalCode || ""}
          onChange={(e) => handleInputChange("postalCode", e.target.value)}
          placeholder="12000"
          className={`
            w-full px-4 py-3 border rounded-md text-gray-900 bg-white
            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
            focus:outline-none transition-colors duration-200 border-gray-300 hover:border-teal-400
            ${isKhmer ? "font-khmer" : "font-rubik"}
          `}
        />
      </div>

      {/* Additional Details */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Additional Details (Optional)
        </label>
        <textarea
          value={address.additionalDetails || ""}
          onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
          placeholder="Special delivery instructions, landmarks, contact person..."
          rows={2}
          className={`
            w-full px-4 py-3 border rounded-md text-gray-900 bg-white
            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
            focus:outline-none transition-colors duration-200 border-gray-300 hover:border-teal-400
            ${isKhmer ? "font-khmer" : "font-rubik"}
          `}
        />
      </div>

      {/* Logistics Company Selection */}
      <LogisticsSelector
        province={province}
        value={address.logisticsCompanyId || ""}
        onChange={handleLogisticsCompanyChange}
        required
        error={errors.logisticsCompanyId}
        showDetails={true}
      />
    </div>
  );
};

export default LogisticsAddressForm;
