"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Noise Cancelling",
    subtitle: "Headphone",
    description:
      "Bose Over-Ear Headphones\nWifi, Voice Assistant,\nLow Latency Game Mode",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&crop=center",
    ctaText: "BUY NOW",
    ctaLink: "/products/headphones",
    bgColor: "bg-yellow-50",
  },
  {
    id: 2,
    title: "Sport Water",
    subtitle: "Resistance Watch",
    description: "XOMIA\nSport Water\nResistance\nWatch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop&crop=center",
    ctaText: "SHOP NOW",
    ctaLink: "/products/watches",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    title: "OKODO",
    subtitle: "HERO 11+ BLACK",
    description: "FROM\n$169",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=400&fit=crop&crop=center",
    ctaText: "DISCOVER",
    ctaLink: "/products/cameras",
    bgColor: "bg-blue-50",
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
          className={`${currentHero.bgColor} rounded-2xl transition-all duration-500 ease-in-out border-2 border-gray-200 shadow-lg hover:shadow-xl`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px] p-8 lg:p-12">
            {/* Content */}
            <div className="space-y-8 transform transition-all duration-300 ease-in-out">
              <div className="transform transition-all duration-300 ease-in-out">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight font-poppins tracking-tight transform transition-all duration-300 ease-in-out hover:text-blue-800">
                  {currentHero.title}
                </h1>
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight font-poppins tracking-tight transform transition-all duration-300 ease-in-out hover:text-blue-800">
                  {currentHero.subtitle}
                </h2>
              </div>

              <p className="text-gray-800 text-lg whitespace-pre-line max-w-md font-poppins leading-relaxed font-medium transform transition-all duration-300 ease-in-out">
                {currentHero.description}
              </p>

              <Button
                size="lg"
                className="bg-blue-800 hover:bg-blue-900 text-white font-poppins font-bold px-8 py-4 text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-1 active:scale-95 min-h-[56px]"
              >
                {currentHero.ctaText}
              </Button>
            </div>

            {/* Image */}
            <div className="relative transform transition-all duration-500 ease-in-out">
              <div className="relative aspect-square max-w-md mx-auto transform transition-all duration-500 ease-in-out hover:scale-105">
                <Image
                  src={currentHero.image}
                  alt={currentHero.title}
                  fill
                  className="object-cover rounded-2xl transition-all duration-500 ease-in-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out"></div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 pb-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full border-2 transform transition-all duration-300 ease-in-out hover:scale-125 active:scale-90 ${
                  index === currentSlide
                    ? "w-6 h-4 bg-blue-800 border-blue-800 shadow-lg hover:shadow-xl"
                    : "w-4 h-4 bg-gray-300 border-gray-500 hover:bg-gray-400 hover:border-gray-600 hover:shadow-md"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Products */}
      <div className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 space-y-6">
        {/* PlayStation 5 Card */}
        <div className="bg-white rounded-lg shadow-xl border-2 border-gray-300 p-5 w-64 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-blue-500 group">
          <div className="text-xs text-gray-800 mb-2 font-poppins font-semibold uppercase tracking-wide transition-all duration-300 ease-in-out group-hover:text-blue-800">
            Sono Playgo 5
          </div>
          <div className="text-sm font-bold mb-3 text-gray-900 font-poppins transition-all duration-300 ease-in-out group-hover:text-blue-800">
            from $569
          </div>
          <div className="relative h-20 mb-4 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-105">
            <Image
              src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop&crop=center"
              alt="PlayStation 5"
              fill
              className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs font-poppins font-bold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg active:scale-95 min-h-[36px]"
          >
            DISCOVER NOW
          </Button>
        </div>

        {/* Gaming Card */}
        <div className="bg-gray-900 text-white rounded-lg p-5 w-64 shadow-xl border-2 border-gray-700 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-blue-500 group cursor-pointer">
          <div className="text-2xl font-bold mb-2 font-poppins text-white transition-all duration-300 ease-in-out group-hover:text-blue-300">
            OKODO
          </div>
          <div className="text-lg font-semibold mb-1 font-poppins text-gray-100 transition-all duration-300 ease-in-out group-hover:text-white">
            HERO 11+
          </div>
          <div className="text-lg font-semibold mb-3 font-poppins text-gray-100 transition-all duration-300 ease-in-out group-hover:text-white">
            BLACK
          </div>
          <div className="text-sm text-gray-300 mb-1 font-poppins font-semibold transition-all duration-300 ease-in-out group-hover:text-gray-200">
            FROM
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-3 font-poppins transition-all duration-300 ease-in-out group-hover:text-blue-300 group-hover:scale-110 transform">
            $169
          </div>
          <div className="relative h-16 mb-3 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-105">
            <Image
              src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop&crop=center"
              alt="Gaming Device"
              fill
              className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
