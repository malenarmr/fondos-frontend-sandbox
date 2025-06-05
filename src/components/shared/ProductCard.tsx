'use client';
import type React from 'react';
import { useState } from 'react';

interface ProductCardProps {
  title: string;
  description?: string;
  bgColor: string;
  textColor: string;
}

/**
 * Tarjeta de producto con título centrado y descripción que ocupa todo el ancho al hacer hover.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  bgColor,
  textColor,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="rounded-tl-md rounded-tr-[20px] rounded-br-md rounded-bl-[20px] py-40 px-10 shadow-md flex justify-center items-center text-center transition-colors duration-500 ease-in-out overflow-hidden w-full h-full"
      style={{
        backgroundColor: hover ? '#E6F9F0' : bgColor,
        color: hover ? '#000000' : textColor,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <h2
          className={`text-lg md:text-4xl font-bold absolute transition-transform duration-500 ${hover ? 'opacity-0' : 'opacity-100'}`}
        >
          {title}
        </h2>
        <p
          className={`w-[360px] h-[334px] flex text-left justify-center items-center p-[40px] text-[17px] font-semibold absolute transition-transform duration-500 ${hover ? '-translate-x-1/1 -translate-y-1/1' : 'translate-x-[-5%] translate-y-[20%] opacity-0'}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
