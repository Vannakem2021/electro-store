import React from "react";
import Link from "next/link";

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  active: boolean;
  isLogout?: boolean;
}

interface AccountSidebarProps {
  activeItem: string;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ activeItem }) => {
  const sidebarItems: SidebarItem[] = [
    { icon: "👤", label: "Personal Data", href: "/account/personal", active: activeItem === "personal" },
    { icon: "💳", label: "Payment & Installments", href: "/account/payment", active: activeItem === "payment" },
    { icon: "📦", label: "Orders", href: "/account/orders", active: activeItem === "orders" },
    { icon: "❤️", label: "Wish list", href: "/account/wishlist", active: activeItem === "wishlist" },
    { icon: "🏷️", label: "Discounts", href: "/account/discounts", active: activeItem === "discounts" },
    { icon: "🔒", label: "Security & access", href: "/account/security", active: activeItem === "security" },
    { icon: "🔔", label: "Notification", href: "/account", active: activeItem === "notification" },
    { icon: "📞", label: "Contact us", href: "/account/contact", active: activeItem === "contact" },
    { icon: "🚪", label: "Log out", href: "/logout", active: false, isLogout: true },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
      {/* User Profile Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xl">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 font-poppins">Ayman ahmed</h3>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-poppins text-sm ${
              item.active
                ? "bg-blue-50 text-blue-800 border-r-4 border-blue-800"
                : item.isLogout
                ? "text-red-600 hover:bg-red-50"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AccountSidebar;
