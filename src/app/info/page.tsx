'use client';

import AccordionFaq from '@/components/info/AccordionFaq';
import AccordionFiles from '@/components/info/AccordionFiles';
import VideosSection from '@/components/info/VideosSection';
import AnimationSection from '@/components/invierta/AnimationSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import Image from 'next/image';
import Link from 'next/link';

export default function InfoPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-12 dark:bg-dark px-4 md:px-[100px] xl:px-[145px] padding-xxl">
        <div
          className={`flex flex-col-reverse xl:flex-row items-center justify-between mx-auto`}
        >
          <div className="flex flex-col text-secondary">
            <h1 className="text-center xl:text-left font-encode-sans font-extrabold xl:font-black text-[30px] xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-12 max-w-[590px]">
              Info para el inversor
            </h1>
            <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
              En la guia para el inversor vas a poder encontrar distintas
              herramientas para conocer más sobre el mundo de la inversión:
              videos tutoriales, test del inversor, simulador de inversiones,
              etc.
            </p>
          </div>
        </div>
      </section>
      <section className="lg:rounded-t-[50px] py:[0px] md:py-[30px] lg:pb-[70px] flex flex-col items-center mb-5 lg:mb-[-50px] md:px-[100px] xl:px-[145px] padding-xxl">
        <AnimationSection />
      </section>

      <section className="bg-[#2098A1] py-12 lg:py-8 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between mx-auto">
          <div className="flex flex-col text-primary px-[50px] xl:px-0">
            <h1 className="text-start lg:text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary mb-7 xl:mb-12 max-w-[555px] text-white">
              ¿Querés saber qué tipo de inversor sos?
            </h1>
            <p className="text-start lg:text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-white leading-5 xl:leading-6 xl:mr-0 mb-6 md:mb-12 md:w-[555px]">
              ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro test
              en minutos y encontrá la mejor estrategia de inversión para vos.
            </p>
            <div className="">
              <Link href="/test-inversor" passHref>
                <Button variant="sky">Hacé el test</Button>
              </Link>
            </div>
          </div>
          {/* Imagen */}
          <div className="animation-svg overflow-hidden flex items-center justify-center">
            <Image
              src="/guia/03_Checklist.gif"
              alt="Binoculares simulador"
              className="max-w-full h-auto"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="dark:bg-dark px-[50px] md:px-[100px] xl:px-[145px] pt-12 lg:pt-20 padding-xxl ">
          <div className="flex flex-col lg:flex-row justify-between mb-12 text-center lg:text-start">
            <h1 className="font-encode-sans text-[30px] lg:text-4xl text-secondary font-extrabold lg:font-black leading-snug">
              Conocé más sobre <br className="hidden lg:block " /> cómo invertir
            </h1>
            <div className="hidden lg:block">
              <Link href="/tutoriales">
                <Button variant="light">Ver todos los videos</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:pl-12 flex-col">
          <VideosSection />
        </div>
        <div className="flex lg:hidden justify-center">
          <Link href="/tutoriales">
            <Button variant="light">Ver todos los videos</Button>
          </Link>
        </div>
      </section>

      <div className="mt-12 py-12 lg:py-16 bg-primary-light px-[30px] md:px-[100px] xl:px-[145px] padding-xxl">
        <div className="space-y-12 text-center lg:pt-0">
          <h1 className="font-encode-sans text-2xl lg:text-4xl text-white font-bold lg:font-black">
            ¿Tenés dudas sobre cómo operar?
          </h1>
          <p className="text-[16px] lg:text-lg text-white">
            Con nuestros videos tutoriales vas a poder conocer paso a paso cómo
            operar.
            <br /> Usá los instructivos para saldar dudas.
          </p>
          <AccordionFaq />
          <div className="flex justify-center">
            <span className="text-white mt-4">
              Si no pudimos saldar tus dudas podes contactarnos por mail a{' '}
              <a href="mailto:sugerencias@provinfondos.com.ar">
                <b>sugerencias@provinfondos.com.ar</b>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="py-2 lg:py-16 px-[30px] md:px-[100px] xl:px-[145px] padding-xxl  mb-6">
        <div className="space-y-12 text-center pt-10 lg:pt-0">
          <h1 className="font-encode-sans text-2xl lg:text-4xl font-bold lg:font-black">
            Archivos descargables
          </h1>
          <p className="text-[16px] lg:text-lg">
            Acá vas a poder encontrar algunos descargables útiles.
          </p>
          <AccordionFiles />
        </div>
      </div>

      <Footer />
    </main>
  );
}
