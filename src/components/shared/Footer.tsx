'use client';

import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* FOOTER */}
      <footer className="w-full bg-primary py-8 sm:py-10 px-4 sm:px-10 lg:px-28 font-encode-sans text-white">
        {/* Logos & Socials */}
        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-8 mb-2 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 justify-center hidden md:flex">
            <Image
              src="/footer/BancoProvincia_1.png"
              alt="Banco Provincia"
              width={107}
              height={36}
            />
            <Image
              src="/footer/ServiciosFinancieros_1.png"
              alt="Provincia Servicios Financieros"
              width={142}
              height={35}
            />
            <Image
              src="/footer/BancoProvinciaFondos2.png"
              alt="Provincia Fondos"
              width={105}
              height={34}
            />
          </div>

          <div className="flex items-center gap-4 sm:gap-6 justify-center flex md:hidden">
            <Image
              src="/footer/BancoProvincia_1.png"
              alt="Banco Provincia"
              width={86}
              height={29}
            />
            <Image
              src="/footer/ServiciosFinancieros_1.png"
              alt="Provincia Servicios Financieros"
              width={114}
              height={28}
            />
            <Image
              src="/footer/BancoProvinciaFondos2.png"
              alt="Provincia Fondos"
              width={84}
              height={27}
            />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/provinciasf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Provincia Servicios Financieros"
            >
              <Image
                src="/footer/X.svg"
                alt="X (Twitter)"
                width={35}
                height={35}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/provincia-servicios-financieros/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Provincia Servicios Financieros"
            >
              <Image
                src="/footer/Linkedin.svg"
                alt="LinkedIn"
                width={35}
                height={35}
              />
            </a>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-2">
          {/* Asesores Comerciales */}
          <div className="text md:text-left md:border-r md:border-white/40 md:pr-6">
            <h4 className="font-semibold text-sm sm:text-base mb-2">
              Contacto
            </h4>
            <p className="text-[12px] sm:text-sm leading-snug">
              Luciana Brossy: 11 6758-5717
              <br />
              <span className="break-all">
                LucianaBrossy@provinfondos.com.ar
              </span>
              <br />
              Patricio Germano: 11 4074-5995
              <br />
              <span className="break-all">
                PatricioGermano@provinfondos.com.ar
              </span>
            </p>
          </div>

          {/* Línea horizontal solo en mobile */}
          <hr className="block md:hidden border-white/40" />

          {/* Oficinas Centrales */}
          <div className="text md:text-left md:border-r md:border-white/40 md:px-6">
            <h4 className="font-semibold text-sm sm:text-base mb-2">
              Oficinas Centrales Provincia Fondos
            </h4>
            <p className="text-[12px] sm:text-sm leading-snug">
              San Martín 108 – Piso 12 (C1004AAD) – Buenos Aires – Argentina
              <br />
              (11) 4348-9415 / FAX. 4348-9417
            </p>
          </div>

          {/* Línea horizontal solo en mobile */}
          <hr className="block md:hidden border-white/40" />

          {/* Consultas o Denuncias */}
          <div className="text md:text-left md:pl-6">
            <h4 className="font-semibold text-sm sm:text-base mb-2">
              Consultas o Denuncias
            </h4>
            <p className="text-[12px] sm:text-sm leading-snug">
              0800 - 666 - 2285
              <br />
              Sugerencias:{' '}
              <span className="break-all">sugerencias@provinfondos.com.ar</span>
              <br />
              Denuncias:{' '}
              <span className="break-all">denuncias@provinfondos.com.ar</span>
            </p>
          </div>
        </div>
      </footer>

      {/* SKY BAR */}
      <div className="w-full py-4 bg-sky sm:bg-white">
        <div className="mx-auto px-4 text-center font-encode-sans font-semibold text-[12px] leading-[100%] tracking-normal text-primary">
          2026 Banco de la Provincia de Buenos Aires – Casa Matriz: Calle 7 N°
          726 (B1900TFS) La Plata, Buenos Aires, Argentina
        </div>
      </div>
    </>
  );
};

export default Footer;
