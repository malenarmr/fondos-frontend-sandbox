'use-client';

import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { LiaDownloadSolid } from 'react-icons/lia';
import { Fondo } from '@/types/Fondo';
import './Fondo.css';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

interface FondoProps {
  id: string;
}

export default function FondoDetails({ id }: FondoProps) {
  // const [cuotaparte, setCuotaparte] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fondoData, setFondoData] = useState<Fondo>();

  const colors = ['#009B67', '#2098A1', '#2F755E', '#A2DBC8'];

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchFondo() {
      try {
        const response = await provinciaApiClient.fondos.founds.getByDocumentId(
          {
            foundDocumentId: id,
          }
        );

        setFondoData(response.data.data as Fondo);
      } catch {
        setError('Error al cargar fondo');
      } finally {
        setLoading(false);
      }
    }
    fetchFondo();
  }, [provinciaApiClient, id]);

  // useEffect(() => {
  //   async function fetchCuotaparte() {
  //     try {
  //       const res = await provinciaApiClient.fondos.cuotaParte.getAll({
  //         numero_fondo: fondoData.numero_fondo,
  //         clase_fondo: 'A',
  //       });
  //       console.log(res);
  //     } catch {
  //     } finally {
  //     }
  //   }

  //   fetchCuotaparte();
  // }, [fondoData]);

  const capitalize = (str: string) => {
    if (str) {
      return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  };

  const formatDate = (date: string) => {
    if (date) {
      const arr = date.split('-');
      const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];
      const mes = Number(arr[1]) - 1;

      return arr[2] + ' de ' + meses[mes] + ' de ' + arr[0];
    }
  };

  return (
    <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px]">
      {error && <p className="text-center text-red-500">{error}</p>}
      {fondoData && !loading ? (
        <>
          <div className="flex justify-between items-end">
            <div className="w-1/2">
              <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-6 max-w-[590px]">
                {capitalize(fondoData.name)}
              </h1>
              <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
                {fondoData.description}
              </p>
            </div>
            <div className="pb-8">
              <Link href="/nuestros-fondos">
                <Button variant="light">Volver a fondos</Button>
              </Link>
            </div>
          </div>

          <div className="relative z-0 relative bg-no-repeat bg-cover bg-bottom pb-20">
            <div className="img-fondo" />

            <div className="flex gap-6 pt-24 pb-12 z-10 relative">
              <div className="w-1/2 p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans bg-white">
                <h3 className="font-bold text-lg">Rendimiento</h3>
                {fondoData.performances.map((performance, i) => (
                  <div
                    className={`flex justify-between ${fondoData.performances.length !== i + 1 && 'pb-4 border-b'}`}
                    key={performance.id}
                  >
                    <span>{performance.name}</span>
                    <span className="font-bold">{performance.value}</span>
                  </div>
                ))}
                {fondoData.rentabilidad.length > 0 && (
                  <>
                    <h3 className="font-bold text-lg">Rentabilidad</h3>
                    {fondoData.rentabilidad.map((renta, i) => (
                      <div
                        className={`flex justify-between ${fondoData.rentabilidad.length !== i + 1 && 'pb-4 border-b'}`}
                        key={renta.id}
                      >
                        <span>{renta.name}</span>
                        <span className="font-bold">{renta.value}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="w-1/2 p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans bg-white justify-between">
                <div className="flex flex-col gap-6">
                  <h3 className="font-bold text-lg">Información</h3>
                  <div className="pb-4 border-b">
                    <span>
                      Información al{' '}
                      <b>{formatDate(fondoData.informationAt)}</b>
                    </span>
                  </div>

                  <div className="pb-12">
                    <span>
                      Patrimonio del Fondo <b>${fondoData.patrimonio}</b>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <a
                    className="bg-[#2098A1] flex items-center justify-center font-encode-sans font-medium px-[25px] py-[9px] rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] gap-x-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-primary-light text-white hover:shadow-xl focus:ring-primary"
                    href={
                      process.env.NEXT_PUBLIC_API_URL + fondoData.factSheet.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fact sheet
                  </a>
                  <Link href={`/nuestros-fondos/cuotaparte/${id}`}>
                    <button className="bg-[#2098A1] flex items-center justify-center font-encode-sans font-medium px-[25px] py-[9px] rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] gap-x-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-primary-light text-white hover:shadow-xl focus:ring-primary">
                      Valor cuotaparte
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex gap-6 p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans z-10 relative bg-white">
              <h3 className="font-bold text-lg">Tenencias</h3>
              <div className="flex flex-col py-6">
                {fondoData.holdings.map((holding, i) => (
                  <div key={holding.id} className="flex">
                    <div
                      className={`w-full rounded-xl flex items-center font-medium gap-16`}
                    >
                      <div className="w-1/3 flex justify-between py-2">
                        <span>{holding.name}</span>
                        <span className="font-bold">{holding.value} %</span>
                      </div>
                      <div className="w-2/3">
                        <div
                          className={`w-[${holding.value}%] rounded`}
                          style={{
                            backgroundColor: colors[i % colors.length],
                            width: `${holding.value}%`,
                          }}
                        >
                          <br />
                          {/* <span className="text-white">.</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-medium text-lg">
                {fondoData?.rendimiento_diario?.file?.url && (
                  <a
                    className="flex items-center gap-1"
                    href={
                      process.env.NEXT_PUBLIC_API_URL +
                      fondoData.rendimiento_diario.file.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaDownloadSolid />
                    <span className=" ">Rendimiento Diario</span>
                  </a>
                )}
                {fondoData?.carteraDetallada && (
                  <a
                    className="flex items-center gap-1"
                    href={fondoData.carteraDetallada}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaDownloadSolid />
                    <span className="">Cartera Detallada</span>
                  </a>
                )}
                {fondoData?.reglamento_de_gestion?.file?.url && (
                  <a
                    className="flex items-center gap-1"
                    href={
                      process.env.NEXT_PUBLIC_API_URL +
                      fondoData.reglamento_de_gestion.file.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaDownloadSolid />
                    <span className="">Reglamento De Gestión</span>
                  </a>
                )}
                {fondoData?.calificacion?.file?.url && (
                  <a
                    className="flex items-center gap-1"
                    href={
                      process.env.NEXT_PUBLIC_API_URL +
                      fondoData.calificacion.file.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaDownloadSolid />
                    <span className="">Calificaciones</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
