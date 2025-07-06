import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ErrorBoundary } from "@/components";
import { ToastContainer } from "@/components/ui";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elecxo - Premium Electronics Store",
  description:
    "Discover the latest electronics, gadgets, and tech accessories at Elecxo. Shop premium quality products with fast delivery and excellent customer service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} antialiased`}>
        <ErrorBoundary level="global">
          <ToastProvider>
            <AdminProvider>
              <CartProvider>
                <WishlistProvider>
                  <SearchProvider>
                    {children}
                    <ToastContainer />
                  </SearchProvider>
                </WishlistProvider>
              </CartProvider>
            </AdminProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
