import React from "react";
import {
  Navbar,
  Footer,
  HeroSection,
  CategorySection,
  ProductSection,
  BestSellerSection,
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

        {/* Category Section */}
        <CategorySection />

        {/* Product Section */}
        <ProductSection />

        {/* Best Seller Section */}
        <BestSellerSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
