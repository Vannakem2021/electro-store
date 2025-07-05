"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { LocalDeliveryAddress, PhnomPenhDistrict } from "@/types/delivery";
import DistrictSelector from "./DistrictSelector";
import { HomeIcon, PhoneIcon, UserIcon, MapPinIcon } from "@/components/ui";

interface LocalAddressFormProps {
  address: Partial<LocalDeliveryAddress>;
  onChange: (address: Partial<LocalDeliveryAddress>) => void;
  errors?: Partial<Record<keyof LocalDeliveryAddress, string>>;
  className?: string;
}

const LocalAddressForm: React.FC<LocalAddressFormProps> = ({
  address,
  onChange,
  errors = {},
  className = "",
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();

  const handleInputChange = (field: keyof LocalDeliveryAddress, value: string) => {
    onChange({
      ...address,
      [field]: value,
    });
  };

  const handleDistrictChange = (district: PhnomPenhDistrict | "") => {
    onChange({
      ...address,
      district: district as PhnomPenhDistrict,
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Form Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
          <HomeIcon className="w-4 h-4 text-teal-600" />
        </div>
        <h3
          className={`text-lg font-semibold text-gray-900 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Local Delivery Address (Phnom Penh)
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

      {/* House Number and Street */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* House Number */}
        <div className="space-y-2">
          <label
            className={`block text-sm font-medium text-gray-800 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            House Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.houseNumber || ""}
            onChange={(e) => handleInputChange("houseNumber", e.target.value)}
            placeholder="123A"
            className={`
              w-full px-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200
              ${errors.houseNumber ? "border-red-300" : "border-gray-300 hover:border-teal-400"}
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
          {errors.houseNumber && (
            <p className="text-sm text-red-600">{errors.houseNumber}</p>
          )}
        </div>

        {/* Street Number */}
        <div className="space-y-2">
          <label
            className={`block text-sm font-medium text-gray-800 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            Street Number
          </label>
          <input
            type="text"
            value={address.streetNumber || ""}
            onChange={(e) => handleInputChange("streetNumber", e.target.value)}
            placeholder="271"
            className={`
              w-full px-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200 border-gray-300 hover:border-teal-400
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
        </div>
      </div>

      {/* Street Name */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Street Name
        </label>
        <input
          type="text"
          value={address.streetName || ""}
          onChange={(e) => handleInputChange("streetName", e.target.value)}
          placeholder="Monivong Boulevard"
          className={`
            w-full px-4 py-3 border rounded-md text-gray-900 bg-white
            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
            focus:outline-none transition-colors duration-200 border-gray-300 hover:border-teal-400
            ${isKhmer ? "font-khmer" : "font-rubik"}
          `}
        />
      </div>

      {/* District */}
      <DistrictSelector
        value={address.district || ""}
        onChange={handleDistrictChange}
        required
        error={errors.district}
      />

      {/* Landmark */}
      <div className="space-y-2">
        <label
          className={`block text-sm font-medium text-gray-800 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          Landmark (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={address.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            placeholder="Near Central Market"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-md text-gray-900 bg-white
              placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              focus:outline-none transition-colors duration-200 border-gray-300 hover:border-teal-400
              ${isKhmer ? "font-khmer" : "font-rubik"}
            `}
          />
        </div>
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
          placeholder="Floor, apartment number, delivery instructions..."
          rows={3}
          className={`
            w-full px-4 py-3 border rounded-md text-gray-900 bg-white
            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
            focus:outline-none transition-colors duration-200 border-gray-300 hover:border-teal-400
            ${isKhmer ? "font-khmer" : "font-rubik"}
          `}
        />
      </div>
    </div>
  );
};

export default LocalAddressForm;
