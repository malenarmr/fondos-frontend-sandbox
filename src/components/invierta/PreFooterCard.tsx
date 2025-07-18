'use client';
import Button from '@/components/shared/Button';
import React from 'react';

interface PreFooterCardProps {
  title: string;
  children?: React.ReactNode;
  bgColor: string;
  textColor: string;
  textButton: string;
  borderRadius?: string;
  link?: string;
  animation?: React.ReactNode;
  align?: string;
}

const PreFooterCard: React.FC<PreFooterCardProps> = ({
  title,
  children,
  bgColor,
  textColor,
  textButton,
  animation,
  link,
  align,
}) => {
  return (
    <div
      className="w-full max-w-full h-full md:w-50 px-[50px] pt-[20px] pb-[40px] shadow-md flex flex-col justify-start items-center text-center overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div
        className={`w-full max-w-full md:w-50 h-full flex flex-col justify-start items-start align-start text-${align}`}
      >
        {animation && (
          <div className="mb-4 flex justify-center">{animation}</div>
        )}
        <h2 className="text-2xl font-black mb-5">{title}</h2>
        {children}
        <div className={`w-full flex items-center justify-${align}`}>
          <a href={link}>
            <Button variant="sky">{textButton}</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreFooterCard;
