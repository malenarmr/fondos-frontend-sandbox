'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { FaXmark } from 'react-icons/fa6';
import Button from '../shared/Button';
import { Fondo } from '@/types/Fondo';
import Link from 'next/link';
import Accordion from './Accordion';
import { LiaDownloadSolid } from 'react-icons/lia';

interface TagObject {
  documentId: string;
  value: string;
  title?: string | undefined;
  our_founds: {
    id: number;
    documentId: string;
    description: string;
    name: string;
  }[];
}

interface Tag {
  caracteristicas: TagObject[];
  activos: TagObject[];
  inversores: TagObject[];
  moneda: TagObject[];
}

export default function FondosSection() {
  const [fondos, setFondos] = useState<Fondo[]>([]);
  const [filteredFondos, setFilteredFondos] = useState<Fondo[]>([]);
  const [categories, setCategories] = useState<Tag>({
    caracteristicas: [],
    activos: [],
    inversores: [],
    moneda: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag>({
    caracteristicas: [],
    activos: [],
    inversores: [],
    moneda: [],
  });
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchFiltros() {
      try {
        const resCaracteristicas =
          await provinciaApiClient.fondos.caracteristicasFound.getAll();
        const resTipoInveror =
          await provinciaApiClient.fondos.inversorProfile.getAll();
        const resTipoActivos =
          await provinciaApiClient.fondos.tiposActivos.getAll();

        setCategories((prev) => ({
          ...prev,
          caracteristicas: resCaracteristicas.data.data,
          activos: resTipoActivos.data.data,
          inversores: resTipoInveror.data,
        }));
      } catch {
        setError('Error al cargar preguntas fondos');
      } finally {
        setLoading(false);
      }
    }

    fetchFiltros();
  }, [provinciaApiClient]);

  useEffect(() => {
    async function fetchFondos() {
      try {
        const response = await provinciaApiClient.fondos.founds.getAll();

        const orderMap: Record<string, number> = {
          CONSERVADOR: 0,
          MODERADO: 1,
          AGRESIVO: 2,
        };
        const sortedFondos = [...response.data.data].sort((a, b) => {
          const profileA = a.inversor_profile_fondos?.[0]?.title || '';
          const profileB = b.inversor_profile_fondos?.[0]?.title || '';
          return (orderMap[profileA] ?? 99) - (orderMap[profileB] ?? 99);
        });
        const monedasUnicas = Array.from(
          new Set(sortedFondos.map((f) => f.moneda).filter(Boolean))
        ).map((moneda) => ({
          documentId: moneda,
          value: moneda,
          our_founds: sortedFondos
            .filter((f) => f.moneda === moneda)
            .map((f) => ({
              id: 0,
              documentId: f.documentId,
              description: '',
              name: f.name,
            })),
        }));

        setCategories((prev) => ({ ...prev, moneda: monedasUnicas }));
        setFondos(sortedFondos as Fondo[]);
        setFilteredFondos(sortedFondos as Fondo[]);
      } catch {
        setError('Error al cargar preguntas fondos');
      } finally {
        setLoading(false);
      }
    }

    fetchFondos();
  }, [categories, provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleFilterFondos = (tags: Tag) => {
    setIsLoadingFilters(true);

    setTimeout(() => {
      const hasNoFilters =
        tags.caracteristicas.length === 0 &&
        tags.activos.length === 0 &&
        tags.inversores.length === 0 &&
        tags.moneda.length === 0;

      if (hasNoFilters) {
        setFilteredFondos(fondos);
      } else {
        const fondosFromCaracteristicas = tags.caracteristicas.flatMap(
          (tag) =>
            categories.caracteristicas
              .find((c) => c.documentId === tag.documentId)
              ?.our_founds.map((f) => f.documentId) ?? []
        );

        const fondosFromActivos = tags.activos.flatMap(
          (tag) =>
            categories.activos
              .find((a) => a.documentId === tag.documentId)
              ?.our_founds.map((f) => f.documentId) ?? []
        );

        const fondosFromInversores = tags.inversores.flatMap(
          (tag) =>
            categories.inversores
              .find((i) => i.documentId === tag.documentId)
              ?.our_founds.map((f) => f.documentId) ?? []
        );

        const fondosFromMoneda = tags.moneda.flatMap(
          (tag) =>
            categories.moneda
              .find((m) => m.documentId === tag.documentId)
              ?.our_founds.map((f) => f.documentId) ?? []
        );

        const matchByCaracteristicas = new Set(fondosFromCaracteristicas);
        const matchByActivos = new Set(fondosFromActivos);
        const matchByInversores = new Set(fondosFromInversores);
        const matchByMoneda = new Set(fondosFromMoneda);

        const filtered = fondos.filter((fondo) => {
          const id = fondo.documentId;
          return (
            (tags.caracteristicas.length === 0 ||
              matchByCaracteristicas.has(id)) &&
            (tags.activos.length === 0 || matchByActivos.has(id)) &&
            (tags.inversores.length === 0 || matchByInversores.has(id)) &&
            (tags.moneda.length === 0 || matchByMoneda.has(id))
          );
        });

        setFilteredFondos(filtered);
      }

      setIsLoadingFilters(false);
    }, 300);
  };

  const addTag = (tag: TagObject, type: keyof Tag) => {
    const prevTags = [...selectedTags[type]];

    if (!prevTags.some((t) => t.documentId === tag.documentId)) {
      const updatedTags = {
        ...selectedTags,
        [type]: [...prevTags, tag],
      };
      setSelectedTags(updatedTags);
      handleFilterFondos(updatedTags);
    }
  };

  const deleteTag = (tag: TagObject, type: keyof Tag) => {
    const updatedTags = {
      ...selectedTags,
      [type]: selectedTags[type].filter((t) => t.documentId !== tag.documentId),
    };

    setSelectedTags(updatedTags);
    handleFilterFondos(updatedTags);
  };

  const deleteAll = () => {
    const emptyTags = {
      caracteristicas: [],
      activos: [],
      inversores: [],
      moneda: [],
    };
    setSelectedTags(emptyTags);
    handleFilterFondos(emptyTags);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      {/* desktop */}
      <div className="hidden md:flex flex-row items-stretch gap-4 lg:gap-8 justify-between">
        {' '}
        <div className="w-[280px] md:w-[230px] lg:w-[300px] xl:w-[380px] shrink-0 bg-primary py-8 px-6 lg:px-8 min-h-screen self-stretch">
          {' '}
          <div className="space-y-4">
            <Link
              className="flex items-center gap-1 mb-8 text-white border border-white w-fit p-2 rounded-tl-[6px] rounded-tr-[12px]
    rounded-br-[6px] rounded-bl-[12px]"
              href="/rendimiento"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LiaDownloadSolid />
              <span className=" ">Rendimiento Diario</span>
            </Link>
            <h3 className="text-xl font-bold font-encode-sans text-white">
              Filtros de la búsqueda
            </h3>
            {Object.entries(selectedTags).every(
              ([, tags]) => tags.length === 0
            ) ? (
              <div className="text-sm mt-4 text-white">
                Aún no tenés filtros seleccionados
              </div>
            ) : (
              Object.entries(selectedTags).map(([type, tags]) =>
                tags.map((tag: TagObject) => (
                  <div
                    key={tag.documentId}
                    className="cursor-pointer flex items-center bg-[#a3dbc7] rounded-full py-1 ps-2 pe-1 w-fit"
                    onClick={() => deleteTag(tag, type as keyof Tag)}
                  >
                    {tag.value
                      ? capitalize(tag.value)
                      : tag.title
                        ? capitalize(tag.title)
                        : ''}
                    <div className="bg-[#454B5433] p-1 rounded-full ms-1">
                      <FaXmark size={16} className="text-white" />
                    </div>
                  </div>
                ))
              )
            )}
          </div>
          <div className="space-y-4 flex flex-col">
            <h3 className="text-xl font-bold font-encode-sans text-white">
              Tipo de moneda
            </h3>
            {categories?.moneda?.map((tag) => (
              <div
                key={tag.documentId}
                className="cursor-pointer text-white"
                onClick={() => addTag(tag, 'moneda')}
              >
                <span>{capitalize(tag.value)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            <h3 className="text-xl font-bold font-encode-sans text-white">
              Característica del fondo
            </h3>
            {categories?.caracteristicas?.map((tag) => (
              <div
                key={tag.documentId}
                className="cursor-pointer text-white"
                onClick={() => addTag(tag, 'caracteristicas')}
              >
                <span>{capitalize(tag.value)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            <h3 className="text-xl font-bold font-encode-sans text-white">
              Tipo de inversor
            </h3>
            {categories?.inversores?.map((tag) => (
              <div
                key={tag.documentId}
                className="cursor-pointer text-white"
                onClick={() => addTag(tag, 'inversores')}
              >
                <span>{tag?.title && capitalize(tag?.title)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 flex flex-col">
            <h3 className="text-xl font-bold font-encode-sans text-white">
              Tipo de activos
            </h3>
            {categories?.activos?.map((tag) => (
              <div
                key={tag.documentId}
                className="cursor-pointer text-white"
                onClick={() => addTag(tag, 'activos')}
              >
                <span>{tag.value}</span>
              </div>
            ))}
          </div>
          <div>
            <button
              className="py-[9px] transition-colors duration-200 focus:outline-none focus:ring-0 text-white  focus:ring-primary w-fit font-bold"
              onClick={() => deleteAll()}
            >
              Ver todos los fondos
            </button>
          </div>
        </div>
        <div className="align-start text-primary w-3/5 md:w-3/4 md:pr-6 xl:w-4/5 lg:pr-8 xl:pr-[100px] py-2 lg:py-16 pr-xxl">
          <div className="flex flex-col gap-8 pb-4">
            <h1 className="font-encode-sans text-3xl lg:text-5xl text-primary-light font-black mb-4">
              Nuestros Fondoss
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {' '}
              {isLoadingFilters ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {filteredFondos.length > 0 ? (
                    filteredFondos.map((fondo, index) => (
                      <div
                        key={index}
                        className="rounded-tr-xl rounded-bl-xl rounded-tl rounded-br shadow-lg"
                      >
                        <div className="py-4 px-4 bg-primary-light text-white rounded-tr-xl rounded-tl">
                          <span className="font-encode-sans font-bold">
                            {fondo.name}
                          </span>
                        </div>
                        <div className="py-2 flex items-center border-b mx-4 text-secondary">
                          <div className="w-1/2 border-r">
                            <span>
                              Tipo de ahorro en{' '}
                              <b>
                                <span className="lowercase">
                                  {fondo.moneda}
                                </span>
                              </b>
                            </span>
                          </div>
                          <div className="w-1/2 flex justify-start pl-6 lg:pl-0 xl:pl-6 ">
                            <span
                              className={`flex px-6 py-2 ${fondo?.inversor_profile_fondos?.[0].title == 'AGRESIVO' ? 'bg-[#3C3C3B]' : fondo.inversor_profile_fondos?.[0].title == 'MODERADO' ? 'bg-[#929292]' : 'bg-[#B4B4B4]'} text-white font-bold rounded-xl capitalize`}
                            >
                              {capitalize(
                                fondo?.inversor_profile_fondos?.[0]?.title ?? ''
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="py-2 flex justify-between items-center border-b mx-4 text-secondary">
                          <div className="w-1/2 border-r">
                            <span>
                              Horizonte a <b>{fondo.horizonte}</b>
                            </span>
                          </div>
                          <div className="w-1/2 flex justify-start pl-6">
                            <span className="flex p-2">
                              {capitalize(
                                fondo?.caracteristicas_fondos?.[0]?.value ?? ''
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="py-2 flex justify-between items-center mx-4 text-secondary">
                          <div className="w-1/2 pt-2">
                            <span className="">
                              Variación diaria <b>{fondo.variacionDiaria}%</b>
                            </span>
                          </div>
                        </div>
                        <div className="py-4 flex justify-end items-center mx-4">
                          <Link href={`/nuestros-fondos/${fondo.documentId}`}>
                            <Button variant="secondary">Ver fondo</Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      className="font-encode-sans text-md  text-primary-light"
                      style={{ fontWeight: 400 }}
                    >
                      No encontramos resultados que coincidan
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex lg:hidden flex-col">
        <div className="text-center py-10">
          <h1 className="font-encode-sans text-3xl text-primary font-black">
            Nuestros Fondos
          </h1>
        </div>
        <div className="space-y-4 bg-[#a3dbc7] py-10 px-[60px]">
          <Link
            className="flex items-center gap-1 mb-8 text-primary border border-primary w-fit p-2 rounded-tl-[6px] rounded-tr-[12px]
    rounded-br-[6px] rounded-bl-[12px]"
            href="/rendimiento"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiaDownloadSolid />
            <span className=" ">Rendimiento Diario</span>
          </Link>
          <h3 className="text-xl font-black font-encode-sans text-primary">
            Filtros de la búsqueda
          </h3>

          {Object.values(selectedTags).flat().length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {Object.entries(selectedTags).map(([type, tags]) =>
                tags.map((tag: TagObject) => (
                  <div
                    key={`${type}-${tag.documentId}`}
                    className="cursor-pointer flex items-center bg-primary rounded-full py-1 ps-2 pe-1 w-fit text-white"
                    onClick={() => deleteTag(tag, type as keyof Tag)}
                  >
                    <span>
                      {tag.value
                        ? capitalize(tag.value)
                        : tag.title
                          ? capitalize(tag.title)
                          : ''}
                    </span>
                    <div className="bg-[#ffffff] p-1 rounded-full ms-1">
                      <FaXmark size={14} className="text-primary" />
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-sm mt-4">
              Aún no tenés filtros seleccionados
            </div>
          )}
        </div>

        <div className="space-y-8 bg-primary py-10 px-[60px] text-white">
          {/* Tipo de Moneda — mobile */}
          <Accordion title="Tipo de Moneda">
            <div className="flex flex-wrap gap-3">
              {categories.moneda.map((tag) => (
                <div
                  key={`moneda-${tag.documentId}`}
                  className="cursor-pointer bg-[#EBEBEB] py-1 px-3 rounded-full w-fit text-[#005A63]"
                  onClick={() => addTag(tag, 'moneda')}
                >
                  <span>{capitalize(tag.value)}</span>
                </div>
              ))}
            </div>
          </Accordion>
          {/* Características */}
          <Accordion title="Característica del fondo">
            <div className="flex flex-wrap gap-3">
              {categories.caracteristicas.map((tag) => (
                <div
                  key={`caracteristicas-${tag.documentId}`}
                  className="cursor-pointer bg-[#EBEBEB] py-1 px-3 rounded-full w-fit text-primary"
                  onClick={() => addTag(tag, 'caracteristicas')}
                >
                  <span>{capitalize(tag.value)}</span>
                </div>
              ))}
            </div>
          </Accordion>
          <hr />
          {/* Tipo de Inversor */}
          <Accordion title="Tipo de Inversor">
            <div className="flex flex-wrap gap-3">
              {categories.inversores.map((tag) => (
                <div
                  key={`inversores-${tag.documentId}`}
                  className="cursor-pointer bg-[#EBEBEB] py-1 px-3 rounded-full w-fit text-[#005A63]"
                  onClick={() =>
                    addTag(
                      {
                        documentId: tag.documentId,
                        value: tag.title ?? 'Inversor sin título',
                        our_founds: tag.our_founds,
                      },
                      'inversores'
                    )
                  }
                >
                  <span>{capitalize(tag.title ?? '')}</span>
                </div>
              ))}
            </div>
          </Accordion>
          <hr />
          {/* Tipo de Activos */}
          <Accordion title="Tipo de Activos">
            <div className="flex flex-wrap gap-3">
              {categories.activos.map((tag) => (
                <div
                  key={`activos-${tag.documentId}`}
                  className="cursor-pointer bg-[#EBEBEB] py-1 px-3 rounded-full w-fit text-[#005A63]"
                  onClick={() => addTag(tag, 'activos')}
                >
                  <span>{tag.value}</span>
                </div>
              ))}
            </div>
          </Accordion>
          <div>
            <button className="font-bold mt-6" onClick={() => deleteAll()}>
              Ver todos los fondos
            </button>
          </div>
        </div>

        {isLoadingFilters ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="px-[30px] py-[50px] grid gap-10">
            {filteredFondos.length > 0 ? (
              filteredFondos.map((fondo, index) => (
                <div
                  key={index}
                  className="rounded-tr-xl rounded-bl-xl rounded-tl rounded-br shadow-lg"
                >
                  <div className="py-2 px-4 bg-primary-light text-white rounded-tr-xl rounded-tl">
                    <span className="font-encode-sans font-bold">
                      {fondo.name}
                    </span>
                  </div>
                  <div className="py-2 flex items-center border-b text-secondary">
                    <div className="w-1/2 px-2 border-r">
                      <span>
                        Tipo de ahorro en{' '}
                        <b>
                          <span className="lowercase">{fondo.moneda}</span>
                        </b>
                      </span>
                    </div>
                    <div className="w-1/2 px-2 flex justify-center">
                      <span
                        className={`flex px-6 py-2 ${fondo?.inversor_profile_fondos?.[0].title == 'AGRESIVO' ? 'bg-[#3C3C3B]' : fondo?.inversor_profile_fondos?.[0].title == 'MODERADO' ? 'bg-[#929292]' : 'bg-[#B4B4B4]'} text-white font-bold rounded-xl capitalize`}
                      >
                        {capitalize(
                          fondo?.inversor_profile_fondos?.[0]?.title ?? ''
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="py-2 flex justify-between items-center border-b text-secondary">
                    <div className="w-1/2 px-2 border-r">
                      <span>
                        Horizonte a <b>{fondo.horizonte}</b>
                      </span>
                    </div>
                    <div className="w-1/2 px-2 flex justify-center">
                      <span className="flex">
                        {capitalize(
                          fondo?.caracteristicas_fondos?.[0]?.value ?? ''
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="py-2 flex justify-between items-center text-secondary">
                    <div className="w-1/2 px-2">
                      <span className="">
                        Variación diaria <b>{fondo.variacionDiaria} %</b>
                      </span>
                    </div>
                  </div>
                  <div className="pt-1 pb-4 px-2 flex justify-end items-center">
                    <Link href={`/nuestros-fondos/${fondo.documentId}`}>
                      <Button variant="secondary">Ver fondo</Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p
                className="font-encode-sans text-md  text-primary-light"
                style={{ fontWeight: 400 }}
              >
                No encontramos resultados que coincidan
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
