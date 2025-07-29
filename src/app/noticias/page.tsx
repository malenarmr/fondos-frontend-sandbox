'use client';

import NewsFilters from '@/components/noticias/NewsFilters';
import NewsGrid from '@/components/noticias/NewsGrid';
import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import { NoticiaBackend, fetchNoticias } from '@/services/noticiasService';
import { useEffect, useMemo, useState } from 'react';

export default function NoticiasPage() {
  // 1) Estado para todas las noticias
  const [allNews, setAllNews] = useState<NoticiaBackend[]>([]);
  const [errorNews, setErrorNews] = useState<string | null>(null);
  const APP_STORE_LINK = 'https://apps.apple.com/us/app/invierta/id6448729005';

  // 2) Estado para los filtros actuales seleccionados
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    year: '',
    theme: '',
  });
  const items = [
    {
      title: 'Proyectá con el simulador de rendimientos',
      bgColor: '#009B67',
      textColor: '#FFFFFF',
      textButton: 'Ir al simulador',
      borderRadius: '50px 0 0 0',
      link: APP_STORE_LINK,
      description: (
        <p
          className="font-encode-sans text-lg mb-8 leading-5"
          style={{ color: '#FFFFFF' }}
        >
          Enterate de cómo operaron los fondos en los últimos períodos. Podés
          compararlos y analizar cómo rindieron para tomar las mejores
          decisiones
        </p>
      ),
    },
    {
      title: 'Conocé más sobre cómo invertir con videos tutoriales',
      bgColor: '#EBEBEB',
      textColor: '#3C3C3B',
      textButton: 'Ver todos los videos',
      borderRadius: '0 50px 0 0',
      popup: true,
      description: (
        <p className="font-encode-sans text-lg mb-8 leading-5">
          Recibí nuestra información
          <br />y enterate de las últimas novedades
        </p>
      ),
    },
  ];
  // 3) Cargar todas las noticias una vez (o cuando hagan falta)
  useEffect(() => {
    async function load() {
      setErrorNews(null);
      try {
        const resp = await fetchNoticias(0, 1000);
        setAllNews(resp.data);
      } catch (err: any) {
        console.error(err);
        setErrorNews('No se pudieron cargar las noticias');
      } finally {
      }
    }
    load();
  }, []);

  // 4) A partir de allNews, generás tres listas únicas (useMemo antes de cualquier retorno)
  const categories = useMemo(() => {
    const setCat = new Set<string>();
    allNews.forEach((n) => {
      if (n.category_blog_fondos?.name) {
        setCat.add(n.category_blog_fondos.name);
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
      n.topic_blog_fondos.forEach((t) => {
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

  // 7) Cuando ya no haya error ni loading, renderizamos el contenido normal:
  const heroData = {
    title: 'Noticias',
    description:
      'No dejes de informarte, indagá sobre cotización de activos, informes de cierre de mercado y demás articulos. ',
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 xl:px-36 max-w-6xl">
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
      </div>
      <PreFooterSection items={items} />

      <Footer />
    </main>
  );
}
