"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { categories } from "@/data";
import { Category } from "@/types";

const CategorySection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: Category) => {
    // Here you would typically navigate to the category page
    console.log("Selected category:", category);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-poppins">
            Shop by Categories
          </h2>
          <div className="w-16 h-1 bg-teal-600 rounded-full mx-auto"></div>
        </div>

        {/* Categories Slider Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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

          {/* Categories Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="flex-shrink-0 cursor-pointer group"
              >
                {/* Category Image */}
                <div className="relative w-24 h-24 rounded-md mb-3 group-hover:scale-105 transition-transform duration-200 bg-gray-100 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.name} category`}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>

                {/* Category Name */}
                <p className="text-sm font-medium text-gray-900 text-center font-poppins">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
