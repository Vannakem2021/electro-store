"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AccountSidebar from "@/components/account/AccountSidebar";

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: "percentage" | "fixed";
  minAmount: number;
  expiryDate: string;
  isUsed: boolean;
  isExpired: boolean;
}

const DiscountsPage: React.FC = () => {
  const [coupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "WELCOME20",
      title: "Welcome Discount",
      description: "Get 20% off on your first order",
      discount: 20,
      type: "percentage",
      minAmount: 50,
      expiryDate: "2024-12-31",
      isUsed: false,
      isExpired: false
    },
    {
      id: "2",
      code: "SAVE50",
      title: "Save $50",
      description: "Get $50 off on orders over $200",
      discount: 50,
      type: "fixed",
      minAmount: 200,
      expiryDate: "2024-06-30",
      isUsed: false,
      isExpired: false
    },
    {
      id: "3",
      code: "ELECTRONICS15",
      title: "Electronics Sale",
      description: "15% off on all electronics",
      discount: 15,
      type: "percentage",
      minAmount: 100,
      expiryDate: "2024-01-15",
      isUsed: true,
      isExpired: false
    },
    {
      id: "4",
      code: "EXPIRED10",
      title: "Expired Coupon",
      description: "This coupon has expired",
      discount: 10,
      type: "percentage",
      minAmount: 30,
      expiryDate: "2023-12-31",
      isUsed: false,
      isExpired: true
    }
  ]);

  const [newCouponCode, setNewCouponCode] = useState("");

  const handleRedeemCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Redeeming coupon:", newCouponCode);
    setNewCouponCode("");
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
    console.log("Copied coupon code:", code);
  };

  const getDiscountText = (coupon: Coupon) => {
    return coupon.type === "percentage" 
      ? `${coupon.discount}% OFF`
      : `$${coupon.discount} OFF`;
  };

  const getCouponStatus = (coupon: Coupon) => {
    if (coupon.isExpired) return { text: "Expired", color: "bg-red-100 text-red-800" };
    if (coupon.isUsed) return { text: "Used", color: "bg-gray-100 text-gray-800" };
    return { text: "Available", color: "bg-green-100 text-green-800" };
  };

  const availableCoupons = coupons.filter(c => !c.isUsed && !c.isExpired);
  const usedCoupons = coupons.filter(c => c.isUsed);
  const expiredCoupons = coupons.filter(c => c.isExpired);

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
          <span className="text-gray-900 font-medium">Discounts</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar activeItem="discounts" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Discounts & Coupons</h1>
                <p className="text-gray-600 font-poppins">Manage your discount codes and special offers</p>
              </div>

              {/* Redeem Coupon Form */}
              <form onSubmit={handleRedeemCoupon} className="flex gap-4">
                <input
                  type="text"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                />
                <Button
                  type="submit"
                  className="px-8 py-3 font-poppins font-semibold bg-blue-800 hover:bg-blue-900"
                >
                  Redeem
                </Button>
              </form>
            </div>

            {/* Available Coupons */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">
                Available Coupons ({availableCoupons.length})
              </h2>
              
              {availableCoupons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableCoupons.map((coupon) => {
                    const status = getCouponStatus(coupon);
                    return (
                      <div key={coupon.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors duration-200 relative overflow-hidden">
                        {/* Discount Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold font-poppins">
                            {getDiscountText(coupon)}
                          </span>
                        </div>

                        <div className="pr-20">
                          <h3 className="font-bold text-gray-900 font-poppins mb-2">{coupon.title}</h3>
                          <p className="text-sm text-gray-600 font-poppins mb-4">{coupon.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 font-poppins">Code:</span>
                              <span className="font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                {coupon.code}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 font-poppins">Min. Amount:</span>
                              <span className="font-poppins font-semibold text-gray-900">${coupon.minAmount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 font-poppins">Expires:</span>
                              <span className="font-poppins font-semibold text-gray-900">
                                {new Date(coupon.expiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold font-poppins ${status.color}`}>
                              {status.text}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => copyCouponCode(coupon.code)}
                              className="font-poppins font-semibold"
                            >
                              Copy Code
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">🏷️</span>
                  </div>
                  <p className="text-gray-600 font-poppins">No available coupons at the moment</p>
                </div>
              )}
            </div>

            {/* Used Coupons */}
            {usedCoupons.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">
                  Used Coupons ({usedCoupons.length})
                </h2>
                
                <div className="space-y-4">
                  {usedCoupons.map((coupon) => {
                    const status = getCouponStatus(coupon);
                    return (
                      <div key={coupon.id} className="border-2 border-gray-200 rounded-xl p-6 opacity-75">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 font-poppins">{coupon.title}</h3>
                            <p className="text-sm text-gray-600 font-poppins">{coupon.description}</p>
                            <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                              {coupon.code}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-500 font-poppins mb-2">
                              {getDiscountText(coupon)}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold font-poppins ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expired Coupons */}
            {expiredCoupons.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-6">
                  Expired Coupons ({expiredCoupons.length})
                </h2>
                
                <div className="space-y-4">
                  {expiredCoupons.map((coupon) => {
                    const status = getCouponStatus(coupon);
                    return (
                      <div key={coupon.id} className="border-2 border-gray-200 rounded-xl p-6 opacity-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 font-poppins">{coupon.title}</h3>
                            <p className="text-sm text-gray-600 font-poppins">{coupon.description}</p>
                            <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                              {coupon.code}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-500 font-poppins mb-2">
                              {getDiscountText(coupon)}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold font-poppins ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsPage;
