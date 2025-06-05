'use client';

import { ReactNode, useRef, useState } from 'react';

interface DesktopSliderProps {
  items: ReactNode[];
}

export default function DesktopSlider({ items }: DesktopSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = container.offsetWidth;
    container.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth',
    });

    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Contenedor de las cards */}
      <div
        ref={containerRef}
        className="flex items-center justify-start overflow-x-auto scroll-smooth h-full space-x-6 no-scrollbar"
      >
        <div className="flex transition-transform duration-500 ease-in-out">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[400px] flex-shrink-0 flex flex-col justify-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Botones de control */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`
              rounded-full border
              transition-all duration-300
              ${
                currentIndex === i
                  ? 'bg-primary border-primary w-8 h-2'
                  : 'bg-transparent border-gray-400 w-3 h-3'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
