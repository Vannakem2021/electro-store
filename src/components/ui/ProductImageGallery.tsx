"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from "./Icons";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  discount?: number;
  className?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  discount,
  className = "",
}) => {
  const { isKhmer } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
    setImageLoading(prev => ({ ...prev, [index]: true }));
  };

  // Fallback image for errors
  const fallbackImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop&crop=center";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative">
        <div
          ref={imageRef}
          className="relative aspect-square bg-gray-50 rounded-md overflow-hidden border border-gray-200 cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Loading State */}
          {imageLoading[selectedImageIndex] && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          )}

          {/* Main Image */}
          <Image
            src={imageErrors[selectedImageIndex] ? fallbackImage : images[selectedImageIndex]}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            fill
            className={`object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
            priority={selectedImageIndex === 0}
            onLoad={() => handleImageLoad(selectedImageIndex)}
            onError={() => handleImageError(selectedImageIndex)}
          />

          {/* Discount Badge */}
          {discount && (
            <div
              className={`absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-md z-10 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              -{discount}%
            </div>
          )}

          {/* Zoom Icon */}
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ZoomInIcon className="w-4 h-4" />
          </div>

          {/* Navigation Arrows for Mobile */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200 md:hidden"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200 md:hidden"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? "border-teal-600 ring-2 ring-teal-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Thumbnail Loading */}
              {imageLoading[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                </div>
              )}

              <Image
                src={imageErrors[index] ? fallbackImage : image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />

              {/* Selected Overlay */}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-teal-600 bg-opacity-20"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
