'use client';
import PreFooterCard from '@/components/invierta/PreFooterCard';
import '@/components/invierta/PreFooterSection.css';
import HalfSectionCard from '@/components/shared/HalfSectionCard';
import JsonAnimation from '@/components/shared/LottieAnimation';
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

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="investor-container flex flex-col justify-center items-center">
      {/* BEGINS MOBILE */}
      <div className="block md:hidden w-full">
        <div className="flex flex-col max-w-full w-full">
          {items.map((item, index) => {
            const animation =
              index === 0 ? (
                <JsonAnimation src="/shared/01_Binoculares.json" />
              ) : (
                <JsonAnimation src="/shared/03_Checklist.json" />
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
                  link={item.link} // siempre link
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
              <JsonAnimation src="/shared/01_Binoculares.json" />
            ) : (
              <JsonAnimation src="/shared/03_Checklist.json" />
            );

          const textAlign = index === 0 ? 'end' : 'start';

          const paddingXxl = index === 0 ? 'pl-xxl' : 'pr-xxl';

          return (
            <HalfSectionCard
              key={index}
              animation={animation}
              title={item.title}
              bgColor={item.bgColor}
              textColor={item.textColor}
              textButton={item.textButton}
              borderRadius={item.borderRadius}
              link={item.link} // siempre usa link
              align={textAlign}
              padding={paddingXxl}
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
