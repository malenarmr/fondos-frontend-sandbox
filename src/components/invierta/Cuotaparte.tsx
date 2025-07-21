'use-client';

import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { Fondo } from '@/types/Fondo';
import './Fondo.css';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

interface FondoProps {
  id: string;
}

interface Cuotaparte {
  clase_fondo: string;
  fecha: string;
  id: number;
  nombre_fondo: string;
  numero_fondo: number;
  valor_cuota_parte: number;
}

export default function CuotaparteDetails({ id }: FondoProps) {
  const [cuotaparte, setCuotaparte] = useState<Cuotaparte[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    pageCount: 1,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentClase, setCurrentClase] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorFiltro, setErrorFiltro] = useState('');
  const [fondoData, setFondoData] = useState<Fondo>();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const { provinciaApiClient } = useAppContext();

  //   obtener datos del fondo
  useEffect(() => {
    async function fetchFondo() {
      try {
        const response = await provinciaApiClient.fondos.founds.getByDocumentId(
          {
            foundDocumentId: id,
          }
        );

        setFondoData(response.data.data as Fondo);
        setCurrentClase(response.data.data.clase_fondo[0].clase);
      } catch {
        setError('Error al cargar fondo');
      } finally {
        setLoading(false);
      }
    }
    fetchFondo();
  }, [provinciaApiClient, id]);

  //   obtener cuotaparte segun clase
  useEffect(() => {
    if (fondoData && fondoData.numero_fondo && fondoData.clase_fondo) {
      async function fetchCuotaparte() {
        try {
          const res = await provinciaApiClient.fondos.cuotaParte.getAll({
            numero_fondo: fondoData?.numero_fondo,
            clase_fondo: currentClase,
          });
          setCuotaparte(res.data.data);
          setPagination(res.data.meta.pagination);
          setCurrentPage(1);
        } catch {
        } finally {
        }
      }

      fetchCuotaparte();
    }
  }, [provinciaApiClient, fondoData, currentClase]);

  // obetner cuotaparte al cambiar de pagina
  useEffect(() => {
    if (fondoData && fondoData.numero_fondo && fondoData.clase_fondo) {
      async function fetchCuotaparte() {
        try {
          if (fechaInicio && fechaFin) {
            const res = await provinciaApiClient.fondos.cuotaParte.getByRange({
              numero_fondo: fondoData?.numero_fondo,
              clase_fondo: currentClase,
              fecha_inicio: fechaInicio,
              fecha_fin: fechaFin,
              page: currentPage,
            });
            setCuotaparte(res.data.data);
          } else {
            const res = await provinciaApiClient.fondos.cuotaParte.getAll({
              numero_fondo: fondoData?.numero_fondo,
              clase_fondo: currentClase,
              page: currentPage,
            });
            setCuotaparte(res.data.data);
          }
        } catch {
        } finally {
        }
      }

      fetchCuotaparte();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinciaApiClient, currentPage]);

  const formatDate = (date: string) => {
    const arr = date.split('-');

    return arr[2] + '/' + arr[1] + '/' + arr[0];
  };

  const getVisiblePages = (
    currentPage: number,
    totalPages: number,
    maxVisible: number
  ) => {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleFiltrar = async () => {
    if (!fechaInicio || !fechaFin) {
      setErrorFiltro('Debés seleccionar ambas fechas');
      return;
    }

    const hoy = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
    if (fechaInicio > hoy) {
      setErrorFiltro('La fecha de inicio no puede ser posterior a hoy');
      return;
    }

    if (fechaFin < fechaInicio) {
      setErrorFiltro('La fecha de fin no puede ser anterior a la de inicio');
      return;
    }

    setErrorFiltro('');

    try {
      const res = await provinciaApiClient.fondos.cuotaParte.getByRange({
        numero_fondo: fondoData?.numero_fondo,
        clase_fondo: currentClase,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      });
      setCuotaparte(res.data.data);
      setPagination(res.data.meta.pagination);
      setCurrentPage(1);
    } catch {
      setErrorFiltro('Error al filtrar por fechas');
    } finally {
    }
  };

  return (
    <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
      {error && <p className="text-center text-red-500">{error}</p>}
      {fondoData && !loading ? (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-end px-[50px] xl:px-0">
            <div className="w-full lg:w-1/2">
              <h1 className="text-start lg:text-left font-encode-sans font-extrabold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-6 max-w-[590px]">
                Valor cuotaparte
                <br /> {fondoData.name}
              </h1>
              <p className="text-start lg:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 md:w-[600px] xl:mr-0">
                Provincia renta fija - Histórico de valores
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-start lg:justify-end pt-8 lg:pt-0">
              <Link href={`/nuestros-fondos/${id}`}>
                <Button variant="light">Volver al fondo</Button>
              </Link>
            </div>
          </div>

          <div className="relative z-0 relative bg-no-repeat bg-cover bg-bottom pb-20">
            <div className="img-fondo" />

            <div className="flex gap-6 pt-10 lg:pt-24 pb-12 z-10 relative px-[20px] lg:px-0">
              <div className="w-full p-8 lg:p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans bg-white">
                <h3 className="font-bold text-lg">Filtros por fecha</h3>
                <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-6 text-md">
                  <div className="w-full lg:w-3/4 flex flex-col lg:flex-row justify-between gap-4 lg:gap-2">
                    <div className="relative flex w-full">
                      <span className="absolute left-3 inset-y-0 flex items-center text-gray-500 select-none">
                        Fecha desde
                      </span>
                      <input
                        type="date"
                        className={`border border-[#929292] rounded w-full py-2 ps-32 pe-3 focus:outline-none max-h-[44px] bg-transparent`}
                        value={fechaInicio}
                        max={fechaFin || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFechaInicio(e.target.value)}
                      />
                    </div>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 py-2 text-gray-500 select-none">
                        Fecha hasta
                      </span>
                      <input
                        type="date"
                        value={fechaFin}
                        min={fechaInicio}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className={`border border-[#929292] rounded w-full py-2 ps-32 pe-3 focus:outline-none max-h-[44px] bg-transparent `}
                      />
                    </div>

                    <Button variant="light" onClick={() => handleFiltrar()}>
                      Filtrar
                    </Button>
                  </div>
                  <div className="w-full lg:w-1/4 flex flex-col lg:flex-row justify-end">
                    <Button variant="light">Exportar Excel</Button>
                  </div>
                </div>
                {errorFiltro && (
                  <p className="text-center text-red-500">{errorFiltro}</p>
                )}
              </div>
            </div>

            <div className="flex gap-6 px-[20px] lg:px-0">
              <div className="flex gap-6 p-8 lg:p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans z-10 relative bg-white w-full">
                <h3 className="font-bold text-lg">
                  Histórico valores por clase
                </h3>

                {/* clases */}
                <div
                  className={`bg-[#EBEBEB] p-2 grid gap-2 grid-cols-${fondoData.clase_fondo.length}`}
                >
                  {fondoData.clase_fondo.map((clase, i) => {
                    return (
                      <button
                        key={'clase-' + i}
                        className={`w-full p-2 text-center font-regular transition-200 ${clase.clase === currentClase && 'bg-white font-bold'} cursor-pointer`}
                        onClick={() => {
                          setCurrentClase(clase.clase);
                          setFechaInicio('');
                          setFechaFin('');
                        }}
                      >
                        {'Clase ' + clase.clase}
                      </button>
                    );
                  })}
                </div>

                {/* tabla */}
                <div className="py-6 w-full">
                  <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                      <tr>
                        <th className="w-[20%] text-start">Fecha</th>
                        <th className="w-[20%] text-center hidden lg:table-cell">
                          Número fondo
                        </th>
                        <th className="w-[35%] text-center hidden lg:table-cell">
                          Nombre fondo
                        </th>
                        <th className="w-[25%] text-end">Valor Cuota Parte</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {cuotaparte.map((cuota) => {
                        return (
                          <tr className="" key={cuota.id}>
                            <td className="w-[20%] text-start">
                              {formatDate(cuota.fecha)}
                            </td>
                            <td className="w-[20%] hidden lg:table-cell text-center">
                              {cuota.numero_fondo}
                            </td>
                            <td className="w-[35%] hidden lg:table-cell text-center">
                              {cuota.nombre_fondo}
                            </td>
                            <td className="w-[25%] text-end font-bold">
                              {cuota.valor_cuota_parte}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* paginado */}
                <div className="flex justify-center items-center gap-2 mt-6 font-encode-sans">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>

                  <div className="gap-2 hidden lg:flex">
                    {getVisiblePages(currentPage, pagination.pageCount, 5).map(
                      (page) => (
                        <Button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${
                            page === currentPage
                              ? 'bg-primary text-white'
                              : 'bg-white'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <div className="flex gap-2 lg:hidden">
                    {getVisiblePages(currentPage, pagination.pageCount, 2).map(
                      (page) => (
                        <Button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${
                            page === currentPage
                              ? 'bg-primary text-white'
                              : 'bg-white'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(p + 1, pagination.pageCount)
                      )
                    }
                    disabled={currentPage === pagination.pageCount}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                  >
                    Siguiente
                  </Button>
                </div>
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
