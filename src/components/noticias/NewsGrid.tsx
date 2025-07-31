'use client';

import { NoticiaBackend, fetchNoticias } from '@/services/noticiasService';
// ──> eliminamos la importación de dayjs
// import dayjs from 'dayjs';
import { getNewsCardColors } from '@/helpers/colors';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import NewsCard from './NewsCard';

interface NewsGridProps {
  allNews: NoticiaBackend[];
  filters: {
    search: string;
    category: string;
    year: string;
    theme: string;
  };
}

export default function NewsGrid({ filters }: NewsGridProps) {
  const [allNews, setAllNews] = useState<NoticiaBackend[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNoticias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetchNoticias(0, 1000);
      setAllNews(resp.data);
    } catch (err: any) {
      console.error(err);
      setError('Error al cargar noticias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNoticias();
  }, [loadNoticias]);

  const filteredNews = allNews.filter((n) => {
    const matchesSearch =
      !filters.search ||
      n.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      n.content.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category ||
      n.category_blog_fondos.name
        .toLowerCase()
        .includes(filters.category.toLowerCase());

    // ──> obtenemos el año nativo
    const yearFromDate = new Date(n.createdAt).getFullYear().toString();
    const matchesYear = !filters.year || yearFromDate === filters.year;

    const matchesTheme =
      !filters.theme ||
      n.topic_blog_fondos.some((t) =>
        t.topic.toLowerCase().includes(filters.theme.toLowerCase())
      );

    return matchesSearch && matchesCategory && matchesYear && matchesTheme;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="bg-white py-12 px-6 text-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-12 px-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.slice(0, visibleCount).map((n) => {
            const fechaObj = new Date(n.createdAt);
            const formattedDate = fechaObj.toLocaleDateString('es-AR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });

            // SAFE ACCESS al color
            const rawBg = n.category_blog_fondos.colors_fondo?.value;
            const { bgColor, textColor } = getNewsCardColors(rawBg);

            return (
              <NewsCard
                key={n.id}
                id={n.id}
                category={n.category_blog_fondos.name?.toUpperCase() ?? ''}
                title={n.title}
                author={n.author ?? 'Provincia Bursátil'}
                description={n.shortContent || n.content.slice(0, 120) + '...'}
                date={formattedDate}
                bgColor={bgColor}
                textColor={textColor}
              />
            );
          })}
        </div>

        {visibleCount < filteredNews.length && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 border-2 border-[#008996] text-[#008996] rounded-lg font-encode-sans font-medium hover:bg-[#008996] hover:text-white transition-colors"
            >
              Cargar más
            </button>
          </div>
        )}

        {filteredNews.length === 0 && !loading && (
          <p className="text-center text-gray-500">
            No se encontraron noticias con esos filtros.
          </p>
        )}
      </div>
    </div>
  );
}
