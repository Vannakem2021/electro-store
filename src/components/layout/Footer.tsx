"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { socialLinks } from "@/data";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "@/components/ui";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isKhmer, language, setLanguage } = useLanguage();

  const quickLinks = [
    { label: t("footer.aboutUs"), href: "/about" },
    { label: t("footer.contactUs"), href: "/contact" },
    { label: t("footer.shippingInfo"), href: "/shipping" },
    { label: t("footer.returns"), href: "/returns" },
  ];

  const customerService = [
    { label: t("footer.faq"), href: "/faq" },
    { label: t("footer.support"), href: "/support" },
    { label: t("footer.privacyPolicy"), href: "/privacy" },
    { label: t("footer.termsOfService"), href: "/terms" },
  ];

  const myAccount = [
    { label: t("footer.myAccount"), href: "/account" },
    { label: t("footer.orderHistory"), href: "/account/orders" },
    { label: t("footer.wishlist"), href: "/wishlist" },
    { label: t("cart.title"), href: "/cart" },
  ];

  return (
    <footer className="bg-teal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3
              className={`text-2xl font-bold mb-4 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              Elecxo
            </h3>
            <p
              className={`text-teal-200 mb-4 text-sm leading-relaxed ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("footer.companyDescription")}
            </p>

            {/* Payment Methods */}
            <div className="mb-4">
              <h4
                className={`text-sm font-medium mb-2 text-teal-100 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("footer.paymentMethods")}
              </h4>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span
                    className={`text-teal-900 font-bold text-xs ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    VISA
                  </span>
                </div>
                <div className="bg-red-500 rounded px-2 py-1">
                  <span
                    className={`text-white font-bold text-xs ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    MC
                  </span>
                </div>
                <div className="bg-teal-600 rounded px-2 py-1">
                  <span
                    className={`text-white font-bold text-xs ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    ABA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4
              className={`font-semibold mb-4 text-teal-100 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-teal-200 hover:text-white transition-colors text-sm ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-1">
            <h4
              className={`font-semibold mb-4 text-teal-100 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("footer.customerService")}
            </h4>
            <ul className="space-y-2">
              {customerService.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-teal-200 hover:text-white transition-colors text-sm ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div className="lg:col-span-1">
            <h4
              className={`font-semibold mb-4 text-teal-100 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("footer.myAccount")}
            </h4>
            <ul className="space-y-2">
              {myAccount.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-teal-200 hover:text-white transition-colors text-sm ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-teal-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Address and Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p
                className={`text-teal-200 text-sm mb-1 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("footer.address")}
              </p>
              <p
                className={`text-teal-200 text-sm ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("footer.copyright")}
              </p>
            </div>

            {/* Language Selector and Social Links */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "km")}
                  className={`bg-teal-800 text-white border border-teal-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  <option value="en">English</option>
                  <option value="km">ខ្មែរ</option>
                </select>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <span
                  className={`text-teal-200 text-sm mr-2 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("footer.followUs")}:
                </span>
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-teal-200 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.name === "Instagram" && (
                      <InstagramIcon className="h-5 w-5" />
                    )}
                    {social.name === "Facebook" && (
                      <FacebookIcon className="h-5 w-5" />
                    )}
                    {social.name === "Twitter" && (
                      <TwitterIcon className="h-5 w-5" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
