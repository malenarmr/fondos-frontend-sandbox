'use client';

import Button from '@/components/shared/Button';
import Link from 'next/link';
export default function FeaturedCarousel() {
  return (
    <div
      className="
        w-full max-w-[400px] md:max-w-[827px]
        rounded-tr-xl rounded-bl-xl rounded-tl-[80px] rounded-br-[80px]
        bg-white
        flex flex-col justify-center items-center text-center
        p-8 sm:p-16
        shadow-xl
      "
      style={{
        boxShadow: '0px 40px 80px 0px rgba(0,0,0,0.17)',
      }}
    >
      <h1 className="font-encode-sans text-[#009B67] font-extrabold text-2xl sm:text-4xl mb-4">
        ¿Querés saber <br /> qué tipo de inversor sos?
      </h1>
      <p className="text-base font-encode-sans text-secondary sm:text-lg mb-6 px-4">
        ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro test en
        minutos y encontrá la mejor estrategia de inversión para vos.
      </p>
      <Link href="/test-inversor" passHref>
        <Button variant="light">Hacé el test</Button>
      </Link>
    </div>
  );
}
