import React from "react";
import Image from "next/image";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 ease-in-out overflow-hidden cursor-pointer group transform hover:-translate-y-2 hover:scale-105 active:scale-95"
      onClick={handleClick}
    >
      {/* Category Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={category.image}
          alt={`${category.name} category`}
          fill
          className="object-cover group-hover:scale-125 transition-all duration-500 ease-in-out"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300 ease-in-out" />

        {/* Category Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 transform transition-all duration-300 ease-in-out group-hover:translate-y-0">
          <h3 className="font-bold text-white text-sm font-poppins tracking-wide drop-shadow-lg transform transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-200">
            {category.name.toUpperCase()}
          </h3>
        </div>
      </div>

      {/* Category Info */}
      <div className="p-4 text-center bg-gradient-to-b from-white to-gray-50 group-hover:from-blue-50 group-hover:to-white transition-all duration-300 ease-in-out">
        <h3 className="font-bold text-gray-900 mb-2 font-poppins text-sm tracking-wide transform transition-all duration-300 ease-in-out group-hover:text-blue-800 group-hover:scale-105">
          {category.name}
        </h3>
        <p className="text-xs text-gray-800 font-poppins font-semibold transform transition-all duration-300 ease-in-out group-hover:text-blue-700 group-hover:font-bold">
          {category.productCount} products
        </p>

        {/* Hover indicator */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-0.5 bg-blue-700 mx-auto rounded-full transform transition-all duration-300 ease-in-out group-hover:w-12 group-hover:h-1 group-hover:bg-blue-800 group-hover:shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
