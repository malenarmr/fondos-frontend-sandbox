'use client';
import React from 'react';
import Button from '@/components/shared/Button';

interface PreFooterCardProps {
  title: string;
  children?: React.ReactNode;
  bgColor: string;
  textColor: string;
  textButton: string;
  borderRadius?: string;
  link?: string;
}

const PreFooterCard: React.FC<PreFooterCardProps> = ({
  title,
  children,
  bgColor,
  textColor,
  textButton,
  borderRadius = '10px 50px 10px 0',
  link,
}) => {
  return (
    <div
      className="pre-footer-card w-full max-w-full h-full md:w-50 px-[50px] py-[60px] shadow-md flex flex-col justify-start items-center text-center overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: borderRadius,
      }}
    >
      <div className="w-full max-w-full md:w-50 h-full flex flex-col justify-start items-start align-start text-start">
        <h2 className="text-2xl font-black my-5">{title}</h2>
        {children}
        <div
          className={'w-full flex justify-center items-center md:justify-start'}
        >
          <a href={link}>
            <Button>{textButton}</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreFooterCard;
