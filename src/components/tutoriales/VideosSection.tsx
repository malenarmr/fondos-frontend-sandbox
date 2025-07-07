'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { FaXmark } from 'react-icons/fa6';

interface Tag {
  id: string;
  categoryName: string;
}

interface Video {
  Name: string;
  category: string;
  url: string;
  categories_videos: { categoryName: string; id: string }[];
}

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await provinciaApiClient.fondos.videoTutorial.getAll();
        const resCategories =
          await provinciaApiClient.bursatil.categoriesVideos.getAll();

        setVideos(response.data.data as Video[]);
        setFilteredVideos(response.data.data as Video[]);
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
        setFilteredVideos(videos);
      } else {
        const newFilteredVideos = videos.filter((video) =>
          video.categories_videos.some((cat) =>
            selectedCategoryIds.includes(cat.id)
          )
        );

        setFilteredVideos(newFilteredVideos);
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

  const extractYouTubeId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
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
              Tags
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
              Ver todo
            </button>
          </div>
        </div>
        <div className="align-start text-primary w-3/5 md:w-3/4 md:pr-6 lg:pr-8 xl:pr-[100px] py-2 lg:py-16 pl-12">
          <div className="flex flex-col gap-8 pb-4 max-w-[1132px]">
            <h1 className="font-encode-sans text-3xl lg:text-5xl text-primary-light font-black">
              Videos tutoriales
            </h1>
            <p
              className="font-encode-sans text-md lg:text-xl text-secondary"
              style={{ fontWeight: 400 }}
            >
              Con nuestros videos tutoriales vas a poder conocer paso a paso
              <br className="hidden lg:block" />
              cómo operar. Usá los instructivos para saldar dudas.
            </p>

            {isLoadingFilters ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              filteredVideos.map((video, index) => (
                <div key={index} className="relative">
                  <div className="md:w-[436px] md:h-[325px] lg:w-[696px] lg:h-[475px] xl:w-[846px] xl:h-[475px]">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(video.url)}?rel=0&modestbranding=1&showinfo=0`}
                      title={video.Name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute bottom-16 left-6 text-white">
                    {/* <div className="flex gap-4">
                  {video.categories_videos.map((category, i) => (
                    <span key={i} className="text-lg">
                      # {category.categoryName}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl font-medium">{video.Name}</h4> */}
                  </div>
                </div>
              ))
            )}
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
            {filteredVideos.map((video, index) => (
              <div key={index} className="w-[100%]">
                <iframe
                  width="100%"
                  height="213px"
                  src={`https://www.youtube.com/embed/${extractYouTubeId(video.url)}?rel=0&modestbranding=1&showinfo=0`}
                  title={video.Name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
