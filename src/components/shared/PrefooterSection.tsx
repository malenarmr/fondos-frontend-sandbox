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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const handleOpenPopup = () => setShowPopup(true);

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="investor-container flex flex-col justify-center items-center">
      {/* BEGINS MOBILE */}
      <div className="block md:hidden mobile-slider w-full">
        <div className="custom-navigation flex justify-between px-4">
          <button onClick={prevCard}>
            <Image
              src="/invierta/arrow_left.png"
              alt="Flecha izquierda"
              width={25}
              height={25}
            />
          </button>
          <button onClick={nextCard}>
            <Image
              src="/invierta/arrow_right.png"
              alt="Flecha derecha"
              width={25}
              height={25}
            />
          </button>
        </div>
        <div
          className="card-slider flex transition-transform duration-300 max-w-full w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
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
              >
                {item.description}
              </PreFooterCard>
            </div>
          ))}
        </div>

        {/* Móvil sky bar */}
        {/* <div className="w-full py-4 mt-4"></div> */}
      </div>
      {/* END MOBILE */}

      {/* BEGINS DESKTOP */}
      <div className="hidden md:flex w-full">
        {items.map((item, index) => (
          <HalfSectionCard
            key={index}
            title={item.title}
            bgColor={item.bgColor}
            textColor={item.textColor}
            textButton={item.textButton}
            borderRadius={item.borderRadius}
            link={item.link}
            onClick={item.popup ? handleOpenPopup : undefined}
          >
            {item.description}
          </HalfSectionCard>
        ))}
      </div>
      {/* END DESKTOP */}
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
}
