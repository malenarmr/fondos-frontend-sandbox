// src/components/shared/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FooterButton from './FooterButton';

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
            src="/footer/BancoProvinciaBursatil.svg"
            alt="Bursátil"
            width={80}
            height={24}
          />
        </div>
        <hr className="border-gray-300 opacity-50 mb-6" />

        {/* Contact Columns */}
        <div className="flex divide-x divide-gray-300 mb-6">
          <div className="w-1/2 px-2">
            <div className="flex items-center gap-3 mb-3">
              <a
                href="https://www.facebook.com/ProvinciaSF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/Facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://x.com/provinciasf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/X.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/provincia-servicios-financieros/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/Linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
              Responsable Relaciones con el público
            </h4>
            <p className="text-[9.5px] text-white">
              Patricia Alegre – (11) 4347-0132
            </p>
          </div>
          <div className="w-1/2 px-2">
            <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
              Oficinas Centrales Provincia Bursátil
            </h4>
            <p className="text-[9.5px] text-white leading-snug">
              San Martín 108 – Piso 12 (C1004AAD) – Buenos Aires
              <br />
              Consultas o Denuncias:
              <br />
              0800-999-4008 (10 a 18 h)
            </p>
          </div>
        </div>
        <hr className="border-gray-300 opacity-50 mb-6" />

        {/* Branch & Protection Button */}
        <div className="flex divide-x divide-gray-300 mb-6">
          <div className="w-1/2 px-2">
            <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
              Sucursal La Plata
            </h4>
            <p className="text-[9.5px] text-white leading-snug">
              Calle 6 (e/46 y 47) Piso 3<br />
              (B1900AMU) – Buenos Aires
              <br />
              Casa Matriz Banco de la Provincia
              <br />
              (0221) 4897774/5
            </p>
          </div>
          <div className="w-1/2 px-2 flex flex-col justify-between">
            <div>
              <h4 className="font-encode-sans font-semibold text-[10px] mb-1 text-white">
                Denuncias
              </h4>
              <p className="text-[9.5px] text-white">
                denuncias@provinciabursatil.com.ar
              </p>
            </div>
            <FooterButton className="text-[10px]">
              <Link href="/proteccion-datos-personales">
                Protección de datos personales
              </Link>
            </FooterButton>
          </div>
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
              src="/footer/BancoProvinciaBursatil.svg"
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
        <hr className="border-gray-300 opacity-50 mb-8" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 mb-8 text-white">
          <div className="md:border-r md:border-gray-300 md:pr-4 text-center md:text-left">
            <h4 className="font-semibold text-md mb-2">
              Responsable Relaciones con el público
            </h4>
            <p className="text-sm">Patricia Alegre – (11) 4347 0132</p>
          </div>
          <div className="md:border-r md:border-gray-300 md:px-3 text-center md:text-left">
            <h4 className="font-semibold text-md mb-2">
              Oficinas Centrales Provincia Bursátil
            </h4>
            <p className="text-sm">
              San Martín 108 – Piso 12 (C1004AAD) – Buenos Aires – Argentina
              <br />
              Consultas o Denuncias: 0800 – 999 – 4008 (10 a 18 h)
            </p>
          </div>
          <div className="md:border-r md:border-gray-300 md:px-3 text-center md:text-left">
            <h4 className="font-semibold text-md mb-2">Sucursal La Plata</h4>
            <p className="text-sm">
              Calle 6 (e/46 y 47) Piso 3 (B1900AMU) – <br />
              Buenos Aires – Argentina
              <br />
              Casa Matriz Banco de la Provincia
              <br />
              (0221) 4897774/5
            </p>
          </div>
          <div className="md:px-4 flex flex-col justify-between text-center md:text-left">
            <div>
              <h4 className="font-semibold text-md mb-2">
                Consultas y reclamos
              </h4>
              <p className="text-sm">denuncias@provinciabursatil.com.ar</p>
            </div>
            <FooterButton>
              <Link href="/proteccion-datos-personales">
                Protección de datos personales
              </Link>
            </FooterButton>
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
