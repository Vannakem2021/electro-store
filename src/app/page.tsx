import React from "react";
import {
  Navbar,
  Footer,
  HeroSection,
  BestSellerSection,
  DiscountProductsSection,
  NewProductsSection,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Discount Products Section */}
        <DiscountProductsSection />

        {/* New Products Section */}
        <NewProductsSection />

        {/* Best Seller Section */}
        <BestSellerSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
