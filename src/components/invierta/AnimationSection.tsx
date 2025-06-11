'use client';

import Button from '@/components/shared/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function AnimationSection() {
  return (
    <section className="lg:rounded-t-[50px] py-[30px] lg:pb-[70px] lg:mt-20 flex flex-col items-center mb-5 lg:mb-[-50px] px-4 lg:px-20">
      <div className="container flex flex-col lg:flex-row items-center lg:justify-between">
        {/* GIF hardcodeado */}
        <div className="mb-8 lg:mb-0 lg:mr-10">
          <Image
            src="/home/01_Binoculares.gif"
            alt="Binoculares simulador"
            className="max-w-full h-auto"
            width={500}
            height={500}
          />
        </div>

        {/* Texto y botón */}
        <div className="flex flex-col text-center lg:text-left lg:w-1/2">
          <h1 className="font-encode-sans text-xl lg:text-4xl text-primary-light leading-tight mb-5 font-bold">
            Proyectá con el simulador de <br />
            rendimientos
          </h1>
          <p className="font-encode-sans text-lg text-secondary leading-6 mb-8">
            Enterate de cómo operaron los fondos en los últimos períodos. Podés
            compararlos y analizar cómo rindieron para tomar las mejores
            decisiones
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              href="https://app.provinciabursatil.com.ar/#!/registration/email?originalUrl="
              passHref
            >
              <Button variant="light">Ir al simulador</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
