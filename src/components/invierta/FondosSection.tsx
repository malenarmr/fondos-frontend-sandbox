'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { FaXmark } from 'react-icons/fa6';
import Button from '../shared/Button';
import FondoDetails from './Fondo';

interface Tag {
  id: string;
  categoryName: string;
}

interface Fondo {
  id: number;
  documentId: string;
  description: string;
  moneda: string;
  name: string;
  numero_fondo: number;
  patrimonio: string;
  horizonte: string;
  inversor_profile_fondos: {
    id: number;
    documentId: string;
    title: string;
  }[];
  caracteristicas_fondos: { value: string }[];
}

export default function FondosSection() {
  const [videos, setVideos] = useState<Fondo[]>([]);
  const [filteredFondos, setFilteredFondos] = useState<Fondo[]>([]);
  const [categories, setCategories] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [selectedFondo, setSelectedFondo] = useState<Fondo>();

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await provinciaApiClient.fondos.founds.getAll();
        const resCategories =
          await provinciaApiClient.bursatil.categoriesVideos.getAll();

        setVideos(response.data.data as Fondo[]);
        setFilteredFondos(response.data.data as Fondo[]);
        setCategories(resCategories.data.data);
      } catch {
        setError('Error al cargar preguntas videos tutoriales');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleFilterVideos = (selectedCategoryIds: string[]) => {
    setIsLoadingFilters(true);

    setTimeout(() => {
      if (selectedCategoryIds.length === 0) {
        setFilteredFondos(videos);
      } else {
        // const newFilteredVideos = videos.filter((video) =>
        //   video.categories_videos.some((cat) =>
        //     selectedCategoryIds.includes(cat.id)
        //   )
        // );
        // setFilteredFondos(newFilteredVideos);
      }

      setIsLoadingFilters(false); // 👈 Fin del loader
    }, 300); // Delay artificial para ver el loader
  };

  const addTag = (tag: Tag) => {
    const prevTags = [...selectedTags];
    const newTags = prevTags.some((t) => t.id === tag.id)
      ? prevTags
      : [...prevTags, tag];
    const selectedCategoryIds = newTags.map((cat) => cat.id);

    handleFilterVideos(selectedCategoryIds);
    setSelectedTags(newTags);
  };

  const deleteTag = (tag: Tag) => {
    const prevTags = [...selectedTags];
    const newTags = prevTags.filter((t) => t.id !== tag.id);
    const selectedCategoryIds = newTags.map((cat) => cat.id);

    handleFilterVideos(selectedCategoryIds);
    setSelectedTags(newTags);
  };

  const deleteAll = () => {
    handleFilterVideos([]);
    setSelectedTags([]);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      {selectedFondo ? (
        <FondoDetails
          fondoData={selectedFondo}
          setSelectedFondo={setSelectedFondo}
        />
      ) : (
        <>
          {/* desktop */}
          <div className="flex-col md:flex-row items-start space-x-4 xl:space-x-8 hidden md:flex justify-between items-stretch">
            <div className="flex-col items-center justify-center w-2/5 md:w-1/4 bg-primary py-2 lg:pt-16 lg:pb-[100%] md:w-3/4 pr-4 md:pl-6 lg:pl-8 xl:pl-[100px] space-y-5 lg:space-y-10 max-w-[412px]">
              <div className="space-y-4">
                <h3 className="text-xl font-black font-encode-sans text-white">
                  Filtros de la búsqueda
                </h3>
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="cursor-pointer flex items-center bg-[#a3dbc7] rounded-full py-1 ps-2 pe-1 w-fit"
                      onClick={() => deleteTag(tag)}
                    >
                      <span>{tag.categoryName}</span>
                      <div className="bg-[#454B5433] p-1 rounded-full ms-1">
                        <FaXmark size={16} className="text-white" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm mt-4 text-white">
                    Aún no tenes filtros seleccionados
                  </div>
                )}
              </div>

              <div className="space-y-4 flex flex-col">
                <h3 className="text-xl font-black font-encode-sans text-white">
                  Característica del fondo
                </h3>
                {categories?.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-pointer text-white"
                    onClick={() => addTag(tag)}
                  >
                    <span>{tag.categoryName}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 flex flex-col">
                <h3 className="text-xl font-black font-encode-sans text-white">
                  Tipo de inversor
                </h3>
                {categories?.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-pointer text-white"
                    onClick={() => addTag(tag)}
                  >
                    <span>{tag.categoryName}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 flex flex-col">
                <h3 className="text-xl font-black font-encode-sans text-white">
                  Tipo de activos
                </h3>
                {categories?.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-pointer text-white"
                    onClick={() => addTag(tag)}
                  >
                    <span>{tag.categoryName}</span>
                  </div>
                ))}
              </div>

              <div>
                <button
                  className="py-[9px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white  focus:ring-primary w-fit font-bold"
                  onClick={() => deleteAll()}
                >
                  Ver todos los fondos
                </button>
              </div>
            </div>
            <div className="align-start text-primary w-3/5 md:w-3/4 md:pr-6 lg:pr-8 xl:pr-[100px] py-2 lg:py-16">
              <div className="flex flex-col gap-8 pb-4">
                <h1 className="font-encode-sans text-3xl lg:text-5xl text-primary-light font-black">
                  Nuestros Fondos
                </h1>
                <p
                  className="font-encode-sans text-md lg:text-xl text-secondary"
                  style={{ fontWeight: 400 }}
                >
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
                <div className="grid md:grid-cols-2 gap-6 max-w-[1132px]">
                  {isLoadingFilters ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                      <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    filteredFondos.map((fondo, index) => (
                      <div
                        key={index}
                        className="rounded-tr-xl rounded-bl-xl rounded-tl rounded-br shadow-md"
                      >
                        <div className="py-2 px-4 bg-primary-light text-white rounded-tr-xl rounded-tl">
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
                          <div className="w-1/2 flex justify-start pl-6">
                            <span
                              className={`flex px-6 py-2 ${fondo.inversor_profile_fondos[0].title == 'AGRESIVO' ? 'bg-[#3C3C3B]' : 'bg-[#929292]'} text-white font-bold rounded-xl capitalize`}
                            >
                              {capitalize(
                                fondo.inversor_profile_fondos[0].title
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="py-2 flex justify-between items-center mx-4 text-secondary">
                          <div className="w-1/2 border-r">
                            <span>
                              Horizonte a <b>{fondo.horizonte}</b>
                            </span>
                          </div>
                          <div className="w-1/2 flex justify-start pl-6">
                            <span className="flex p-2">
                              {capitalize(
                                fondo.caracteristicas_fondos[0].value
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="py-4 flex justify-end items-center border-b mx-4">
                          <Button
                            variant="secondary"
                            onClick={() => setSelectedFondo(fondo)}
                          >
                            Ver fondo
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* mobile */}
          <div className="flex md:hidden flex-col">
            <div className="bg-light-aqua-green text-center py-16">
              <h1 className="font-encode-sans text-3xl text-primary font-black">
                Videos tutoriales
              </h1>
            </div>
            <div className="space-y-4 bg-[#EBEBEB] py-16 px-[60px]">
              <h3 className="text-xl font-black font-encode-sans text-primary">
                Filtros de la búsqueda
              </h3>
              {selectedTags.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  {selectedTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="cursor-pointer flex items-center bg-[#005A63] rounded-full py-1 ps-2 pe-1 w-fit text-white"
                      onClick={() => deleteTag(tag)}
                    >
                      <span>{tag.categoryName}</span>
                      <div className="bg-[#ffffff] p-1 rounded-full ms-1">
                        <FaXmark size={14} className="text-[#005A63]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm mt-4">
                  Aún no tenes filtros seleccionados
                </div>
              )}
            </div>
            <div className="space-y-4 bg-[#005A63] py-16 px-[60px] text-white">
              <h3 className="text-xl font-black font-encode-sans">Tags</h3>
              <hr />
              <div className="flex flex-wrap gap-3 mb-4">
                {categories?.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-pointer bg-[#EBEBEB] py-1 px-3 rounded-full w-fit text-[#005A63]"
                    onClick={() => addTag(tag)}
                  >
                    <span>{tag.categoryName}</span>
                  </div>
                ))}
              </div>
              <button className="font-bold" onClick={() => deleteAll()}>
                Ver todo
              </button>
            </div>
            {isLoadingFilters ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 px-6 py-6 items-center">
                {filteredFondos.map((video, index) => (
                  <div key={index} className="w-[100%]"></div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
