import MobileSlider from '@/components/shared/MobileSlider';
import BenefitCard from '@/components/invierta/BenefitCard';
import TextImageCard from '@/components/shared/TextImageCard';
import React from 'react';
const benefitCards = [
  {
    image: '/invierta/01_VariedaddeActivos.svg',
    alt: 'Variedad de activos',
    width: 145,
    height: 145,
    title: 'Variedad de activos',
    content: `¿Qué podés operar? Dólar MEP, Bonos, Letras, ONs, Acciones, CEDEARs, FCI, Cauciones, Opciones y Futuros.`,
  },
  {
    image: '/invierta/02_SimpleyRapido.svg',
    alt: 'Simple y rápido',
    width: 145,
    height: 145,
    title: 'Simple y rápido',
    content: `Apertura y mantenimiento de cuenta sin costos. Con las comisiones más competitivas del mercado.`,
  },
  {
    image: '/invierta/03_SeguridadGarantizada.svg',
    alt: 'Seguridad garantizada',
    width: 145,
    height: 145,
    title: 'Seguridad garantizada',
    content: `¡Ahorrá e invertí sin preocupaciones! Nuestra app cuenta con los más altos estándares de seguridad y protección de datos.`,
  },
];

export default function BenefitsSection() {
  return (
    <section className={'container mx-auto text-[#3C3C3B]'}>
      <div className="px-7 pt-16 pb-3 mt-4 mb-7 rounded-[50px] shadow-[0px_4px_32px_0px_rgba(154,152,152,0.3)] lg:shadow-none ">
        <div className="text-center">
          <h1 className="font-encode-sans font-bold text-xl lg:text-4xl text-primary mb-0 md:mb-12">
            ¡Invierta, tu mejor opción!
          </h1>
          <div className={'lg:hidden'}>
            <MobileSlider
              items={benefitCards.map((card, i) => (
                <BenefitCard
                  image={card.image}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  key={i}
                >
                  <h6 className="font-black text-[18px] text-primary mb-4 mt-2">
                    {card.title}
                  </h6>
                  <p className="text-[15px]/5 w-[60%] mx-auto">
                    {card.content}
                  </p>
                </BenefitCard>
              ))}
            />
          </div>
          <div className="hidden lg:flex flex-col lg:flex-row items-start justify-center lg:gap-10 flex-wrap">
            {benefitCards.map((card, i) => (
              <TextImageCard
                image={card.image}
                alt={card.alt}
                width={card.width}
                height={card.height}
                key={i}
                description={
                  <div className="flex flex-col justify-center align-center">
                    <span className="font-black text-xl text-primary mb-3 mt-4">
                      {card.title}
                    </span>
                    <p className="font-normal text-primary w-80 px-5 leading-5">
                      {card.content}
                    </p>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
