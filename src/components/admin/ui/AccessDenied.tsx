"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePermissions } from "@/hooks/usePermissions";
import { ShieldIcon, HomeIcon, ArrowLeftIcon } from "@/components/ui/Icons";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showRoleInfo?: boolean;
  className?: string;
}

/**
 * AccessDenied component for displaying permission denied messages
 */
const AccessDenied: React.FC<AccessDeniedProps> = ({
  title = "Access Denied",
  message = "You don't have permission to access this resource.",
  showBackButton = true,
  showHomeButton = true,
  showRoleInfo = true,
  className = "",
}) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const { user, getRoleInfo } = usePermissions();

  const roleInfo = getRoleInfo();

  return (
    <div
      className={`min-h-96 flex items-center justify-center p-8 ${className}`}
    >
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <ShieldIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-2xl font-bold text-gray-900 mb-4 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {title}
        </h1>

        {/* Message */}
        <p
          className={`text-gray-600 mb-6 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          {message}
        </p>

        {/* Role Information */}
        {showRoleInfo && roleInfo && (
          <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
            <h3
              className={`text-sm font-semibold text-gray-800 mb-2 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Your Access Level:
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-rubik">
                <span className="font-medium">Role:</span> {roleInfo.name}
              </p>
              <p className="text-sm text-gray-600 font-rubik">
                <span className="font-medium">Level:</span> {roleInfo.level}
              </p>
              <p className="text-sm text-gray-600 font-rubik">
                <span className="font-medium">User:</span> {user?.firstName}{" "}
                {user?.lastName}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go Back
            </button>
          )}

          {showHomeButton && (
            <Link
              href="/admin"
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          )}
        </div>

        {/* Contact Admin */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p
            className={`text-sm text-gray-500 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            Need access to this feature?{" "}
            <Link
              href="/admin/support"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Contact an administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
