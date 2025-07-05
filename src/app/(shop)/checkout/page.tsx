"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Navbar, Footer } from "@/components";
import {
  ProvinceSelector,
  LocalAddressForm,
  LogisticsAddressForm,
} from "@/components/delivery";
import {
  Button,
  ShoppingBagIcon,
  UserIcon,
  TruckIcon,
  HomeIcon,
} from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import {
  CambodiaProvince,
  DeliveryAddress,
  LocalDeliveryAddress,
  LogisticsDeliveryAddress,
} from "@/types/delivery";
import {
  isLocalDeliveryAvailable,
  calculateDeliveryPrice,
} from "@/data/delivery";

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const router = useRouter();
  const { items: cartItems, subtotal, total: cartTotal, clearCart } = useCart();
  const { showSuccess, showError } = useToast();

  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Delivery state
  const [selectedProvince, setSelectedProvince] = useState<
    CambodiaProvince | ""
  >("");
  const [deliveryAddress, setDeliveryAddress] = useState<
    Partial<DeliveryAddress>
  >({});
  const [localAddress, setLocalAddress] = useState<
    Partial<LocalDeliveryAddress>
  >({});
  const [logisticsAddress, setLogisticsAddress] = useState<
    Partial<LogisticsDeliveryAddress>
  >({});

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  // Calculate delivery price when province or address changes
  useEffect(() => {
    if (selectedProvince) {
      const isLocal = isLocalDeliveryAvailable(selectedProvince);
      const weight = cartItems.reduce(
        (total, item) => total + item.quantity * 0.5,
        0
      ); // Assume 0.5kg per item

      if (isLocal) {
        const price = calculateDeliveryPrice(
          selectedProvince,
          weight,
          subtotal
        );
        setDeliveryPrice(price);
      } else if (logisticsAddress.logisticsCompanyId) {
        const price = calculateDeliveryPrice(
          selectedProvince,
          weight,
          subtotal,
          logisticsAddress.logisticsCompanyId
        );
        setDeliveryPrice(price);
      }
    }
  }, [
    selectedProvince,
    subtotal,
    cartItems,
    logisticsAddress.logisticsCompanyId,
  ]);

  // Handle customer info changes
  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle province selection
  const handleProvinceChange = (province: CambodiaProvince | "") => {
    setSelectedProvince(province);
    setLocalAddress({});
    setLogisticsAddress({});
    setDeliveryPrice(0);
    setErrors({});
  };

  // Handle local address changes
  const handleLocalAddressChange = (address: Partial<LocalDeliveryAddress>) => {
    setLocalAddress(address);
  };

  // Handle logistics address changes
  const handleLogisticsAddressChange = (
    address: Partial<LogisticsDeliveryAddress>
  ) => {
    setLogisticsAddress(address);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Customer info validation
    if (!customerInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!customerInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Province validation
    if (!selectedProvince) {
      newErrors.province = "Please select a province";
    }

    // Address validation based on delivery type
    if (selectedProvince) {
      const isLocal = isLocalDeliveryAvailable(selectedProvince);

      if (isLocal) {
        if (!localAddress.recipientName?.trim()) {
          newErrors.recipientName = "Recipient name is required";
        }
        if (!localAddress.phone?.trim()) {
          newErrors.addressPhone = "Phone number is required";
        }
        if (!localAddress.houseNumber?.trim()) {
          newErrors.houseNumber = "House number is required";
        }
        if (!localAddress.district) {
          newErrors.district = "District is required";
        }
      } else {
        if (!logisticsAddress.recipientName?.trim()) {
          newErrors.recipientName = "Recipient name is required";
        }
        if (!logisticsAddress.phone?.trim()) {
          newErrors.addressPhone = "Phone number is required";
        }
        if (!logisticsAddress.city?.trim()) {
          newErrors.city = "City is required";
        }
        if (!logisticsAddress.address?.trim()) {
          newErrors.address = "Address is required";
        }
        if (!logisticsAddress.logisticsCompanyId) {
          newErrors.logisticsCompany = "Please select a logistics company";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showError("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare checkout data for payment page
      const checkoutData = {
        customerInfo,
        selectedProvince,
        deliveryAddress:
          selectedProvince && isLocalDeliveryAvailable(selectedProvince)
            ? { type: "local", localAddress }
            : { type: "logistics", logisticsAddress },
        deliveryPrice,
        subtotal,
        total: subtotal + deliveryPrice,
        cartItems,
        timestamp: Date.now(),
      };

      // Store checkout data in localStorage for payment page
      localStorage.setItem(
        "elecxo-checkout-data",
        JSON.stringify(checkoutData)
      );

      // Simulate form processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showSuccess("Checkout information saved! Proceeding to payment...");

      // Redirect to payment page
      router.push("/payment");
    } catch (error) {
      console.error("Checkout submission failed:", error);
      showError("Failed to process checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-2 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            Checkout
          </h1>
          <p
            className={`text-gray-600 ${isKhmer ? "font-khmer" : "font-rubik"}`}
          >
            Complete your order with our simplified delivery system
          </p>
        </div>

        {/* Empty Cart Check */}
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-md p-12 border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="w-10 h-10 text-teal-600" />
              </div>
              <h3
                className={`text-xl font-bold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Your cart is empty
              </h3>
              <p
                className={`text-gray-600 mb-8 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                Add some products to your cart before proceeding to checkout
              </p>
              <Link href="/products">
                <Button
                  className={`bg-teal-700 hover:bg-teal-800 font-medium ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-teal-600" />
                      </div>
                      <h3
                        className={`text-lg font-semibold text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Customer Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium text-gray-800 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={customerInfo.firstName}
                          onChange={(e) =>
                            handleCustomerInfoChange(
                              "firstName",
                              e.target.value
                            )
                          }
                          placeholder="Enter first name"
                          className={`
                            w-full px-4 py-3 border rounded-md text-gray-900 bg-white
                            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                            focus:outline-none transition-colors duration-200
                            ${
                              errors.firstName
                                ? "border-red-300"
                                : "border-gray-300 hover:border-teal-400"
                            }
                            ${isKhmer ? "font-khmer" : "font-rubik"}
                          `}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium text-gray-800 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={customerInfo.lastName}
                          onChange={(e) =>
                            handleCustomerInfoChange("lastName", e.target.value)
                          }
                          placeholder="Enter last name"
                          className={`
                            w-full px-4 py-3 border rounded-md text-gray-900 bg-white
                            placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                            focus:outline-none transition-colors duration-200
                            ${
                              errors.lastName
                                ? "border-red-300"
                                : "border-gray-300 hover:border-teal-400"
                            }
                            ${isKhmer ? "font-khmer" : "font-rubik"}
                          `}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium text-gray-800 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          handleCustomerInfoChange("email", e.target.value)
                        }
                        placeholder="Enter email address"
                        className={`
                          w-full px-4 py-3 border rounded-md text-gray-900 bg-white
                          placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                          focus:outline-none transition-colors duration-200
                          ${
                            errors.email
                              ? "border-red-300"
                              : "border-gray-300 hover:border-teal-400"
                          }
                          ${isKhmer ? "font-khmer" : "font-rubik"}
                        `}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium text-gray-800 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          handleCustomerInfoChange("phone", e.target.value)
                        }
                        placeholder="+855 12 345 678"
                        className={`
                          w-full px-4 py-3 border rounded-md text-gray-900 bg-white
                          placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                          focus:outline-none transition-colors duration-200
                          ${
                            errors.phone
                              ? "border-red-300"
                              : "border-gray-300 hover:border-teal-400"
                          }
                          ${isKhmer ? "font-khmer" : "font-rubik"}
                        `}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Province Selection */}
                  <div className="space-y-4">
                    <ProvinceSelector
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      label="Delivery Province"
                      placeholder="Select your province"
                      required
                      error={errors.province}
                    />
                  </div>

                  {/* Delivery Address Forms */}
                  {selectedProvince && (
                    <div className="space-y-6">
                      {isLocalDeliveryAvailable(selectedProvince) ? (
                        <LocalAddressForm
                          address={localAddress}
                          onChange={handleLocalAddressChange}
                          errors={errors}
                        />
                      ) : (
                        <LogisticsAddressForm
                          address={logisticsAddress}
                          province={selectedProvince}
                          onChange={handleLogisticsAddressChange}
                          errors={errors}
                        />
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      disabled={isSubmitting || cartItems.length === 0}
                      className={`
                        w-full h-12 font-medium bg-teal-700 hover:bg-teal-800
                        disabled:bg-gray-400 disabled:cursor-not-allowed
                        transition-colors duration-200 flex items-center justify-center gap-2
                        ${isKhmer ? "font-khmer" : "font-rubik"}
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingBagIcon className="w-5 h-5" />
                          Proceed to Payment
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md border border-gray-200 p-6 lg:sticky lg:top-8">
                <h3
                  className={`text-xl font-bold text-gray-900 mb-6 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  Order Summary
                </h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-medium text-gray-900 truncate ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {item.product.name}
                        </h4>
                        <p
                          className={`text-sm text-gray-600 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium text-gray-900 ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-gray-600 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      Subtotal
                    </p>
                    <p
                      className={`font-medium text-gray-900 ${
                        isKhmer ? "font-khmer" : "font-rubik"
                      }`}
                    >
                      {formatPrice(subtotal)}
                    </p>
                  </div>

                  {deliveryPrice > 0 && (
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-gray-600 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Delivery
                        {selectedProvince && (
                          <span className="text-xs text-gray-500 block">
                            {isLocalDeliveryAvailable(selectedProvince)
                              ? "Local"
                              : "Logistics"}{" "}
                            - {selectedProvince}
                          </span>
                        )}
                      </p>
                      <p
                        className={`font-medium text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {formatPrice(deliveryPrice)}
                      </p>
                    </div>
                  )}

                  {deliveryPrice === 0 && selectedProvince && (
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-gray-600 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Delivery
                        <span className="text-xs text-green-600 block">
                          Free shipping applied
                        </span>
                      </p>
                      <p
                        className={`font-medium text-green-600 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        FREE
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-lg font-bold text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        Total
                      </p>
                      <p
                        className={`text-lg font-bold text-gray-900 ${
                          isKhmer ? "font-khmer" : "font-rubik"
                        }`}
                      >
                        {formatPrice(subtotal + deliveryPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
