"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory, categories } from "@/data";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { Navbar, Footer } from "@/components";
import { Button, ProductCard } from "@/components/ui";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params;
      const fetchedProduct = getProductById(resolvedParams.id);
      if (!fetchedProduct) {
        notFound();
      }

      setProduct(fetchedProduct);

      // Get related products from the same category
      const related = getProductsByCategory(fetchedProduct.categoryId)
        .filter((p) => p.id !== fetchedProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    };

    loadProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600 font-mono">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate product images array (using main image + variations for demo)
  const productImages = product.images || [
    product.image,
    product.image.replace("w=500", "w=600"),
    product.image.replace("h=400", "h=500"),
    product.image.replace("crop=center", "crop=top"),
  ];

  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity });
    // Here you would typically update global cart state or call an API
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { product, quantity });
    // Here you would typically redirect to checkout
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const categoryName =
    categories.find((cat) => cat.id === product.categoryId)?.name ||
    product.category;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-mono">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/products"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/categories/${product.categoryId}`}
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            {categoryName}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">
            {truncateText(product.name, 30)}
          </span>
        </nav>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 ease-in-out group cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-500 ease-in-out ${
                  isZoomed ? "scale-150" : "group-hover:scale-110"
                }`}
                priority
              />

              {/* Product Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.isBestSeller && (
                  <div className="bg-red-600 text-white px-4 py-2 text-xs font-bold rounded-lg shadow-lg font-mono tracking-wide">
                    BEST SELLER
                  </div>
                )}
                {product.isNew && (
                  <div className="bg-green-600 text-white px-4 py-2 text-xs font-bold rounded-lg shadow-lg font-mono tracking-wide">
                    NEW
                  </div>
                )}
                {product.discount && (
                  <div className="bg-orange-600 text-white px-4 py-2 text-xs font-bold rounded-lg shadow-lg font-mono tracking-wide">
                    -{product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Zoom Indicator */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    selectedImageIndex === index
                      ? "border-blue-600 shadow-lg"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              {/* Category */}
              <p className="text-sm text-gray-700 uppercase tracking-wide font-mono font-semibold">
                {categoryName}
              </p>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-mono leading-tight">
                {product.name}
              </h1>

              {/* Brand */}
              <p className="text-lg text-blue-700 font-mono font-semibold">
                by {product.brand}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-lg font-bold text-gray-900 font-mono">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-600 font-mono">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-700 font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-600 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-lg font-mono">
                      SAVE {product.discount}%
                    </span>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-gray-700 font-mono">
                  You save {formatPrice(product.originalPrice - product.price)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-mono font-semibold ${
                  product.inStock ? "text-green-700" : "text-red-700"
                }`}
              >
                {product.inStock
                  ? `In Stock (${product.stockCount} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 font-mono">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-400 flex items-center justify-center font-mono font-bold text-gray-700 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    -
                  </button>
                  <span className="w-16 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-gray-900 bg-gray-50">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stockCount, quantity + 1))
                    }
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-400 flex items-center justify-center font-mono font-bold text-gray-700 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full h-14 text-lg font-mono font-bold bg-blue-700 hover:bg-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
              </Button>

              {product.inStock && (
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="w-full h-14 text-lg font-mono font-bold border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                >
                  BUY NOW
                </Button>
              )}
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 font-mono mb-4">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-mono">
                    Free Shipping
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-mono">
                    1 Year Warranty
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-mono">
                    24/7 Support
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-mono">
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="border-b-2 border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { key: "description", label: "Description" },
                { key: "specifications", label: "Specifications" },
                { key: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(
                      tab.key as "description" | "specifications" | "reviews"
                    )
                  }
                  className={`py-4 px-2 font-mono font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out border-b-2 ${
                    activeTab === tab.key
                      ? "border-blue-700 text-blue-700"
                      : "border-transparent text-gray-600 hover:text-blue-700 hover:border-blue-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 font-mono mb-4">
                  Product Description
                </h3>
                <p className="text-gray-700 leading-relaxed font-mono text-base">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 font-mono">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          {product.name}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          User Manual
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          Warranty Card
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          Original Packaging
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 font-mono">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          Premium Quality
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          Latest Technology
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          Reliable Performance
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-mono text-sm">
                          Great Value
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 font-mono mb-6">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-mono">
                          Brand
                        </span>
                        <span className="text-gray-700 font-mono">
                          {product.brand}
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-mono">
                          Category
                        </span>
                        <span className="text-gray-700 font-mono">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-mono">
                          Model
                        </span>
                        <span className="text-gray-700 font-mono">
                          {product.id.toUpperCase()}-
                          {product.brand.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-mono">
                          Warranty
                        </span>
                        <span className="text-gray-700 font-mono">1 Year</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {product.specifications &&
                      Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="border-b border-gray-200 pb-3"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-900 font-mono capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="text-gray-700 font-mono">
                                {value}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-mono">
                          Rating
                        </span>
                        <span className="text-gray-700 font-mono">
                          {product.rating}/5 Stars
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-mono">
                          Reviews
                        </span>
                        <span className="text-gray-700 font-mono">
                          {product.reviewCount} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900 font-mono">
                    Customer Reviews
                  </h3>
                  <Button
                    variant="outline"
                    className="font-mono font-semibold border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                  >
                    Write Review
                  </Button>
                </div>

                {/* Rating Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-700 font-mono mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <p className="text-gray-700 font-mono">
                        Based on {product.reviewCount} reviews
                      </p>
                    </div>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const percentage =
                          stars === 5
                            ? 65
                            : stars === 4
                            ? 25
                            : stars === 3
                            ? 8
                            : stars === 2
                            ? 2
                            : 0;
                        return (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="text-sm font-mono w-8">
                              {stars}★
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-mono text-gray-600 w-12">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "2 weeks ago",
                      title: "Excellent product!",
                      comment:
                        "This product exceeded my expectations. Great quality and fast delivery. Highly recommended!",
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      date: "1 month ago",
                      title: "Good value for money",
                      comment:
                        "Very satisfied with this purchase. Works exactly as described and arrived quickly.",
                    },
                    {
                      name: "Mike R.",
                      rating: 5,
                      date: "2 months ago",
                      title: "Perfect!",
                      comment:
                        "Amazing product quality. The {product.brand} brand never disappoints. Will buy again!",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-gray-900 font-mono">
                              {review.name}
                            </span>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 font-mono">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 font-mono mb-2">
                        {review.title}
                      </h4>
                      <p className="text-gray-700 font-mono text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Load More Reviews */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    className="font-mono font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700"
                  >
                    Load More Reviews
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-mono mb-4">
                  Related Products
                </h2>
                <p className="text-gray-700 font-mono">
                  More products from the {categoryName} category
                </p>
              </div>
              <Link
                href={`/categories/${product.categoryId}`}
                className="hidden md:flex items-center text-blue-700 hover:text-blue-800 font-mono font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 group"
              >
                VIEW ALL
                <svg
                  className="w-5 h-5 ml-2 transform transition-all duration-300 ease-in-out group-hover:translate-x-1"
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
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(product) =>
                    console.log("Added related product to cart:", product)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
