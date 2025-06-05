// src/components/ui/FooterButton.tsx
'use client';
import React from 'react';

type FooterButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Botón estilizado para el footer, con dimensiones, radios y colores específicos.
 */
const FooterButton: React.FC<FooterButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="
        inline-flex items-center justify-center flex-shrink-0
        px-[24px] py-[6px] gap-[10px] min-h-[33px] leading-none
        border border-white bg-transparent text-white
        rounded-tl-[4px] rounded-tr-[9px]
        rounded-br-[4px] rounded-bl-[9px]
        transition-colors duration-200
        hover:bg-white hover:text-primary
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white text-[10px] md:text-[14px]
      "
    >
      {children}
    </button>
  );
};

export default FooterButton;
