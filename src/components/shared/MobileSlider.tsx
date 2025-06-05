'use client';

import React, { useRef, useState } from 'react';

interface SliderProps {
  items: React.ReactNode[];
}

export default function MobileSlider({ items }: SliderProps) {
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
    <div>
      <div
        className="flex items-center justify-center py-7 overflow-hidden max-h-[330px]"
        ref={containerRef}
      >
        <div className="flex transition-transform duration-500 ease-in-out">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center align-center flex-shrink-0"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* botones */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-[27px] h-[27px] rounded-full border border-primary transition-all duration-300 ${
              currentIndex === i ? 'bg-primary w-[63px]' : 'bg-transparent'
            } mb-[-100px]`}
          ></button>
        ))}
      </div>
    </div>
  );
}
