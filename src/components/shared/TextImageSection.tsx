'use client';
import React from 'react';

interface TextImageSectionProps {
  children: React.ReactNode;
  image?: React.ReactNode;
  button?: React.ReactNode;
  inverted?: boolean;
}

export default function TextImageSection({
  children,
  image,
  button,
  inverted = false,
}: TextImageSectionProps) {
  return (
    <section className="py-8 md:py-16 bg-white dark:bg-dark">
      <div className="container mx-auto px-0 md:px-16">
        <div
          className={`flex ${inverted ? 'flex-col-reverse' : 'flex-col'} md:flex-row items-center `}
        >
          {/* Left Column: Text Content */}
          <div className="flex-1 align-start text-primary">
            {children}
            {button && <div className="mt-12 text-primary">{button}</div>}
          </div>
          {/* Right Column: Image Content */}
          {image && (
            <div className="flex-1 flex items-center justify-center">
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
