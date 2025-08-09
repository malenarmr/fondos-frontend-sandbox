'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface MobileCarouselProps {
  children: React.ReactNode[]; // slides
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

  const goToNextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goToPrevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="relative w-full">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {React.Children.map(children, (child, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              {/* Card más chica y centrada */}
              <div className="relative mx-auto max-w-[92%]">
                <div className="bg-white rounded-tl-[8px] rounded-br-[8px] rounded-tr-[22px] rounded-bl-[22px] shadow p-6 px-6">
                  {child}
                </div>

                {/* Botón izquierdo (solo si no es el primero) */}
                {totalSlides > 1 && currentSlide > 0 && (
                  <button
                    onClick={goToPrevSlide}
                    aria-label="Anterior"
                    className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#009B67]/35 flex items-center justify-center active:scale-95 z-10"
                  >
                    <ChevronLeft size={40} className="text-[#000000]" />
                  </button>
                )}

                {/* Botón derecho (siempre que haya más de un slide) */}
                {totalSlides > 1 && (
                  <button
                    onClick={goToNextSlide}
                    aria-label="Siguiente"
                    className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-16 h-16 rounded-full bg-[#009B67]/35 flex items-center justify-center active:scale-95 z-10"
                  >
                    <ChevronRight size={40} className="text-[#000000]" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCarousel;
