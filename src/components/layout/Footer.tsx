import React from "react";
import Link from "next/link";
import { footerSections, socialLinks } from "@/data";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 font-poppins">Elecxo</h3>
            <p className="text-blue-200 mb-4 text-sm leading-relaxed font-poppins">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white rounded px-2 py-1">
                <span className="text-blue-900 font-bold text-xs font-poppins">
                  VISA
                </span>
              </div>
              <div className="bg-red-500 rounded px-2 py-1">
                <span className="text-white font-bold text-xs font-poppins">
                  MC
                </span>
              </div>
              <div className="bg-blue-600 rounded px-2 py-1">
                <span className="text-white font-bold text-xs font-poppins">
                  PayPal
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="font-semibold mb-4 font-poppins">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors text-sm font-poppins"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Address and Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-blue-200 text-sm mb-1 font-poppins">
                165-179 Forster Road City of Monash, Melbourne, Saudi Arabia
              </p>
              <p className="text-blue-200 text-sm font-poppins">
                ©2023 Copyright Elecxo -e-commerce in All rights reserved
              </p>
            </div>

            {/* Language Selector and Social Links */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <select className="bg-blue-800 text-white border border-blue-700 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins min-h-[36px]">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-blue-200 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.name === "Instagram" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.438-.928-.928 0-.49.438-.928.928-.928.49 0 .928.438.928.928 0 .49-.438.928-.928.928zm-3.362 9.36c-.807 0-1.418-.611-1.418-1.418s.611-1.418 1.418-1.418 1.418.611 1.418 1.418-.611 1.418-1.418 1.418z" />
                      </svg>
                    )}
                    {social.name === "Facebook" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                    {social.name === "Twitter" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
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
