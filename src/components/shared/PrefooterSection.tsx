'use client';
import PreFooterCard from '@/components/invierta/PreFooterCard';
import '@/components/invierta/PreFooterSection.css';
import HalfSectionCard from '@/components/shared/HalfSectionCard';
import Image from 'next/image';
import { useState } from 'react';
import Popup from '../ui/inversiones/Popup';

interface Props {
  items: {
    title: string;
    bgColor: string;
    textColor: string;
    textButton: string;
    borderRadius: string;
    link?: string;
    popup?: boolean;
    description: React.ReactNode;
  }[];
}

export default function PreFooterSection({ items }: Props) {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="investor-container flex flex-col justify-center items-center">
      {/* BEGINS MOBILE */}
      <div className="block md:hidden w-full">
        <div className="flex flex-col max-w-full w-full">
          {items.map((item, index) => {
            const animation =
              index === 0 ? (
                <Image
                  src="/home/01_Binoculares.gif"
                  alt="Binoculares simulador"
                  className="max-w-full h-auto"
                  width={500}
                  height={500}
                />
              ) : (
                <Image
                  src="/guia/03_Checklist.gif"
                  alt="Check simulador"
                  className="max-w-full h-auto"
                  width={500}
                  height={500}
                />
              );

            const textAlign = index === 0 ? 'end' : 'start';

            return (
              <div
                key={index}
                className="card-item min-w-full max-w-full shrink-0"
              >
                <PreFooterCard
                  title={item.title}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                  textButton={item.textButton}
                  borderRadius={item.borderRadius}
                  link={item.link}
                  animation={animation}
                  align={textAlign}
                >
                  {item.description}
                </PreFooterCard>
              </div>
            );
          })}
        </div>

        {/* Móvil sky bar */}
        {/* <div className="w-full py-4 mt-4"></div> */}
      </div>
      {/* END MOBILE */}

      {/* BEGINS DESKTOP */}
      <div className="hidden md:flex w-full">
        {items.map((item, index) => {
          // Elige la animación según la posición (0 = izquierda, 1 = derecha)
          const animation =
            index === 0 ? (
              <Image
                src="/home/01_Binoculares.gif"
                alt="Binoculares simulador"
                className="max-w-full h-auto"
                width={500}
                height={500}
              />
            ) : (
              <Image
                src="/guia/03_Checklist.gif"
                alt="Check simulador"
                className="max-w-full h-auto"
                width={500}
                height={500}
              />
            );

          const textAlign = index === 0 ? 'end' : 'start';

          return (
            <HalfSectionCard
              key={index}
              animation={animation}
              title={item.title}
              bgColor={item.bgColor}
              textColor={item.textColor}
              textButton={item.textButton}
              borderRadius={item.borderRadius}
              link={item.link}
              onClick={item.popup ? handleOpenPopup : undefined}
              align={textAlign}
            >
              {item.description}
            </HalfSectionCard>
          );
        })}
      </div>
      {/* END DESKTOP */}
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
}
