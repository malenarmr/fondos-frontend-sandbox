'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface MobileCarouselProps {
  children: React.ReactNode[];
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {React.Children.map(children, (child) => (
            <div className="w-full flex-shrink-0">{child}</div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-[63px] h-[27px] bg-gray-800 rounded-full'
                : 'w-[27px] h-[27px] bg-white border-2 border-gray-300 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows - only shown on md+ */}
      <div className="hidden md:block">
        <button
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MobileCarousel;
