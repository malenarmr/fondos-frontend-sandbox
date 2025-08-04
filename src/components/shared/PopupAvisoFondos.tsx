'use client';
import Button from '@/components/shared/Button';
import { X } from 'lucide-react';
import React from 'react';

interface PopupAvisoFondosProps {
  title: string;
  description: string;
  buttonText?: string;
  onClose: () => void;
}

const PopupAvisoFondos: React.FC<PopupAvisoFondosProps> = ({
  title,
  description,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-[95vw] w-full md:max-w-[620px] relative py-12 px-6 md:py-16 md:px-14 shadow-2xl flex flex-col items-center font-encode-sans"
        onClick={(e) => e.stopPropagation()}
        style={{ minWidth: 320 }}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-secondary text-3xl md:text-4xl"
          aria-label="Cerrar"
        >
          <X size={36} />
        </button>
        <h2 className="text-2xl md:text-3xl font-black text-[#3C3C3B] mb-3 text-center font-encode-sans">
          {title}
        </h2>
        <p className="text-lg text-gray-700 mb-8 mt-2 text-center font-encode-sans">
          {description}
        </p>
        <Button variant="primary" onClick={onClose}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default PopupAvisoFondos;
