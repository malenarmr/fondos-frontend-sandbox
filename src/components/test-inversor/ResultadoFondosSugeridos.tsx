'use client';

import Link from 'next/link';
import Button from '../shared/Button';

// Si necesitás la función, la traés de donde la tengas, o la pegás acá:
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

interface Fondo {
  id: number;
  documentId?: string;
  name: string;
  description: string;
  moneda: string;
  horizonte: string;
  variacionDiaria: string | number;
  patrimonio?: string;
  inversor_profile_fondos?: { title: string }[];
  caracteristicas_fondos?: { value: string }[];
  carteraDetallada?: string;
}

interface Props {
  fondos: Fondo[];
}

export default function ResultadoFondosSugeridos({ fondos }: Props) {
  if (!fondos || fondos.length === 0)
    return (
      <div className="text-center text-gray-600 py-12 w-full">
        No hay fondos sugeridos para este perfil en este momento.
      </div>
    );

  return (
    <section className="px-0 md:px-0 pt-0 pb-0 space-y-8">
      <h3 className="text-xl font-bold mb-6 text-primary text-center">
        Fondos sugeridos para tu perfil
      </h3>
      <div className="grid md:grid-cols-1 gap-6 max-w-[1132px] mx-auto">
        {fondos.map((fondo, index) => (
          <div
            key={index}
            className="rounded-tr-xl rounded-bl-xl rounded-tl rounded-br shadow-md bg-white"
          >
            {/* Título/fondo */}
            <div className="py-2 px-4 bg-primary-light text-white rounded-tr-xl rounded-tl">
              <span className="font-encode-sans font-bold">{fondo.name}</span>
            </div>
            {/* Fila: tipo de ahorro + perfil */}
            <div className="py-2 flex items-center border-b mx-4 text-secondary">
              <div className="w-1/2 border-r">
                <span>
                  Tipo de ahorro en{' '}
                  <b>
                    <span className="lowercase">{fondo.moneda}</span>
                  </b>
                </span>
              </div>
              <div className="w-1/2 flex justify-start pl-6">
                <div className="w-1/2 border-r">
                  <span>
                    Horizonte a <b>{fondo.horizonte}</b>
                  </span>
                </div>
                <div className="w-1/2 flex justify-start pl-6">
                  {/* Mostramos característica si viene */}
                  {fondo.caracteristicas_fondos &&
                    fondo.caracteristicas_fondos[0]?.value && (
                      <span className="flex p-2">
                        {capitalize(fondo.caracteristicas_fondos[0].value)}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {/* Fila: descripción (opcional) */}
            {fondo.description && (
              <div className="mx-4 pt-2 pb-2 text-xs text-gray-600 border-t">
                {fondo.description}
              </div>
            )}
            {/* Acciones */}
            <div className="py-4 flex justify-end items-center mx-4 gap-2">
              {fondo.documentId && (
                <Link href={`/nuestros-fondos/${fondo.documentId}`}>
                  <Button variant="secondary">Ver fondo</Button>
                </Link>
              )}
              {fondo.carteraDetallada && (
                <a
                  href={fondo.carteraDetallada}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-xs text-primary underline"
                >
                  Cartera detallada
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
