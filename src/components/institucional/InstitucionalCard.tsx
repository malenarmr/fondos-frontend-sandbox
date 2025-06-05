// src/components/institucional/InstitucionalCard.tsx
'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import React, { useState } from 'react';

interface InstitucionalCardProps {
  title: string;
  imageSrc: string;
  hoverDescription: string;
  hoverColor: string;
}

const InstitucionalCard: React.FC<InstitucionalCardProps> = ({
  title,
  imageSrc,
  hoverDescription,
  hoverColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Mostramos hover solo en desktop
  const showHover = !isMobile && isHovered;

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ease-in-out font-encode-sans
                  ${isMobile ? 'py-6 px-4' : 'aspect-square'} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: isMobile ? '8px' : '8px 22px',
        border: '1px solid #EBEBEB',
        background: showHover ? hoverColor : '#FFF',
        boxShadow: '0px 4px 27px rgba(146,146,146,0.37)',
      }}
    >
      {/* Desktop */}
      {!isMobile && (
        <div className="flex flex-col items-center justify-center h-full space-y-8 cursor-pointer">
          {!showHover ? (
            <>
              <Image
                src={imageSrc}
                alt={title}
                width={180}
                height={180}
                className="object-contain"
              />
              {/* título fijo en text-2xl, sin clases md: o lg: */}
              <h3 className="text-2xl font-bold text-primary text-center">
                {title}
              </h3>
            </>
          ) : (
            <div className="text-center p-4 space-y-4">
              {/* título hover fijo en text-lg */}
              <h3
                className="text-lg font-bold"
                style={{ color: title === 'Visión' ? '#3C3C3B' : '#FFF' }}
              >
                {title}
              </h3>
              {/* párrafo hover fijo en text-sm */}
              <p
                className="text-sm"
                style={{ color: title === 'Visión' ? '#3C3C3B' : '#FFF' }}
              >
                {hoverDescription}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <div className="flex flex-col items-center p-6 space-y-6">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-teal-500 flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={title}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-primary text-center">
            {title}
          </h3>
          <p className="text-sm text-center">{hoverDescription}</p>
        </div>
      )}
    </div>
  );
};

export default InstitucionalCard;
