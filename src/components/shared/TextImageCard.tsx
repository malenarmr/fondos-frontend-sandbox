'use client';
import Image from 'next/image';
import React from 'react';

interface TextImageCardProps {
  image: string;
  alt: string;
  width: number;
  height: number;
  description: React.ReactNode;
}

export default function TextImageCard({
  image,
  alt,
  width,
  height,
  description,
}: TextImageCardProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl"
      />
      <span className="font-bold text-primary">{description}</span>
    </div>
  );
}
