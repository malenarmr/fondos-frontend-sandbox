'use client';
import { Product, getProducts } from '@/services/productsService';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import MobileProductCard from './MobileProductCard';
import ProductCard from './ProductCard';

// Constantes actualizadas
const GAP = 24; // Cambiado a 24px como solicitado

const cardColors = [
  { bg: '#008996', text: '#FFFFFF' },
  { bg: '#00C3B3', text: '#FFFFFF' },
  { bg: '#00E89A', text: '#3C3C3B' },
  { bg: '#005A63', text: '#FFFFFF' },
  { bg: '#E6F9F0', text: '#3C3C3B' },
];

interface ProductsSectionProps {
  children: React.ReactNode;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const bottomScrollRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<number | null>(null);
  const [cardWidth, setCardWidth] = useState(360); // Ancho inicial de la card

  // Calcular el ancho de las cards basado en el ancho de la pantalla
  useEffect(() => {
    const calculateCardWidth = () => {
      // Para pantallas pequeñas, calculamos el ancho de las cards
      // para que siempre quepan 4 cards con un gap de 24px
      const containerWidth = window.innerWidth - 48; // 24px de padding a cada lado
      const totalGapWidth = GAP * 3; // 3 gaps para 4 cards
      const newCardWidth = Math.max((containerWidth - totalGapWidth) / 4, 200); // Mínimo 200px
      setCardWidth(newCardWidth);
    };

    calculateCardWidth();
    window.addEventListener('resize', calculateCardWidth);
    return () => window.removeEventListener('resize', calculateCardWidth);
  }, []);

  // Fetch de productos
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  // Animamos el scroll de la fila inferior al montar
  useEffect(() => {
    if (bottomScrollRef.current && products.length > 4) {
      const offset = (cardWidth + GAP) / 2;
      setTimeout(() => {
        bottomScrollRef.current!.scrollTo({ left: offset, behavior: 'smooth' });
      }, 100);
    }
  }, [products, cardWidth]);

  // Scroll automático en hover
  const startScroll = (
    dir: 'left' | 'right',
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    if (scrollInterval.current || !ref.current) return;
    scrollInterval.current = window.setInterval(() => {
      ref.current!.scrollBy({ left: dir === 'left' ? -5 : 5 });
    }, 16);
  };
  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const topRow = products.slice(0, 4);
  const bottomRow = products.slice(4, 9);

  return (
    <section className="py-24 rounded-xl relative font-encode-sans">
      {/* Título + subtítulo */}
      {children}

      {/* ==== MÓVIL: acordeón (solo para pantallas muy pequeñas) ==== */}
      <div className="xs:hidden flex flex-col items-center px-4">
        {products.map((p, i) => (
          <MobileProductCard
            key={p.id}
            title={p.title}
            description={p.description}
            bgColor={cardColors[i % cardColors.length].bg}
            textColor={cardColors[i % cardColors.length].text}
          />
        ))}
      </div>

      {/* ==== TODAS LAS PANTALLAS (excepto muy pequeñas) ==== */}
      <div className="hidden xs:block px-6">
        {/* Fila superior siempre con 4 cards */}
        <div className="flex justify-center">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {topRow.map((p, i) => (
              <div
                key={p.id}
                style={{ width: `${cardWidth}px`, flexShrink: 0 }}
              >
                <ProductCard
                  title={p.title}
                  description={p.description}
                  bgColor={cardColors[i % 4].bg}
                  textColor={cardColors[i % 4].text}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fila inferior deslizable */}
        <div className="mt-[24px] relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full w-12 z-10"
            onMouseEnter={() => startScroll('left', bottomScrollRef)}
            onMouseLeave={stopScroll}
          />
          <div
            className="absolute right-0 top-0 h-full w-12 z-10"
            onMouseEnter={() => startScroll('right', bottomScrollRef)}
            onMouseLeave={stopScroll}
          />

          <div
            ref={bottomScrollRef}
            className="flex gap-[24px] no-scrollbar overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-none cursor-grab active:cursor-grabbing"
            style={{ scrollPaddingInline: '50%' }}
          >
            {bottomRow.map((p, i) => (
              <div
                key={p.id}
                className="snap-center flex-shrink-0"
                style={{ width: `${cardWidth}px`, scrollSnapAlign: 'center' }}
              >
                <ProductCard
                  title={p.title}
                  description={p.description}
                  bgColor={cardColors[(i + 4) % 4].bg}
                  textColor={cardColors[(i + 4) % 4].text}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón final */}
      <div className="flex justify-center pt-16 font-encode-sans">
        <Link href="/inversiones" passHref>
          <Button>Ver todos los activos</Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductsSection;
