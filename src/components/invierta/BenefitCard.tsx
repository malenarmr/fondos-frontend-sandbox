import Image from 'next/image';
import React from 'react';

interface BenefitItemProps {
  image: string;
  alt: string;
  width: number;
  height: number;
  children: React.ReactNode;
}

export default function BenefitCard({
  image,
  alt,
  width,
  height,
  children,
}: BenefitItemProps) {
  return (
    <div className="flex flex-col justify-center align-center">
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className={'mx-auto'}
      />
      {children}
    </div>
  );
}
