"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AccountSidebar from "@/components/account/AccountSidebar";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank";
  name: string;
  details: string;
  isDefault: boolean;
  expiryDate?: string;
}

const PaymentPage: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "**** **** **** 4242",
      isDefault: true,
      expiryDate: "12/25"
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard ending in 8888",
      details: "**** **** **** 8888",
      isDefault: false,
      expiryDate: "08/26"
    },
    {
      id: "3",
      type: "paypal",
      name: "PayPal",
      details: "ayman.ahmed@example.com",
      isDefault: false
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new card:", newCard);
    setShowAddCard(false);
    setNewCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: ""
    });
  };

  const setDefaultPayment = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return "💳";
      case "paypal":
        return "🅿️";
      case "bank":
        return "🏦";
      default:
        return "💳";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-poppins">
          <Link href="/" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/account" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            Account
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Payment & Installments</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar activeItem="payment" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Payment Methods</h1>
                  <p className="text-gray-600 font-poppins">Manage your payment methods and billing information</p>
                </div>
                <Button
                  onClick={() => setShowAddCard(true)}
                  className="font-poppins font-semibold"
                >
                  Add Payment Method
                </Button>
              </div>

              {/* Payment Methods List */}
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{getPaymentIcon(method.type)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 font-poppins">{method.name}</h3>
                          <p className="text-sm text-gray-600 font-poppins">{method.details}</p>
                          {method.expiryDate && (
                            <p className="text-xs text-gray-500 font-poppins">Expires {method.expiryDate}</p>
                          )}
                          {method.isDefault && (
                            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded font-poppins">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDefaultPayment(method.id)}
                            className="font-poppins font-semibold"
                          >
                            Set Default
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removePaymentMethod(method.id)}
                          className="font-poppins font-semibold text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Payment Method Form */}
            {showAddCard && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Add New Payment Method</h2>
                  <p className="text-gray-600 font-poppins">Enter your card details to add a new payment method</p>
                </div>

                <form onSubmit={handleAddCard} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={newCard.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={newCard.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={newCard.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={newCard.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={newCard.billingAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, City, State, ZIP"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddCard(false)}
                      className="px-8 py-3 font-poppins font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-8 py-3 font-poppins font-semibold bg-blue-800 hover:bg-blue-900"
                    >
                      Add Payment Method
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Installment Options */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Installment Options</h2>
                <p className="text-gray-600 font-poppins">Choose how you want to pay for your purchases</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-800 text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">Pay in Full</h3>
                  <p className="text-sm text-gray-600 font-poppins">Pay the full amount at checkout</p>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-800 text-2xl">📅</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">3 Installments</h3>
                  <p className="text-sm text-gray-600 font-poppins">Split your payment into 3 equal parts</p>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-800 text-2xl">🗓️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">6 Installments</h3>
                  <p className="text-sm text-gray-600 font-poppins">Split your payment into 6 equal parts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
