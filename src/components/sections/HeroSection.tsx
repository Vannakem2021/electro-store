"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button";

interface HeroSlide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
  ctaKey: string;
  ctaLink: string;
  bgColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: "hero.slides.headphones.title",
    subtitleKey: "hero.slides.headphones.subtitle",
    descriptionKey: "hero.slides.headphones.description",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&crop=center",
    ctaKey: "hero.slides.headphones.cta",
    ctaLink: "/products/headphones",
    bgColor: "bg-gray-50",
  },
  {
    id: 2,
    titleKey: "hero.slides.watch.title",
    subtitleKey: "hero.slides.watch.subtitle",
    descriptionKey: "hero.slides.watch.description",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop&crop=center",
    ctaKey: "hero.slides.watch.cta",
    ctaLink: "/products/watches",
    bgColor: "bg-gray-50",
  },
  {
    id: 3,
    titleKey: "hero.slides.camera.title",
    subtitleKey: "hero.slides.camera.subtitle",
    descriptionKey: "hero.slides.camera.description",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=400&fit=crop&crop=center",
    ctaKey: "hero.slides.camera.cta",
    ctaLink: "/products/cameras",
    bgColor: "bg-gray-50",
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`${currentHero.bgColor} rounded-md transition-all duration-300 ease-in-out shadow-md hover:shadow-xl`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px] p-8 lg:p-12">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Latest Electronics
                </h1>
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Best Deals
                </h2>
              </div>

              <p className="text-gray-700 text-lg whitespace-pre-line max-w-md leading-relaxed">
                Discover the latest electronics with unbeatable prices and
                quality.
              </p>

              <Button size="lg" className="font-medium">
                Shop Now
              </Button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto transition-transform duration-300 ease-in-out hover:scale-105">
                <Image
                  src={currentHero.image}
                  alt="Latest Electronics"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 pb-6">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-200 ease-in-out ${
                  index === currentSlide
                    ? "w-6 h-3 bg-teal-800"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Products */}
      <div className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
        {/* PlayStation 5 Card */}
        <div className="bg-white rounded-md shadow-md p-4 w-56 transition-all duration-300 ease-in-out hover:shadow-xl group cursor-pointer">
          <div className="text-xs text-gray-600 mb-1 font-medium uppercase tracking-wide">
            PlayStation 5
          </div>
          <div className="text-sm font-bold mb-3 text-gray-900">From $569</div>
          <div className="relative h-16 mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop&crop=center"
              alt="PlayStation 5"
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          <Button size="sm" variant="secondary" className="w-full text-xs">
            Discover Now
          </Button>
        </div>

        {/* Gaming Card */}
        <div className="bg-gray-100 rounded-md shadow-md p-4 w-56 transition-all duration-300 ease-in-out hover:shadow-xl group cursor-pointer">
          <div className="text-lg font-bold mb-1 text-gray-900">Gaming</div>
          <div className="text-sm font-medium mb-1 text-gray-700">
            Hero Black
          </div>
          <div className="text-xs text-gray-600 mb-1">From</div>
          <div className="text-xl font-bold text-teal-800 mb-3">$169</div>
          <div className="relative h-16 mb-3 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop&crop=center"
              alt="Gaming Device"
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
