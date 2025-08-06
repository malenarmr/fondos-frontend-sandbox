'use client';

import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* MOBILE SKY BAR */}
      <div className="block sm:hidden w-full bg-sky py-4">
        <div className="mx-auto px-4 text-center font-encode-sans font-semibold text-[12px] leading-[100%] tracking-normal text-primary">
          © 2025 Banco de la Provincia de Buenos Aires – Casa Matriz: Calle 7
          N° 726 (B1900TFS) La Plata, Buenos Aires, Argentina
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <div className="sm:hidden bg-primary px-4 py-8 font-encode-sans">
        {/* Logos Row */}
        <div className="flex justify-between items-center mb-6">
          <Image
            src="/footer/BancoProvincia.svg"
            alt="Banco Provincia"
            width={80}
            height={24}
          />
          <Image
            src="/footer/BancoProvinciaServiciosFinancieros.svg"
            alt="Servicios Financieros"
            width={100}
            height={24}
          />
          <Image
            src="/footer/BancoProvinciaFondos.svg"
            alt="Fondos"
            width={80}
            height={24}
          />
        </div>
        <hr className="border-gray-300 opacity-50 mb-6" />

        {/* Asesores Comerciales */}
        <div className="mb-6">
          <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
            Asesores Comerciales
          </h4>
          <p className="text-[9.5px] text-white">
            Luciana Brossy: 11 6758-5717
            <br />
            <span className="break-all">LucianaBrossy@provinfondos.com.ar</span>
            <br />
            Patricio Germano: 11 4074-5995
            <br />
            <span className="break-all">
              PatricioGermano@provinfondos.com.ar
            </span>
          </p>
        </div>
        <hr className="border-gray-300 opacity-50 mb-6" />

        {/* Oficinas Centrales */}
        <div className="mb-6">
          <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
            Oficinas Centrales Provincia Fondos
          </h4>
          <p className="text-[9.5px] text-white leading-snug">
            San Martín 108 – Piso 12 (C1004AAD) – Buenos Aires – Argentina
            <br />
            (11) 4348-9415 / FAX. 4348-9417
          </p>
        </div>
        <hr className="border-gray-300 opacity-50 mb-6" />

        {/* Consultas y otros */}
        <div className="mb-6">
          <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
            Consultas o Denuncias
          </h4>
          <p className="text-[9.5px] text-white">
            0800 - 666 - 2285
            <br />
            Sugerencias:{' '}
            <span className="break-all">sugerencias@provinfondos.com.ar</span>
            <br />
            Denuncias:{' '}
            <span className="break-all">denuncias@provinfondos.com.ar</span>
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center text-primary font-encode-sans font-semibold text-[12px] leading-[100%]">
          <p>
            © 2025 – Banco de la Provincia de Buenos Aires – Casa Matriz: Calle
            7 N° 726 (B1900TFS)
          </p>
          <p>La Plata, Buenos Aires, Argentina</p>
        </div>
      </div>

      {/* DESKTOP FOOTER */}
      <footer className="hidden sm:block w-full bg-primary py-10 px-28 font-encode-sans">
        {/* Logos & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/footer/BancoProvincia.svg"
              alt="Logo 1"
              width={120}
              height={120}
            />
            <Image
              src="/footer/BancoProvinciaServiciosFinancieros.svg"
              alt="Logo 2"
              width={170}
              height={170}
            />
            <Image
              src="/footer/BancoProvinciaFondos.svg"
              alt="Logo 3"
              width={120}
              height={120}
            />
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com/ProvinciaSF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/footer/Facebook.svg"
                alt="Facebook"
                width={35}
                height={35}
              />
            </a>
            <a
              href="https://x.com/provinciasf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/footer/X.svg" alt="Twitter" width={35} height={35} />
            </a>
            <a
              href="https://www.linkedin.com/company/provincia-servicios-financieros/"
              target="_blank"
              rel="noopener noreferrer"
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

        {/* Info Grid - 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 mb-8 text-white">
          {/* Asesores Comerciales */}
          <div className="md:border-r md:border-gray-300 md:pr-6 text-center md:text-left">
            <h4 className="font-semibold text-md mb-2">Asesores Comerciales</h4>
            <p className="text-sm">
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
          {/* Oficinas Centrales */}
          <div className="md:border-r md:border-gray-300 md:px-6 text-center md:text-left">
            <h4 className="font-semibold text-md mb-2">
              Oficinas Centrales Provincia Fondos
            </h4>
            <p className="text-sm">
              San Martín 108 – Piso 12 (C1004AAD) – Buenos Aires – Argentina
              <br />
              (11) 4348-9415 / FAX. 4348-9417
            </p>
          </div>
          {/* Consultas y otros */}
          <div className="md:px-6 text-center md:text-left">
            <h4 className="font-semibold text-md mb-2">
              Consultas o Denuncias
            </h4>
            <p className="text-sm">
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

      {/* DESKTOP SKY BAR */}
      <div className="hidden sm:block w-full bg-white py-4">
        <div className="mx-auto px-4 text-center font-encode-sans font-semibold text-[12px] leading-[100%] tracking-normal text-primary">
          © 2025 Banco de la Provincia de Buenos Aires – Casa Matriz: Calle 7
          N° 726 (B1900TFS) La Plata, Buenos Aires, Argentina
        </div>
      </div>
    </>
  );
};

export default Footer;
