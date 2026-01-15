// pages/noticias/[id].tsx
'use client';

import NewsCard from '@/components/noticias/NewsCard';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import Spinner from '@/components/shared/Spinner';
import {
  NoticiaBackend,
  fetchNoticiaById,
  fetchNoticias,
} from '@/services/noticiasService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export default function NewsDetailPage() {
  const router = useRouter();

  // ── Estados para el detalle de la noticia ──
  const [loading, setLoading] = useState(true);
  const [noticia, setNoticia] = useState<NoticiaBackend | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Estados para las noticias relacionadas ──
  const [relatedNews, setRelatedNews] = useState<NoticiaBackend[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const mdSchema = {
    ...defaultSchema,
    tagNames: [
      ...(defaultSchema.tagNames || []),
      'p',
      'br',
      'hr',
      'blockquote',

      // texto
      'strong',
      'em',
      'del',

      // listas
      'ul',
      'ol',
      'li',

      // headings
      'h1',
      'h2',
      'h3',
      'h4',

      // tablas
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',

      // media
      'img',

      // enlaces
      'a',
    ],
    attributes: {
      ...(defaultSchema.attributes || {}),
      a: [
        ...(defaultSchema.attributes?.a || []),
        'href',
        'title',
        'target',
        'rel',
      ],

      img: [
        ...(defaultSchema.attributes?.img || []),
        'src',
        'alt',
        'title',
        'width',
        'height',
      ],
      iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'loading'],
    },
  };

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
      <div className="text-center py-8 flex justify-center">
        <Spinner />
      </div>
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
      <div className="relative py-8 md:py-16 font-encode-sans rounded-b-[40px]">
        {/* FONDO INSTITUCIONAL */}
        <div
          className="absolute inset-0 w-full h-full z-0 rounded-b-[40px]"
          style={{
            backgroundImage: "url('/institucional/bg-institucional.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'botto center',
            opacity: 1,
            borderBottomLeftRadius: '40px',
            borderBottomRightRadius: '40px',
            minHeight: '0%',
          }}
          aria-hidden="true"
        />
        {/* CONTENIDO */}
        <div className="container mx-auto px-4 relative z-10">
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
                {noticia.category_blog_fondos?.name && (
                  <span className="bg-[#00C3B3] text-white px-4 py-2 rounded-lg text-sm font-encode-sans">
                    {noticia.category_blog_fondos.name}
                  </span>
                )}
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
                  Por: {noticia.author ?? 'Provincia Bursátil'} /{' '}
                  {formattedDate}
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
                  {noticia.content && (
                    <div className="prose max-w-none text-gray-700 font-encode-sans">
                      <article className="prose prose-neutral max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[
                            rehypeRaw,
                            [rehypeSanitize, mdSchema],
                          ]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-2xl font-bold mt-4 mb-0">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xl font-semibold mt-4 mb-0">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-lg font-semibold mt-4 mb-0">
                                {children}
                              </h3>
                            ),
                            blockquote: ({ children, ...props }) => (
                              <blockquote
                                {...props}
                                className="border-l-4 border-primary/40 pl-4 py-2 my-6 bg-primary/5 rounded"
                              >
                                {children}
                              </blockquote>
                            ),
                            p: ({ children }) => (
                              <p className="my-4 leading-relaxed">{children}</p>
                            ),
                            hr: () => <hr className="my-10 border-gray-200" />,
                            img: (props) => (
                              <img
                                {...props}
                                alt={props.alt || ''}
                                className="rounded-lg mx-auto my-6 max-w-full h-auto"
                                loading="lazy"
                              />
                            ),
                            a: (props) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-primary"
                              />
                            ),
                            table: (props) => (
                              <table
                                className="min-w-full divide-y divide-gray-200 mb-6"
                                {...props}
                              />
                            ),
                            th: (props) => (
                              <th
                                className="bg-gray-100 px-3 py-2 font-semibold text-left"
                                {...props}
                              />
                            ),
                            td: (props) => (
                              <td className="border px-3 py-2" {...props} />
                            ),
                          }}
                        >
                          {noticia.content}
                        </ReactMarkdown>
                      </article>
                    </div>
                  )}
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

                  const bg =
                    n.category_blog_fondos?.colors_fondo?.value ?? '#009B67';
                  const category = (
                    n.category_blog_fondos?.name ?? 'Sin categoría'
                  ).toUpperCase();

                  return (
                    <NewsCard
                      key={n.id}
                      id={n.id}
                      category={category}
                      title={n.title}
                      author={n.author ?? 'Provincia Fondos'}
                      description={desc}
                      date={fechaN}
                      bgColor={bg}
                      textColor="#3C3C3B"
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

      <Footer />
    </main>
  );
}
