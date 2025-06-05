'use client';

import NewsFilters from '@/components/noticias/NewsFilters';
import NewsGrid from '@/components/noticias/NewsGrid';
import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import PromoSection from '@/components/shared/PromoSection';
import { NoticiaBackend, fetchNoticias } from '@/services/noticiasService';
import { useEffect, useMemo, useState } from 'react';

export default function NoticiasPage() {
  // 1) Estado para todas las noticias
  const [allNews, setAllNews] = useState<NoticiaBackend[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState<string | null>(null);

  // 2) Estado para los filtros actuales seleccionados
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    year: '',
    theme: '',
  });

  // 3) Cargar todas las noticias una vez (o cuando hagan falta)
  useEffect(() => {
    async function load() {
      setLoadingNews(true);
      setErrorNews(null);
      try {
        const resp = await fetchNoticias(0, 1000);
        setAllNews(resp.data);
      } catch (err: any) {
        console.error(err);
        setErrorNews('No se pudieron cargar las noticias');
      } finally {
        setLoadingNews(false);
      }
    }
    load();
  }, []);

  // 4) A partir de allNews, generás tres listas únicas (useMemo antes de cualquier retorno)
  const categories = useMemo(() => {
    const setCat = new Set<string>();
    allNews.forEach((n) => {
      if (n.category_blog_bursatil?.name) {
        setCat.add(n.category_blog_bursatil.name);
      }
    });
    return Array.from(setCat).sort();
  }, [allNews]);

  const years = useMemo(() => {
    const setYear = new Set<string>();
    allNews.forEach((n) => {
      const y = new Date(n.createdAt).getFullYear().toString();
      setYear.add(y);
    });
    return Array.from(setYear).sort((a, b) => parseInt(b) - parseInt(a));
  }, [allNews]);

  const themes = useMemo(() => {
    const setTheme = new Set<string>();
    allNews.forEach((n) => {
      n.topic_blog_bursatils.forEach((t) => {
        if (t.topic) {
          setTheme.add(t.topic);
        }
      });
    });
    return Array.from(setTheme).sort();
  }, [allNews]);

  // 5) Handler que recibirán los filtros actualizados desde NewsFilters
  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // 6) Ahora todos los hooks están definidos arriba. Podemos retornar mensajes de error/carga:
  if (errorNews) {
    return <div className="text-red-500 text-center py-8">{errorNews}</div>;
  }

  if (loadingNews) {
    return <div className="text-center py-8">Cargando noticias...</div>;
  }

  // 7) Cuando ya no haya error ni loading, renderizamos el contenido normal:
  const heroData = {
    title: 'Noticias',
    description:
      'En esta sección vas a poder encontrar distintas noticias, informes de cierre de mercado y demás artículos.',
  };

  return (
    <main>
      <Navbar />
      <div className="text-center lg:text-left">
        <HeroSectionGenerico
          title={heroData.title}
          description={heroData.description}
          bgColor="bg-light-aqua-green"
        />

        {/* PASAMOS LAS TRES LISTAS DINÁMICAS */}
        <NewsFilters
          categories={categories}
          years={years}
          themes={themes}
          onFilter={handleFilter}
        />

        {/* Ahora sí, NewsGrid recibe allNews + filters */}
        <NewsGrid allNews={allNews} filters={filters} />

        <PromoSection
          title="¿Querés invertir en dólar MEP?"
          description="Operá desde Invierta, descubrí nuevas oportunidades y gestioná tu dinero de manera simple, rápida y segura."
          appStoreUrl="https://apps.apple.com/us/app/invierta/id6448729005"
          playStoreUrl="https://play.google.com/store/apps/details?id=io.btrader.prbu&hl"
          wrapperClassName="py-20 px-6 grid gap-8 justify-center text-center text-white relative rounded-t-[40px]"
          wrapperStyle={{
            background:
              'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
          }}
          buttonWrapperClassName="text-primary"
        />

        <Footer />
      </div>
    </main>
  );
}
