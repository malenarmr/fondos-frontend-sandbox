'use client';

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../shared/Button';
import './Fondo.css';
import { LiaDownloadSolid } from 'react-icons/lia';
import remarkGfm from 'remark-gfm';

interface FondoProps {
  id: string;
}

export default function FondoDetails({ id }: FondoProps) {
  const [fondoData, setFondoData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  const colors = ['#009B67', '#2098A1', '#2F755E', '#A2DBC8'];
  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    async function fetchFondo() {
      try {
        const response = await provinciaApiClient.fondos.founds.getByDocumentId(
          {
            foundDocumentId: id,
          }
        );

        const data = response.data.data;
        setFondoData(data);
        setError('');
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar fondo');
      }
    }

    fetchFondo();
  }, [provinciaApiClient, id, isClient]);

  const capitalize = (str: string) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '-';
    try {
      const [year, month, day] = date.split('-');
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
      return `${parseInt(day)} de ${meses[parseInt(month) - 1]} de ${year}`;
    } catch {
      return date;
    }
  };

  // Durante SSR, renderizar placeholder
  if (!isClient) {
    return (
      <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // En cliente, mientras carga
  if (!fondoData && !error) {
    return (
      <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!fondoData) {
    return (
      <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
        <p className="text-center text-red-500">No se encontró el fondo</p>
      </div>
    );
  }

  // Filtrar elementos nulos o inválidos en los arrays
  const performances = (fondoData.performances || [])
    .filter((item: any) => item && typeof item === 'object')
    .filter((item: any) => item.name !== undefined || item.value !== undefined);

  const rentabilidad = (fondoData.rentabilidad || [])
    .filter((item: any) => item && typeof item === 'object')
    .filter((item: any) => item.name !== undefined || item.value !== undefined);

  const holdings = (fondoData.holdings || [])
    .filter((item: any) => item && typeof item === 'object')
    .filter((item: any) => item.name !== undefined || item.value !== undefined);

  // Construir URLs con validaciones
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const factSheetUrl = fondoData?.factSheet?.url
    ? apiUrl + fondoData.factSheet.url
    : null;

  const reglamentoUrl = fondoData?.reglamento_de_gestion?.file?.url
    ? apiUrl + fondoData.reglamento_de_gestion.file.url
    : null;

  const calificacionUrl = fondoData?.calificacion?.file?.url
    ? apiUrl + fondoData.calificacion.file.url
    : null;

  const rendimientoDiarioUrl = fondoData?.rendimiento_diario?.file?.url
    ? apiUrl + fondoData.rendimiento_diario.file.url
    : null;
  return (
    <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
      <div className="flex flex-col lg:flex-row justify-between items-end">
        <div className="w-full lg:w-1/2">
          <h1 className="text-start lg:text-left font-encode-sans font-extrabold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-6 max-w-[590px] px-[50px] lg:px-0 whitespace-nowrap">
            {capitalize(fondoData.name || '')}
          </h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="text-start lg:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 px-[50px] md:w-[600px] lg:px-0 xl:mr-0">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
            }}
          >
            {fondoData.description ?? ''}
          </ReactMarkdown>
          {/* <p className="text-start lg:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 px-[50px] md:w-[600px] lg:px-0 xl:mr-0">
            {fondoData.description || 'Sin descripción disponible'}
          </p> */}
        </div>
        <div className="pb-8 flex justify-start lg:justify-end w-full pt-8 lg:pt-0 px-[50px]">
          <Link href="/nuestros-fondos">
            <Button variant="light">Volver a fondos</Button>
          </Link>
        </div>
      </div>

      <div className="relative z-0 bg-no-repeat bg-cover bg-bottom pb-20">
        <div className="img-fondo" />

        <div className="flex gap-10 lg:gap-6 pt-10 lg:pt-24 pb-12 z-10 relative flex-col lg:flex-row px-[20px] lg:px-0">
          {/* Columna Rendimiento */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans bg-white">
            <h3 className="font-bold text-lg">Rendimiento</h3>
            {performances.length > 0 ? (
              performances.map((perf: any, i: number) => (
                <div
                  key={perf.id || i}
                  className={`flex justify-between ${i !== performances.length - 1 ? 'pb-4 border-b' : ''}`}
                >
                  <span>{perf.name || '-'}</span>
                  <span className="font-bold">{perf.value || '-'}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay datos de rendimiento</p>
            )}

            {rentabilidad.length > 0 && (
              <>
                <h3 className="font-bold text-lg">Rentabilidad</h3>
                {rentabilidad.map((renta: any, i: number) => (
                  <div
                    key={renta.id || i}
                    className={`flex justify-between ${i !== rentabilidad.length - 1 ? 'pb-4 border-b' : ''}`}
                  >
                    <span>{renta.name || '-'}</span>
                    <span className="font-bold">{renta.value || '-'}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Columna Información */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans bg-white justify-between">
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg">Información</h3>
              <div className="pb-4 border-b">
                <span>
                  Información al <b>{formatDate(fondoData.informationAt)}</b>
                </span>
              </div>
              <div className="pb-6 lg:pb-12">
                <span>
                  Patrimonio del Fondo{' '}
                  <b>
                    {fondoData.moneda?.toLowerCase() === 'usd'
                      ? `U$D ${fondoData.patrimonio || '0'}`
                      : `$ ${fondoData.patrimonio || '0'}`}
                  </b>
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              {factSheetUrl && (
                <a
                  href={factSheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2098A1] flex items-center justify-center font-encode-sans font-medium px-[12px] py-[7px] lg:px-[25px] lg:py-[9px] rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] gap-x-[10px] text-white hover:shadow-xl"
                >
                  Fact sheet
                </a>
              )}
              <Link href={`/nuestros-fondos/cuotaparte/${id}`}>
                <button className="bg-[#2098A1] flex items-center justify-center font-encode-sans font-medium px-[12px] py-[7px] lg:px-[25px] lg:py-[9px] rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] gap-x-[10px] text-white hover:shadow-xl">
                  Valor cuotaparte
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tenencias */}
        <div className="p-8 lg:p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col font-encode-sans z-10 relative bg-white mx-[20px] lg:mx-0">
          <h3 className="font-bold text-lg mb-6">Tenencias</h3>
          <div className="flex flex-col pt-6 lg:py-6">
            {holdings.length > 0 ? (
              holdings.map((holding: any, i: number) => (
                <div key={holding.id || i} className="flex mb-8 lg:mb-6">
                  <div className="w-full rounded-xl flex flex-col lg:flex-row items-center font-medium lg:gap-16">
                    <div className="w-full lg:w-1/3 flex justify-between py-2">
                      <span>{holding.name || '-'}</span>
                      <span className="font-bold">{holding.value || 0} %</span>
                    </div>
                    <div className="w-full lg:w-2/3">
                      <div
                        className="rounded h-2"
                        style={{
                          backgroundColor: colors[i % colors.length],
                          width: `${Math.min(holding.value || 0, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No hay tenencias disponibles
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row justify-between font-medium text-lg gap-6 lg:gap-0 mt-6 pt-6 border-t">
            {rendimientoDiarioUrl && (
              <a
                href={rendimientoDiarioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <LiaDownloadSolid />
                <span>Rendimiento Diario</span>
              </a>
            )}
            {reglamentoUrl && (
              <a
                href={reglamentoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <LiaDownloadSolid />
                <span>Reglamento De Gestión</span>
              </a>
            )}
            {calificacionUrl && (
              <a
                href={calificacionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <LiaDownloadSolid />
                <span>Calificaciones</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
