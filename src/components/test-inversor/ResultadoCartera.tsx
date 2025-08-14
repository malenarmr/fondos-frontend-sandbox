'use client';

import PieChart from '@/components/cartera/PieChart';
import { useAppContext } from '@/context/AppContext';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

Chart.register(CategoryScale);

interface Porcentaje {
  tipo: string;
  id: number;
  nombre: string;
  value: string; // porcentaje en string
  product_id: string | null;
}

interface Cartera {
  id: number;
  name: string;
  description: string;
  porcentajes: Porcentaje[];
}

interface Props {
  filterType: string;
}

export default function ResultadoCartera({ filterType }: Props) {
  const { provinciaApiClient } = useAppContext();
  const [cartera, setCartera] = useState<Cartera | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCartera() {
      try {
        // Llamamos al endpoint que devuelve todas las "carteras eficientes"
        // (la respuesta tiene la forma { data: Cartera[] , meta: { ... } })
        const resp =
          await provinciaApiClient.bursatil.carterasEficientes.getAll();
        const todas: Cartera[] = resp.data.data;
        // Buscamos la cartera cuya “name” coincida con filterType
        function normalize(s: string) {
          return s
            ?.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // quita acentos
            .replace(/^cartera\s+/i, '') // quita "Cartera " al inicio
            .trim()
            .toLowerCase();
        }

        const target = normalize(filterType);
        const found = todas.find(
          (c: any) => normalize(c.inversor_profile?.title || '') === target
        );
        if (!found) {
          setError('No se encontró la cartera para este perfil');
          return;
        }
        setCartera(found);

        // Construimos los datos del gráfico a partir de found.porcentajes
        const valores = found.porcentajes.map((p) => Number(p.value));
        // Podemos reusar un arreglo fijo de colores o generar uno por cada slice
        const fixedColors = [
          '#00E89A',
          '#00C3B3',
          '#005A63',
          '#008996',
          '#00A38C',
        ];
        const backgroundColors = valores.map(
          (_, idx) => fixedColors[idx % fixedColors.length]
        );

        setChartData({
          labels: found.porcentajes.map((p) => p.nombre),
          datasets: [
            {
              data: valores,
              backgroundColor: backgroundColors,
              borderColor: '#FFFFFF',
              borderWidth: 2,
            },
          ],
        });
      } catch {
        setError('Error al cargar la cartera');
      } finally {
        setLoading(false);
      }
    }
    fetchCartera();
  }, [filterType, provinciaApiClient]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !cartera || !chartData) {
    return (
      <p className="text-center text-red-500">
        {error || 'Cartera no disponible'}
      </p>
    );
  }

  return (
    <section className="px-8 md:px-12 pt-4 pb-32 space-y-8">
      {/* —— DESCRIPCIÓN GLOBAL —— */}
      <div>
        <p className="text-center text-primary mb-8 px-1 sm:px-16">
          {cartera.description}
        </p>
      </div>

      {/* —— ACTIVOS —— */}
      <div>
        <h3 className="text-xl pt-20 font-bold mb-4 text-primary">
          Activos que se ajustan a tu perfil
        </h3>
        <hr className="border-t border-[#929292] mx-auto mb-4" />

        <div className="flex flex-wrap gap-3 justify-center">
          {cartera.porcentajes.map((p) => (
            <div
              key={p.id}
              className="font-encode-sans px-2 py-1 rounded-[6px] bg-[#00C3B34D] text-[#929292] text-[12px] md:text-[16px]"
            >
              {p.nombre} ({p.value}%)
            </div>
          ))}
        </div>
      </div>

      {/* —— CARTERA SUGERIDA —— */}
      <div>
        <h3 className="text-xl pt-20 font-bold mb-4 text-primary">
          Cartera sugerida para tu perfil
        </h3>
        <hr className="border-t border-[#929292] mx-auto mb-4" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <PieChart chartData={chartData} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <h4 className="text-2xl font-bold text-primary">{cartera.name}</h4>
            {cartera.porcentajes.length > 0 && (
              <p className="text-[14px] md:text-[16px] text-primary">
                {cartera.porcentajes[0].nombre}:{' '}
                {cartera.porcentajes[0].tipo === 'fondo'
                  ? cartera.porcentajes[0].nombre
                  : cartera.porcentajes[0].nombre}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
