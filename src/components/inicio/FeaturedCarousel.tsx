'use client';

import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function FeaturedCarousel() {
  return (
    <div className="flex justify-center pb-80 px-4">
      <div className="bg-white absolute rounded-tr-xl rounded-bl-xl rounded-tl-[80px] rounded-br-[80px] shadow-2xl w-full max-w-[827px] sm:h-[380px] p-32 flex flex-col justify-center items-center text-center">
        <h1 className="font-encode-sans text-primary-light font-extrabold text-2xl sm:text-4xl mb-4">
          ¿Querés saber <br /> qué tipo de inversor sos?
        </h1>
        <p className="text-base font-encode-sans text-secondary sm:text-lg mb-6 px-4">
          ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro test en
          minutos y encontrá la mejor estrategia de inversión para vos.
        </p>
        <Link href="/invierta" passHref>
          <Button variant="light">Hacé el test</Button>
        </Link>
      </div>
    </div>
  );
}
