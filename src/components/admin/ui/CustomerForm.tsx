/**
 * Simplified Customer Form Component
 * Following the same patterns as ProductForm and CategoryForm
 */

"use client";

import React, { useState, useEffect } from "react";

import { useToast } from "@/contexts/ToastContext";
import { FormField } from "@/components/admin/ui";
import {
  AdminCustomer,
  CustomerFormData,
  CustomerValidationErrors,
  CustomerStatus,
  CustomerType,
} from "@/types/admin-customer";
import { createCustomer, updateCustomer } from "@/data/admin-customers";

interface CustomerFormProps {
  customer?: AdminCustomer;
  mode: "create" | "edit";
  onSuccess?: (customer: AdminCustomer) => void;
  onCancel?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  mode,
  onSuccess,
  onCancel,
}) => {
  const { showSuccess, showError } = useToast();

  // Form state (simplified)
  const [formData, setFormData] = useState<CustomerFormData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    status: "active",
    type: "regular",
    notes: "",
    tags: [],
  });

  const [errors, setErrors] = useState<CustomerValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when customer changes (simplified)
  useEffect(() => {
    if (customer && mode === "edit") {
      setFormData({
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone || "",
        status: customer.status,
        type: customer.type,
        notes: customer.notes || "",
        tags: customer.tags || [],
      });
    }
  }, [customer, mode]);

  // Handle input changes
  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle array inputs (tags)
  const handleArrayInput = (field: "tags", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    handleInputChange(field, items);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: CustomerValidationErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showError("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      let savedCustomer: AdminCustomer;

      if (mode === "create") {
        savedCustomer = await createCustomer(formData);
        showSuccess("Customer created successfully!");
      } else {
        savedCustomer = await updateCustomer(customer!.id, formData);
        showSuccess("Customer updated successfully!");
      }

      onSuccess?.(savedCustomer);
    } catch (error) {
      console.error("Error saving customer:", error);
      showError("Failed to save customer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Simplified Single Form */}
      <div className="space-y-8">
        {/* Basic Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Email" required error={errors.email}>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter customer email"
                disabled={mode === "edit"} // Email shouldn't be editable
              />
            </FormField>

            <FormField label="Phone" error={errors.phone}>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter phone number"
              />
            </FormField>

            <FormField label="First Name" required error={errors.firstName}>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter first name"
              />
            </FormField>

            <FormField label="Last Name" required error={errors.lastName}>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="Enter last name"
              />
            </FormField>

            <FormField
              label="Tags"
              helpText="Separate tags with commas"
              className="lg:col-span-2"
            >
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) => handleArrayInput("tags", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
                placeholder="e.g., vip, loyal, electronics"
              />
            </FormField>
          </div>
        </div>

        {/* Customer Status Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Customer Status & Type
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Status" required>
              <select
                value={formData.status}
                onChange={(e) =>
                  handleInputChange("status", e.target.value as CustomerStatus)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </FormField>

            <FormField label="Customer Type" required>
              <select
                value={formData.type}
                onChange={(e) =>
                  handleInputChange("type", e.target.value as CustomerType)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
              >
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
                <option value="wholesale">Wholesale</option>
              </select>
            </FormField>
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Additional Information
          </h3>
          <FormField
            label="Notes"
            helpText="Internal notes about this customer"
          >
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
              placeholder="Enter any notes about this customer"
            />
          </FormField>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-rubik"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-rubik"
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Customer"
            : "Update Customer"}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
