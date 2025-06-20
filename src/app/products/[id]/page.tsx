"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { getProductById, getProductsByCategory, getCategoryById } from "@/data";
import { Product, ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  generateMockVariants,
  calculateVariantPrice,
  areRequiredVariantsSelected,
  getVariantImages,
} from "@/lib/mockVariants";
import { Navbar, Footer } from "@/components";
import {
  Button,
  ProductCard,
  ProductImageGallery,
  ProductVariants,
  ChevronRightIcon,
  ShoppingBagIcon,
  LoadingButton,
  LoadingSpinner,
  SkeletonGrid,
} from "@/components/ui";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const { t } = useTranslation();
  const { isKhmer } = useLanguage();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: ProductVariant;
  }>({});
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const resolvedParams = await params;
      const fetchedProduct = getProductById(resolvedParams.id);
      if (!fetchedProduct) {
        notFound();
      }

      // Add mock variants to the product
      const productWithVariants = {
        ...fetchedProduct,
        variants: generateMockVariants(
          fetchedProduct.id,
          fetchedProduct.categoryId
        ),
      };

      setProduct(productWithVariants);
      setCurrentPrice(productWithVariants.price);
      setCurrentImages(
        productWithVariants.images || [productWithVariants.image]
      );

      // Get related products from the same category
      const related = getProductsByCategory(fetchedProduct.categoryId)
        .filter((p) => p.id !== fetchedProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
      setIsLoading(false);
    };

    loadProduct();
  }, [params]);

  // Handle variant selection
  const handleVariantChange = useCallback(
    (newSelectedVariants: { [key: string]: ProductVariant }) => {
      setSelectedVariants(newSelectedVariants);

      if (product) {
        // Update price based on selected variants
        const newPrice = calculateVariantPrice(
          product.price,
          newSelectedVariants
        );
        setCurrentPrice(newPrice);

        // Update images based on selected variants
        const baseImages = product.images || [product.image];
        const newImages = getVariantImages(baseImages, newSelectedVariants);
        setCurrentImages(newImages);
      }
    },
    [product]
  );

  // Handle related product cart actions
  const handleRelatedProductAddToCart = useCallback(
    (relatedProduct: Product) => {
      addToCart(relatedProduct, 1);

      // Show brief success feedback
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
    },
    [addToCart]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
            <p
              className={`text-gray-600 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("common.loading")}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get category information
  const category = getCategoryById(product.categoryId);
  const categoryName = category?.name || product.category;

  const handleAddToCart = () => {
    if (!product) return;

    // Check if all required variants are selected
    if (product.variants && product.variants.length > 0) {
      const hasRequiredVariants = areRequiredVariantsSelected(
        product.variants,
        selectedVariants
      );
      if (!hasRequiredVariants) {
        // Could show an error message here
        return;
      }
    }

    // Create product with current price and variant info
    const productToAdd = {
      ...product,
      price: currentPrice,
      // Add variant info to product for cart display
      selectedVariants: Object.values(selectedVariants),
    };

    addToCart(productToAdd, quantity);

    // Show success feedback
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const handleBuyNow = async () => {
    if (!product || isBuyingNow) return;

    // Check if all required variants are selected
    if (product.variants && product.variants.length > 0) {
      const hasRequiredVariants = areRequiredVariantsSelected(
        product.variants,
        selectedVariants
      );
      if (!hasRequiredVariants) {
        return;
      }
    }

    setIsBuyingNow(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create product with current price and variant info
      const productToAdd = {
        ...product,
        price: currentPrice,
        selectedVariants: Object.values(selectedVariants),
      };

      // Add to cart first
      addToCart(productToAdd, quantity);

      // Redirect to checkout page
      router.push("/checkout");
    } finally {
      setIsBuyingNow(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse"></div>
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse"></div>
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
          </div>

          {/* Product Detail Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-md animate-pulse"></div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-200 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
            </div>
          </div>

          {/* Related Products Skeleton */}
          <div className="mb-12">
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-6 animate-pulse"></div>
            <SkeletonGrid count={4} variant="default" gridCols="4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav
          className={`flex items-center space-x-2 text-sm mb-8 ${
            isKhmer ? "font-khmer" : "font-rubik"
          }`}
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            {t("nav.home")}
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <Link
            href="/products"
            className="text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            {t("nav.products")}
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <ProductImageGallery
            images={currentImages}
            productName={product.name}
            discount={product.discount}
          />

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Name */}
            <h1
              className={`text-2xl lg:text-3xl font-bold text-gray-900 leading-tight ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl font-bold text-teal-700 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice && currentPrice === product.price && (
                  <span
                    className={`text-lg text-gray-500 line-through ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {currentPrice !== product.price && (
                  <span
                    className={`text-lg text-gray-500 ${
                      isKhmer ? "font-khmer" : "font-rubik"
                    }`}
                  >
                    (Base: {formatPrice(product.price)})
                  </span>
                )}
              </div>
              {product.discount && currentPrice === product.price && (
                <p
                  className={`text-sm text-red-600 font-medium ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("product.from")}{" "}
                  {formatPrice(product.originalPrice! - product.price)}
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("categories.electronics")}:
                </span>
                <span
                  className={`text-sm text-teal-700 font-medium ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {categoryName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm text-gray-600 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("product.brand")}:
                </span>
                <span
                  className={`text-sm text-gray-900 font-medium ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {product.brand}
                </span>
              </div>
            </div>

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <ProductVariants
                variantGroups={product.variants}
                onVariantChange={handleVariantChange}
              />
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label
                className={`block text-sm font-medium text-gray-900 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("product.quantity")}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-md border border-gray-300 hover:border-teal-400 flex items-center justify-center font-bold text-gray-700 hover:text-teal-700 transition-colors duration-200"
                >
                  -
                </button>
                <span
                  className={`w-12 h-10 rounded-md border border-gray-300 flex items-center justify-center font-bold text-gray-900 bg-gray-50 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stockCount, quantity + 1))
                  }
                  className="w-10 h-10 rounded-md border border-gray-300 hover:border-teal-400 flex items-center justify-center font-bold text-gray-700 hover:text-teal-700 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <LoadingButton
                onClick={handleAddToCart}
                loading={isAddingToCart}
                loadingText={t("product.addToCart")}
                disabled={!product.inStock}
                className={`w-full h-12 font-medium bg-teal-700 hover:bg-teal-800 transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {product.inStock
                  ? t("product.addToCart")
                  : t("product.outOfStock")}
              </LoadingButton>

              {product.inStock && (
                <LoadingButton
                  onClick={handleBuyNow}
                  loading={isBuyingNow}
                  loadingText={t("product.buyNow")}
                  variant="outline"
                  className={`w-full h-12 font-medium border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-colors duration-200 ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("product.buyNow")}
                </LoadingButton>
              )}
            </div>

            {/* Success Feedback */}
            {showAddedToCart && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2 animate-fade-in">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className={`text-green-800 text-sm font-medium ${
                    isKhmer ? "font-khmer" : "font-rubik"
                  }`}
                >
                  {t("product.addToCart")} - {quantity}{" "}
                  {quantity === 1 ? "item" : "items"} added!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-8">
          <h3
            className={`text-lg font-bold text-gray-900 mb-4 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {t("product.description")}
          </h3>
          <div className="bg-gray-50 rounded-md p-6">
            <p
              className={`text-gray-700 leading-relaxed ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {product.description}
            </p>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <div className="mb-8">
              <h3
                className={`text-lg font-bold text-gray-900 mb-4 ${
                  isKhmer ? "font-khmer" : "font-rubik"
                }`}
              >
                {t("product.specifications")}
              </h3>
              <div className="bg-gray-50 rounded-md p-6">
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-center gap-4">
                        <span
                          className={`text-sm text-gray-600 min-w-[120px] ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          - {key}:
                        </span>
                        <span
                          className={`text-sm text-gray-900 font-medium ${
                            isKhmer ? "font-khmer" : "font-rubik"
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2
              className={`text-xl font-bold text-gray-900 mb-6 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {t("sections.related.title")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={handleRelatedProductAddToCart}
                  showLink={true}
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
