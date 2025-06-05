'use client';
import ProductCardInvierta from '@/components/invierta/ProductCardInvierta';
import MobileProductCard from '@/components/shared/MobileProductCard';
import { Product, getProducts } from '@/services/productsService';
import React, { useEffect, useRef, useState } from 'react';

interface ProductsSectionProps {
  children: React.ReactNode;
}

const cardColors = [
  { bg: '#008996', text: '#FFFFFF' },
  { bg: '#00C3B3', text: '#3C3C3B' },
  { bg: '#00E89A', text: '#3C3C3B' },
  { bg: '#005A63', text: '#FFFFFF' },
];
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ children }) => {
  const isClient = useIsClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<number | null>(null);

  // Auto-scroll on mouse move
  useEffect(() => {
    if (!isClient) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, right } = container.getBoundingClientRect();
      const middle = (left + right) / 2;
      const speed = 2;

      if (e.clientX < middle - 50) {
        container.scrollLeft -= speed;
      } else if (e.clientX > middle + 50) {
        container.scrollLeft += speed;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  const startScroll = (dir: 'left' | 'right') => {
    if (scrollInterval.current || !scrollRef.current) return;
    scrollInterval.current = window.setInterval(() => {
      scrollRef.current!.scrollBy({ left: dir === 'left' ? -5 : 5 });
    }, 16);
  };

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  // Fetch products
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="pt-20 px-[20px] lg:px-[150px] rounded-xl cursor-pointer">
      <div className="w-full">
        {children}
        {/* Mobile: accordion */}
        <div className="sm:hidden flex flex-col items-center">
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
        {/* Desktop: auto-scroll */}
        {isClient && (
          <div className="relative hidden sm:flex">
            <div
              className="absolute left-0 top-0 h-full w-12 z-10"
              onMouseEnter={() => startScroll('left')}
              onMouseLeave={stopScroll}
            ></div>
            <div
              className="absolute right-0 top-0 h-full w-12 z-10"
              onMouseEnter={() => startScroll('right')}
              onMouseLeave={stopScroll}
            ></div>
            <div
              ref={scrollRef}
              className="flex flex-row overflow-x-auto no-scrollbar gap-5 w-full"
            >
              {products.map((product, index) => (
                <ProductCardInvierta
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  bgColor={cardColors[index % cardColors.length].bg}
                  textColor={cardColors[index % cardColors.length].text}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
