'use client';

import Button from '@/components/shared/Button';
import JsonAnimation from '@/components/shared/LottieAnimation';
import Link from 'next/link';

export default function AnimationSection() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:justify-between">
      {/* GIF hardcodeado */}
      <div className="mb-2 lg:mb-0 lg:mr-10 w-[300px] h-[250px] lg:w-[500px] lg:h-[430px]">
        <JsonAnimation src="/shared/01_Binoculares.json" />
      </div>

      {/* Texto y botón */}
      <div className="flex flex-col text-center lg:text-right lg:w-1/2">
        <h1 className="font-encode-sans text-xl lg:text-4xl text-primary-light leading-tight mb-5 font-extrabold">
          Simulador de
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
        <div className="flex justify-center lg:justify-end mb-6 md:mb-0">
          <Link href="/simulador" passHref>
            <Button variant="light">Ir al simulador</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
