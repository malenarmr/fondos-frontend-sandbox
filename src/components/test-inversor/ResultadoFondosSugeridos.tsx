// src/components/test-inversor/ResultadoFondosSugeridos.tsx

'use client';

interface Fondo {
  id: number;
  name: string;
  description: string;
  moneda: string;
  horizonte: string;
  variacionDiaria: number;
  patrimonio: string;
  carteraDetallada: string;
}

interface Props {
  fondos: Fondo[];
}

export default function ResultadoFondosSugeridos({ fondos }: Props) {
  return (
    <section className="px-8 md:px-12 pt-4 pb-32 space-y-8">
      <h3 className="text-xl font-bold mb-4 text-primary text-center">
        Fondos sugeridos para tu perfil
      </h3>
      <div className="flex flex-wrap gap-6 justify-center">
        {fondos.length > 0 ? (
          fondos.map((fondo) => (
            <div
              key={fondo.id}
              className="w-full max-w-[360px] bg-white border border-[#2F755E] rounded-2xl shadow p-4 space-y-2"
            >
              <div className="text-lg font-semibold text-primary">
                {fondo.name}
              </div>
              <div className="text-sm text-gray-700">{fondo.description}</div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Moneda: {fondo.moneda}</span>
                <span>Horizonte: {fondo.horizonte}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Variación diaria: {fondo.variacionDiaria}%</span>
                <span>Patrimonio: {fondo.patrimonio}</span>
              </div>
              <a
                href={fondo.carteraDetallada}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-green-700 underline text-xs"
              >
                Ver cartera detallada
              </a>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 py-12 w-full">
            No hay fondos sugeridos para este perfil en este momento.
          </div>
        )}
      </div>
    </section>
  );
}
