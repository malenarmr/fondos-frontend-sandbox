'use client';

import { useEffect, useState } from 'react';
import PieChart from '@/components/cartera/PieChart';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useAppContext } from '@/context/AppContext';

interface Cartera {
  id: number;
  type: string;
  name: string;
  description: string;
}

Chart.register(CategoryScale);

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
];

export default function ChartSection() {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: '',
        data: [0],
        backgroundColor: [''],
        borderColor: '',
        borderWidth: 0,
      },
    ],
  });
  const [carteras, setCarteras] = useState<Cartera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchCarteras() {
      try {
        const response =
          await provinciaApiClient.bursatil.carterasEficientes.getAll();
        setCarteras(response.data.data as Cartera[]);
        // setCarteras([
        //   {
        //     id: 0,
        //     type: 'Conservador',
        //     name: 'Nombre',
        //     description: 'Descripcion',
        //   },
        //   {
        //     id: 1,
        //     type: 'Conservador',
        //     name: 'Nombre',
        //     description: 'Descripcion',
        //   },
        //   {
        //     id: 2,
        //     type: 'Conservador',
        //     name: 'Nombre',
        //     description: 'Descripcion',
        //   },
        // ]);
        setChartData({
          // labels: Data.map((data) => data.year),
          datasets: [
            {
              label: 'Fondo con porcentaje ',
              data: Data.map((data) => data.userGain),
              backgroundColor: ['#00E89A', '#00C3B3', '#005A63', '#008996'],
              borderColor: '#F5EFFC',
              borderWidth: 5,
            },
          ],
        });
      } catch {
        setError('Error al cargar carteras eficientes');
      } finally {
        setLoading(false);
      }
    }
    fetchCarteras();
  }, [provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="px-8 md:px-6 lg:px-[145px] pt-16 pb-32">
      <div className="flex flex-col md:flex-row gap-5 xl:gap-10 items-stretch justify-between">
        {carteras.map((cartera, index) => (
          <div
            key={index}
            className="bg-white rounded-xl py-10 md:py-20 px-4 md:px-6 lg:px-8 flex flex-col gap-2 text-primary font-encode-sans w-full md:w-1/3"
            style={{
              boxShadow: '0px 4px 27px 0px rgba(156, 163, 175, 0.50)',
            }}
          >
            <h4 className="mb-4 md:mb-8 text-2xl md:text-xl lg:text-4xl font-bold text-center">
              {cartera.type}
            </h4>
            <p className="md:mt-4 text-[14px] md:text-[14px] lg:text-lg pb-6 md:pb-10">
              {cartera.description}
            </p>
            <PieChart chartData={chartData} />
            <div className="flex flex-col border-t border-t-[#CDCACA] mt-8 py-3">
              <span className="pb-3 text-[#929292] font-encode-sans font-semibold text-[10px] text-[12px]">
                PORCENTAJES
              </span>
              <div className="flex flex-col gap-3 justify-start">
                {['#ffffff', '#00C3B3', '#005A63', '#008996'].map(
                  (activo, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div
                        className={`h-[10px] w-[10px] rounded-full bg-[${activo}]`}
                      >
                        {' '}
                      </div>
                      <span className="font-encode-sans text-[12px] md:text-[16px] ">
                        Fondo %
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col border-t border-t-[#CDCACA]">
              <span className="py-3 text-[#929292] font-encode-sans font-semibold text-[12px]">
                ACTIVOS
              </span>
              <div className="flex gap-3 justify-start flex-wrap">
                {['Dolar MEP', 'Bonos', 'Acciones', 'Cauciones'].map(
                  (activo, index) => (
                    <div
                      key={index}
                      className="font-encode-sans px-2 lg:px-3 py-1 rounded-[6px] text-center transition duration-200 bg-[#00C3B34D] text-[#929292] font-semibold text-[12px]"
                    >
                      {activo}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
