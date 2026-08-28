'use client';

import { Videos } from '@/types/DinamicLanding';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  videos: Videos[];
  loading: boolean;
  error: string | null;
}

export default function VideosSection({ videos, loading, error }: Props) {
  const [current, setCurrent] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const next = () => setCurrent((prev) => (prev + 1) % videos.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);

  const extractYouTubeId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const handleMouseUp = () => {
    isDown.current = false;
  };
  const handleMouseLeave = () => {
    isDown.current = false;
  };

  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* desktop */}
        <div
          ref={scrollRef}
          className="flex-row space-x-8 hidden md:flex w-full mb-8 pl-24 xl:pl-32 flex-nowrap cursor-grab active:cursor-grabbing overflow-auto scrollbar-hide relative"
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {videos.map((video) => {
            const thumb = extractYouTubeId(video.url);
            return (
              <div key={video.url} className="flex flex-col">
                <div
                  // key único
                  className="text-white p-5 h-[314px] w-1/3 min-w-[500px] flex items-start flex-col justify-end gap-2 shadow-xl text-start"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${thumb}/hqdefault.jpg)`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    backgroundBlendMode: 'color',
                  }}
                ></div>
                <h4 className="text-xl font-medium pt-4 pb-2">{video.Name}</h4>
                <div className="flex gap-4 text-primary-light">
                  {video.categories_video_fondos?.map((cat) => (
                    <span
                      className="border w-fit py-1 px-4 rounded-full border-primary-light"
                      key={cat.categoryName}
                    >
                      # {cat.categoryName}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-300 to-transparent pointer-events-none z-10" />
      </div>

      {/* mobile */}
      <div className="flex-row space-x-1 flex md:hidden w-full mb-8">
        <button onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={30} />
        </button>
        <div className="w-full">
          <div
            key={current}
            className="text-white p-5 h-48 w-full flex items-start flex-col justify-end text-start"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${extractYouTubeId(videos[current].url)}/hqdefault.jpg)`,
              backgroundPosition: 'center center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backgroundBlendMode: 'color',
            }}
          ></div>
          <div className="flex gap-1 items-start flex-wrap">
            <h4 className="text-lg font-medium pt-4 pb-2">
              {videos[current].Name}
            </h4>
            {videos[current].categories_video_fondos?.map((category) => (
              <span
                className="border w-fit py-1 px-4 rounded-full border-primary-light text-sm text-primary-light"
                key={category.categoryName}
              >
                # {category.categoryName}
              </span>
            ))}
          </div>
        </div>
        <button onClick={next} aria-label="Next slide">
          <ChevronRight size={30} />
        </button>
      </div>
    </>
  );
}
