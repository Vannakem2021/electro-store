"use client";

import React from "react";
import { categories } from "@/data";
import { CategoryCard } from "@/components/ui";
import { Category } from "@/types";

const CategorySection: React.FC = () => {
  const handleCategoryClick = (category: Category) => {
    // Here you would typically navigate to the category page
    console.log("Selected category:", category);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-poppins tracking-tight">
            Shop by Categories
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto font-poppins leading-relaxed text-lg font-medium">
            Discover our wide range of electronic products organized by
            categories. Find exactly what you&apos;re looking for with ease.
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full"></div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {/* Enhanced Statistics Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border-2 border-gray-300 p-8 transform transition-all duration-300 ease-in-out hover:shadow-xl hover:border-blue-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-2xl font-bold text-blue-800 mb-2 font-poppins group-hover:text-blue-900 transform transition-all duration-300 ease-in-out group-hover:scale-125">
                6
              </div>
              <div className="text-gray-800 font-poppins font-semibold text-sm transform transition-all duration-300 ease-in-out group-hover:text-blue-700 group-hover:font-bold">
                Categories
              </div>
            </div>
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-2xl font-bold text-green-600 mb-2 font-poppins group-hover:text-green-700 transform transition-all duration-300 ease-in-out group-hover:scale-125">
                236+
              </div>
              <div className="text-gray-800 font-poppins font-semibold text-sm transform transition-all duration-300 ease-in-out group-hover:text-green-600 group-hover:font-bold">
                Total Products
              </div>
            </div>
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-2xl font-bold text-purple-600 mb-2 font-poppins group-hover:text-purple-700 transform transition-all duration-300 ease-in-out group-hover:scale-125">
                50+
              </div>
              <div className="text-gray-800 font-poppins font-semibold text-sm transform transition-all duration-300 ease-in-out group-hover:text-purple-600 group-hover:font-bold">
                Top Brands
              </div>
            </div>
            <div className="group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              <div className="text-2xl font-bold text-orange-600 mb-2 font-poppins group-hover:text-orange-700 transform transition-all duration-300 ease-in-out group-hover:scale-125">
                24/7
              </div>
              <div className="text-gray-800 font-poppins font-semibold text-sm transform transition-all duration-300 ease-in-out group-hover:text-orange-600 group-hover:font-bold">
                Support
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows for Mobile Carousel */}
        <div className="flex justify-center mt-12 space-x-6 md:hidden">
          <button className="p-4 rounded-full bg-white shadow-xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 active:scale-95 group min-h-[56px] min-w-[56px] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-800 group-hover:text-blue-800 transform transition-all duration-300 ease-in-out group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="p-4 rounded-full bg-white shadow-xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 active:scale-95 group min-h-[56px] min-w-[56px] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-800 group-hover:text-blue-800 transform transition-all duration-300 ease-in-out group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
