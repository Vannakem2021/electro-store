import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 ease-in-out overflow-hidden group transform hover:-translate-y-2 hover:scale-105 active:scale-95 cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>

        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 text-xs font-bold rounded-lg shadow-lg font-poppins tracking-wide transform transition-all duration-300 ease-in-out hover:scale-110">
            BEST SELLER
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 text-xs font-bold rounded-lg shadow-lg font-poppins tracking-wide transform transition-all duration-300 ease-in-out hover:scale-110">
            NEW
          </div>
        )}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1.5 text-xs font-bold rounded-lg shadow-lg font-poppins tracking-wide transform transition-all duration-300 ease-in-out hover:scale-110">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50 group-hover:from-blue-50 group-hover:to-white transition-all duration-300 ease-in-out">
        {/* Category */}
        <p className="text-xs text-gray-800 uppercase tracking-wide mb-2 font-poppins font-semibold transform transition-all duration-300 ease-in-out group-hover:text-blue-700">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 font-poppins text-sm leading-relaxed transform transition-all duration-300 ease-in-out group-hover:text-blue-800">
          {truncateText(product.name, 50)}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex transform transition-all duration-300 ease-in-out group-hover:scale-110">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-800 font-poppins font-semibold transform transition-all duration-300 ease-in-out group-hover:text-blue-700">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg font-bold text-blue-800 font-poppins transform transition-all duration-300 ease-in-out group-hover:text-blue-900 group-hover:scale-110">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-600 line-through font-poppins transform transition-all duration-300 ease-in-out group-hover:text-gray-500">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full font-poppins font-bold text-sm bg-blue-800 hover:bg-blue-900 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 min-h-[44px]"
          disabled={!product.inStock}
        >
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
