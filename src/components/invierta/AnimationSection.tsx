'use client';

import Button from '@/components/shared/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function AnimationSection() {
  return (
    <div className="container flex flex-col lg:flex-row items-center lg:justify-between">
      {/* GIF hardcodeado */}
      <div className="mb-2 lg:mb-0 lg:mr-10">
        <Image
          src="/home/01_Binoculares.gif"
          alt="Binoculares simulador"
          className="max-w-full h-auto"
          width={500}
          height={500}
        />
      </div>

      {/* Texto y botón */}
      <div className="flex flex-col text-end md:text-center lg:text-right lg:w-1/2 px-[50px] md:px-0">
        <h1 className="font-encode-sans text-xl lg:text-4xl text-primary-light leading-tight mb-5 font-extrabold">
          Proyectá con el
          <br /> simulador de
          <br />
          rendimientos
        </h1>
        <p className="font-encode-sans text-lg text-secondary leading-6 mb-8">
          Enterate de cómo operaron los fondos
          <br className="hidden lg:block" /> en los últimos períodos. Podés
          compararlos
          <br className="hidden lg:block" /> y analizar cómo rindieron para
          tomar las mejores decisiones.
        </p>
        <div className="flex justify-end lg:justify-end mb-6 md:mb-0">
          <Link href="/simulador" passHref>
            <Button variant="light">Ir al simulador</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
