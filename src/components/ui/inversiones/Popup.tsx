'use client';
import Button from '@/components/shared/Button';
import React from 'react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Cierra el popup si hacés click fuera del contenido
    >
      <div
        className="bg-white rounded-lg max-w-[300px] md:max-w-[760px] w-full relative py-8 px-6 md:py-20 md:px-16"
        onClick={(e) => e.stopPropagation()} // Evita cerrar si se hace click adentro del popup
      >
        <div className="flex justify-between items-start mb-16">
          <h2 className="text-primary text-xl md:text-4xl font-black">
            Inscribite a nuestro Newsletter
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-primary text-[40px] md:text-[80px] font-thin leading-[35px] p-0 m-0 self-start"
          >
            ×
          </button>
        </div>
        <input
          type="text"
          placeholder="Nombre y Apellido*"
          className="border-b py-4 text-[14px] md:text-lg border-black mb-6 self-end w-full focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email*"
          className="border-b py-4 text-[14px] md:text-lg border-black mb-12 self-end w-full focus:outline-none"
        />
        <div className="flex justify-end">
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
