// src/components/shared/PromoSection.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface PromoSectionProps {
  /** Texto principal (título grande) */
  title: string;
  /** Texto secundario (párrafo) */
  description: string;
  /** URL de App Store (se usa en el primer botón) */
  appStoreUrl: string;
  /** URL de Play Store (se usa en el segundo botón) */
  playStoreUrl: string;
  /** Clases adicionales para el contenedor raíz */
  wrapperClassName?: string;
  /** Estilos en línea para el contenedor raíz */
  wrapperStyle?: React.CSSProperties;
  /** Clases adicionales para el contenedor interno (centrado/sombra/etc.) */
  innerContainerClassName?: string;
  /** Clases para el título (opcional) */
  titleClassName?: string;
  /** Clases para el párrafo (opcional) */
  descriptionClassName?: string;
  /** Clases para el wrapper de los botones (opcional) */
  buttonWrapperClassName?: string;
}

export default function PromoSection({
  title,
  description,
  appStoreUrl,
  playStoreUrl,
  wrapperClassName = '',
  wrapperStyle = {},
  innerContainerClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  buttonWrapperClassName = '',
}: PromoSectionProps) {
  return (
    <div
      className={`
        ${wrapperClassName}
      `}
      style={wrapperStyle}
    >
      <div className={`flex flex-col items-center ${innerContainerClassName}`}>
        {/* Título */}
        <h2
          className={`font-encode-sans font-black text-[25px] md:text-[45px] ${titleClassName}`}
        >
          {title}
        </h2>

        {/* Descripción */}
        <p
          className={`font-encode-sans text-[16px] md:text-xl mb-6 ${descriptionClassName}`}
        >
          {description}
        </p>

        {/* Botones de App Store / Play Store */}
        <div className={`mt-10 xl:mt-14 ${buttonWrapperClassName}`}>
          <div className="flex gap-4 justify-center xl:justify-center">
            <Link
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center
                border border-gray-300
                text-primary
                rounded-[10px]
                px-6 py-5
                transition duration-200
                hover:bg-white
                hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]
              "
            >
              <Image
                src="/home/AppStore.svg"
                alt="Apple icon"
                width={110}
                height={110}
                className="m-0 xl:mr-2"
              />
            </Link>

            <Link
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center
                border border-gray-300
                text-primary
                rounded-[10px]
                px-6 py-5
                transition duration-200
                hover:bg-white
                hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]
              "
            >
              <Image
                src="/home/PlayStore.svg"
                alt="Play Store icon"
                width={110}
                height={110}
                className="m-0 xl:mr-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
