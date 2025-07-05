"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { AdminLayout } from "@/components/admin/layout";
import { ProtectedRoute, FormField } from "@/components/admin/ui";
import {
  CogIcon,
  SaveIcon,
  BellIcon,
  ShieldIcon,
  GlobeIcon,
} from "@/components/ui";

interface SettingsData {
  // General Settings
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportPhone: string;

  // Notification Settings
  emailNotifications: boolean;
  orderNotifications: boolean;
  lowStockAlerts: boolean;

  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: number;

  // Localization
  defaultLanguage: string;
  timezone: string;
  currency: string;
}

const SettingsPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const { showSuccess, showError } = useToast();

  // Settings state
  const [settings, setSettings] = useState<SettingsData>({
    siteName: "Elecxo Admin",
    siteDescription: "Electronics E-commerce Platform",
    contactEmail: "admin@elecxo.com",
    supportPhone: "+855 12 345 678",
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    defaultLanguage: "en",
    timezone: "Asia/Phnom_Penh",
    currency: "USD",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle form changes
  const handleChange = (field: keyof SettingsData, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSuccess("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      showError("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Settings sections
  const settingsSections = [
    {
      title: "General Settings",
      icon: CogIcon,
      color: "teal",
      fields: [
        {
          key: "siteName" as keyof SettingsData,
          label: "Site Name",
          type: "text",
          placeholder: "Enter site name",
        },
        {
          key: "siteDescription" as keyof SettingsData,
          label: "Site Description",
          type: "textarea",
          placeholder: "Enter site description",
        },
        {
          key: "contactEmail" as keyof SettingsData,
          label: "Contact Email",
          type: "email",
          placeholder: "Enter contact email",
        },
        {
          key: "supportPhone" as keyof SettingsData,
          label: "Support Phone",
          type: "tel",
          placeholder: "Enter support phone number",
        },
      ],
    },
    {
      title: "Notifications",
      icon: BellIcon,
      color: "blue",
      fields: [
        {
          key: "emailNotifications" as keyof SettingsData,
          label: "Email Notifications",
          type: "checkbox",
          description: "Receive email notifications for important events",
        },
        {
          key: "orderNotifications" as keyof SettingsData,
          label: "Order Notifications",
          type: "checkbox",
          description: "Get notified when new orders are placed",
        },
        {
          key: "lowStockAlerts" as keyof SettingsData,
          label: "Low Stock Alerts",
          type: "checkbox",
          description: "Receive alerts when products are running low on stock",
        },
      ],
    },
    {
      title: "Security",
      icon: ShieldIcon,
      color: "red",
      fields: [
        {
          key: "twoFactorAuth" as keyof SettingsData,
          label: "Two-Factor Authentication",
          type: "checkbox",
          description: "Enable two-factor authentication for enhanced security",
        },
        {
          key: "sessionTimeout" as keyof SettingsData,
          label: "Session Timeout (minutes)",
          type: "number",
          placeholder: "Enter session timeout in minutes",
          min: 5,
          max: 120,
        },
      ],
    },
    {
      title: "Localization",
      icon: GlobeIcon,
      color: "green",
      fields: [
        {
          key: "defaultLanguage" as keyof SettingsData,
          label: "Default Language",
          type: "select",
          options: [
            { value: "en", label: "English" },
            { value: "km", label: "Khmer" },
          ],
        },
        {
          key: "timezone" as keyof SettingsData,
          label: "Timezone",
          type: "select",
          options: [
            { value: "Asia/Phnom_Penh", label: "Asia/Phnom Penh" },
            { value: "UTC", label: "UTC" },
            { value: "Asia/Bangkok", label: "Asia/Bangkok" },
          ],
        },
        {
          key: "currency" as keyof SettingsData,
          label: "Currency",
          type: "select",
          options: [
            { value: "USD", label: "US Dollar (USD)" },
            { value: "KHR", label: "Cambodian Riel (KHR)" },
          ],
        },
      ],
    },
  ];

  return (
    <ProtectedRoute resource="settings" action="read">
      <AdminLayout
        title="Settings"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Settings" },
        ]}
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-teal-100">
                <CogIcon className="w-8 h-8 text-teal-600" />
              </div>
              <div className="ml-4">
                <h1
                  className={`text-2xl font-bold text-gray-900 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Settings
                </h1>
                <p
                  className={`text-gray-600 mt-1 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Manage your application settings and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {settingsSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-md shadow-sm">
                {/* Section Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-md bg-${section.color}-100`}>
                      <section.icon
                        className={`w-6 h-6 text-${section.color}-600`}
                      />
                    </div>
                    <h2
                      className={`ml-4 text-lg font-semibold text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Fields */}
                <div className="p-6 space-y-6">
                  {section.fields.map((field, fieldIndex) => (
                    <FormField
                      key={fieldIndex}
                      label={field.label}
                      required={
                        field.key === "siteName" || field.key === "contactEmail"
                      }
                      helpText={field.description}
                    >
                      {field.type === "textarea" ? (
                        <textarea
                          value={settings[field.key] as string}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                        />
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings[field.key] as boolean}
                            onChange={(e) =>
                              handleChange(field.key, e.target.checked)
                            }
                            className="w-4 h-4 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                          />
                        </div>
                      ) : field.type === "select" ? (
                        <select
                          value={settings[field.key] as string}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                        >
                          {field.options?.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="text-gray-900 bg-white"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={settings[field.key] as string | number}
                          onChange={(e) =>
                            handleChange(
                              field.key,
                              field.type === "number"
                                ? parseInt(e.target.value) || 0
                                : e.target.value
                            )
                          }
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                        />
                      )}
                    </FormField>
                  ))}
                </div>
              </div>
            ))}

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors duration-200 font-rubik ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <SaveIcon className="w-5 h-5 mr-2" />
                {isLoading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SettingsPage;
