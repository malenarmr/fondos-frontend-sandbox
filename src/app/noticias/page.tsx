'use client';

import NewsFilters from '@/components/noticias/NewsFilters';
import NewsGrid from '@/components/noticias/NewsGrid';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import { NoticiaBackend, fetchNoticias } from '@/services/noticiasService';
import { useEffect, useMemo, useState } from 'react';

export default function NoticiasPage() {
  // 1) Estado para todas las noticias
  const [allNews, setAllNews] = useState<NoticiaBackend[]>([]);
  const [errorNews, setErrorNews] = useState<string | null>(null);

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
      link: '/simulador',
      description: (
        <p
          className="font-encode-sans text-lg mb-8 leading-5"
          style={{ color: '#FFFFFF' }}
        >
          Enterate de cómo operaron los fondos en los últimos períodos. Podés
          compararlos y analizar cómo rindieron para tomar las mejores
          decisiones.
        </p>
      ),
    },
    {
      title: '¿Querés saber qué tipo de inversor sos?',
      bgColor: '#2098A1',
      textColor: '#FFFFFF',
      textButton: 'Hacé el test',
      borderRadius: '0 50px 0 0',
      link: '/test-inversor',
      description: (
        <p className="font-encode-sans text-lg mb-8 leading-5">
          ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro test en
          minutos y encontrá la mejor estrategia de inversión para vos.
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
    title: 'Informes',
    description:
      'Indagá sobre cotización de activos, cierres y análisis de mercados. ',
  };

  return (
    <main>
      <Navbar />
      <div className="pt-6 px-4 md:px-[100px] xl:px-[145px] padding-xxl">
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
    </main>
  );
}
