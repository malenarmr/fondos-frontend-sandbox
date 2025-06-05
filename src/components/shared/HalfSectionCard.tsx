'use client';
import React from 'react';
import Button from './Button';

interface HalfSectionCardProps {
  title: string;
  children?: React.ReactNode;
  bgColor: string;
  textColor: string;
  textButton: string;
  borderRadius?: string;
  link?: string;
  onClick?: () => void;
}

const HalfSectionCard: React.FC<HalfSectionCardProps> = ({
  title,
  children,
  bgColor,
  textColor,
  textButton,
  borderRadius = '10px 50px 10px 0',
  link,
  onClick,
}) => {
  return (
    <div
      className="p-[40px] md:p-[45px] lg:p-[60px] xl:px-[100px] xl:py-[120px] shadow-md flex flex-col justify-start items-center text-center"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: borderRadius,
        width: '50%',
      }}
    >
      <div className="w-full h-full flex flex-col justify-between items-start align-start text-start">
        <h2 className="text-4xl font-black mb-8">{title}</h2>
        {children}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button onClick={onClick}>{textButton}</Button>
        </a>
      </div>
    </div>
  );
};

export default HalfSectionCard;
