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
  animation?: React.ReactNode;
  onClick?: () => void;
  align?: string;
}

const HalfSectionCard: React.FC<HalfSectionCardProps> = ({
  title,
  children,
  bgColor,
  textColor,
  textButton,
  link,
  animation,
  onClick,
  align,
}) => {
  return (
    <div
      className="p-[40px] md:p-[45px] lg:p-[60px] xl:px-[100px] shadow-md flex flex-col justify-start items-center text-center"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        // borderRadius: borderRadius,
        width: '50%',
      }}
    >
      <div
        className={`w-full h-full flex flex-col justify-between items-${align} align-start text-${align}`}
      >
        {animation && (
          <div className="mb-4 flex justify-center">{animation}</div>
        )}
        <h2 className="text-4xl font-black mb-8">{title}</h2>
        {children}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button variant="sky" onClick={onClick}>
            {textButton}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default HalfSectionCard;
