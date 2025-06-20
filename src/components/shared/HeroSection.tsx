import React from 'react';
import JsonAnimation from '../shared/LottieAnimation';
import './HeroSection.css';

interface Hero {
  title: string;
  children: React.ReactNode;
  animation: string;
  id: string;
  bgColor?: string;
  textColor?: string;
}

const HeroSection: React.FC<Hero> = ({
  title,
  children,
  animation,
  id,
  bgColor,
  textColor,
}) => {
  return (
    <section
      className={`${bgColor} py-16 dark:bg-dark md:px-[100px] xl:px-[145px]`}
    >
      <div
        className={`flex flex-col-reverse xl:flex-row items-center justify-between mx-auto`}
      >
        <div className="flex flex-col text-primary">
          <h1
            className={`text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary mb-7 xl:mb-12 max-w-[555px] ${textColor}`}
          >
            {title}
          </h1>
          {children}
        </div>
        {/* Imagen */}
        <div
          className={`${id} animation-svg overflow-hidden flex items-center justify-center`}
        >
          <JsonAnimation src={animation} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
