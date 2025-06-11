// pages/noticias/[id].tsx
'use client';

import NewsCard from '@/components/noticias/NewsCard';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import {
  NoticiaBackend,
  fetchNoticiaById,
  fetchNoticias,
} from '@/services/noticiasService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewsDetailPage() {
  const router = useRouter();

  // ── Estados para el detalle de la noticia ──
  const [loading, setLoading] = useState(true);
  const [noticia, setNoticia] = useState<NoticiaBackend | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Estados para las noticias relacionadas ──
  const [relatedNews, setRelatedNews] = useState<NoticiaBackend[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // ── 1) useEffect para cargar el detalle de la noticia ──
  useEffect(() => {
    // Extraemos el ID de window.location.pathname (ej: "/noticias/7")
    const pathParts = window.location.pathname.split('/');
    const idString = pathParts[pathParts.length - 1];
    const id = Number(idString);

    if (!id || isNaN(id)) {
      setError('ID de noticia inválido');
      setLoading(false);
      return;
    }

    async function loadDetalle() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNoticiaById(id);
        setNoticia(data);
      } catch (err: any) {
        console.error(err);
        setError('No se pudo cargar la noticia');
      } finally {
        setLoading(false);
      }
    }

    loadDetalle();
  }, []);

  // ── 2) useEffect para cargar noticias relacionadas ──
  // Solo se ejecuta cuando `noticia` deja de ser null
  useEffect(() => {
    if (!noticia) {
      // Si aún no tenemos la noticia, no arrancamos la carga de relacionadas
      return;
    }

    async function loadRelated() {
      setLoadingRelated(true);
      try {
        // Traemos, por ejemplo, las 6 noticias más recientes
        const resp = await fetchNoticias(0, 6);
        const all = resp.data;
        // Excluimos la actual
        const filtradas = all.filter((n) => n.id !== noticia?.id);
        // Tomamos las primeras 3 para mostrar
        setRelatedNews(filtradas.slice(0, 3));
      } catch (err) {
        console.error('Error cargando noticias relacionadas', err);
      } finally {
        setLoadingRelated(false);
      }
    }

    loadRelated();
  }, [noticia]);

  // ── 3) Manejamos los casos de loading / error antes de renderizar todo ──
  if (loading) {
    return (
      <div className="text-center py-8">Cargando detalle de noticia...</div>
    );
  }

  if (error || !noticia) {
    return (
      <div className="text-center text-red-500 py-8">
        {error ?? 'Noticia no encontrada'}
      </div>
    );
  }

  // ── 4) Formateamos los datos para renderizar ──
  // Extraemos la URL de la imagen. Ajustá esto si tu API devuelve la imagen en otra estructura.
  // Por ejemplo, si Strapi v4 devuelve image.data.attributes.url, acá deberías llamarlo así.
  const imageUrl = (noticia as any).image ? (noticia as any).image.url : null;

  // Formateamos la fecha
  const fechaObj = new Date(noticia.createdAt);
  const formattedDate = fechaObj.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // ── 5) Render final ──
  return (
    <main>
      <Navbar />

      {/* Banner de fondo de color */}
      <div className="bg-[#00C3B3] py-8 md:py-16 font-encode-sans rounded-b-[40px]">
        <div className="container mx-auto px-4">
          <div
            className="p-8 md:p-12 max-w-4xl mx-auto font-encode-sans bg-white rounded-lg shadow-lg"
            style={{
              borderRadius: '8px',
              background: 'var(--Blanco, #FFF)',
              boxShadow: '0px 4px 32px rgba(146,146,146,0.57)',
            }}
          >
            {/* Badge de categoría */}
            <div className="flex justify-end mb-6">
              <span className="bg-[#00C3B3] text-white px-4 py-2 rounded-lg text-sm font-encode-sans">
                {noticia.category_blog_fondos.name}
              </span>
            </div>

            {/* Imagen (si la hay) */}
            {imageUrl && (
              <div className="mb-6">
                <Image
                  src={imageUrl}
                  alt={noticia.title}
                  className="w-full h-auto object-cover rounded-md"
                  width={800}
                  height={450}
                />
              </div>
            )}

            {/* Información del autor y fecha */}
            <div className="mb-6">
              <p className="text-gray-600 font-encode-sans text-sm">
                Por: {noticia.author ?? 'Provincia Bursátil'} / {formattedDate}
              </p>
            </div>

            {/* Título */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-encode-sans mb-6">
              {noticia.title}
            </h1>

            {/* Síntesis (shortContent) */}
            {noticia.shortContent && (
              <p className="text-gray-700 font-encode-sans mb-8 text-lg leading-relaxed">
                {noticia.shortContent}
              </p>
            )}

            {/* Contenido principal (content) */}
            {noticia.content && (
              <div className="prose max-w-none text-gray-700 font-encode-sans">
                {noticia.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Botón “Ver todas” para volver al listado */}
            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                onClick={() => router.push('/noticias')}
              >
                Ver todas
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sección “Otros títulos que te pueden interesar” ── */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 font-encode-sans mb-12">
            Otros títulos que te pueden interesar
          </h2>

          {loadingRelated ? (
            <p className="text-center">Cargando noticias relacionadas...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedNews.length > 0 ? (
                relatedNews.map((n) => {
                  // Formateamos fecha y descripción para cada NewsCard
                  const fechaN = new Date(n.createdAt).toLocaleDateString(
                    'es-AR',
                    {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }
                  );
                  const desc =
                    n.shortContent || `${n.content.slice(0, 120)}...`;
                  const bg = n.category_blog_fondos.colors_fondo.value;
                  const textColor = '#3C3C3B';

                  return (
                    <NewsCard
                      key={n.id}
                      id={n.id}
                      category={n.category_blog_fondos.name.toUpperCase()}
                      title={n.title}
                      author={n.author ?? 'Provincia Bursátil'}
                      description={desc}
                      date={fechaN}
                      bgColor={bg}
                      textColor={textColor}
                    />
                  );
                })
              ) : (
                <p className="col-span-3 text-center text-gray-500">
                  No hay otras noticias disponibles.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── PromoSection de test de inversor ── */}
      <div
        className="py-20 px-6 grid gap-8 justify-center text-center text-white relative rounded-t-[40px]"
        style={{
          background: 'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
        }}
      >
        <h2 className="font-encode-sans font-black text-[25px] md:text-[45px]">
          ¿Querés saber <br />
          qué tipo de inversor sos?
        </h2>
        <p className="font-encode-sans text-[16px] md:text-xl mb-6">
          ¿Sos más conservador o te gusta asumir riesgos?
          <br /> Hacé nuestro test en minutos y encontrá la mejor estrategia de
          inversión para vos.
        </p>
        <Link href="/test-inversor">
          <Button style={{ width: 'fit-content', margin: '0 auto' }}>
            Hacé el test!
          </Button>
        </Link>
      </div>

      <Footer />
    </main>
  );
}
