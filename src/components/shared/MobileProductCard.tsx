'use client';
import React, { useState } from 'react';

interface MobileProductCardProps {
  title: string;
  description?: string;
  bgColor: string;
  textColor: string;
}

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
  >
    <rect x="0.5" y="0.5" width="32" height="32" rx="16" stroke="white" />
    <line
      x1="8.85352"
      y1="16.3984"
      x2="24.1462"
      y2="16.3984"
      stroke="white"
      strokeWidth="1"
    />
    <line
      x1="16.4023"
      y1="24.1445"
      x2="16.4023"
      y2="8.85185"
      stroke="white"
      strokeWidth="1"
    />
  </svg>
);
const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
  >
    <rect x="0.5" y="0.5" width="32" height="32" rx="16" stroke="white" />
    <line
      x1="8.85352"
      y1="16.3984"
      x2="24.1462"
      y2="16.3984"
      stroke="white"
      strokeWidth="1"
    />
  </svg>
);

const MobileProductCard: React.FC<MobileProductCardProps> = ({
  title,
  description,
  bgColor,
  textColor,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center mb-4 w-full">
      {/* Cabecera */}
      <div
        className="
          flex justify-between items-center
          w-[100%] h-[68px]
          px-[28px] py-[12px]
          rounded-tl-[8px] rounded-tr-[20px]
          rounded-br-[8px] rounded-bl-[20px]
          cursor-pointer
        "
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-encode-sans font-bold text-lg">{title}</span>
        {open ? <MinusIcon /> : <PlusIcon />}
      </div>

      {/* Contenido desplegable */}
      {open && description && (
        <div
          className="
            w-[100%]
            px-[28px] pt-[32px] pb-[12px]
            bg-white text-black
            rounded-bl-[20px] rounded-br-[20px]
            shadow-inner mt-[-15px] 
          "
          style={{ zIndex: '-1' }}
        >
          <p className="font-encode-sans text-base leading-snug">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileProductCard;
