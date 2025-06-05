'use client';

import Button from '@/components/shared/Button';
import { useAppContext } from '@/context/AppContext';
import { getProducts, Product } from '@/services/productsService'; // <-- Usamos Product del service
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Fondo {
  id: number;
  name: string;
  description: string;
  factSheet: {
    caption: string | null;
    url: string;
  };
}

const InversionesSection: React.FC = () => {
  const { provinciaApiClient } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fondos, setFondos] = useState<Fondo[]>([]);
  const [displayFondos, setDisplayFondos] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: 0,
    title: '',
    isFound: false,
    description: '',
    shortDescription: '',
  });
  const [selectedFondo, setSelectedFondo] = useState<Fondo>({
    id: 0,
    name: '',
    description: '',
    factSheet: { caption: '', url: '' },
  });

  // ==== Traer productos con service ====
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        if (data.length > 0) setSelectedProduct(data[0]);
      })
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  // ==== Traer fondos si el producto es de categoría "fondos" ====
  useEffect(() => {
    async function fetchFondos() {
      try {
        const response = await provinciaApiClient.fondos.founds.getAll();
        setFondos(response.data.data as Fondo[]);
      } catch {
        setError('Error al cargar fondos');
      } finally {
        setLoading(false);
      }
    }

    if (selectedProduct.isFound) {
      fetchFondos();
      setDisplayFondos(true);
    } else {
      setDisplayFondos(false);
    }
  }, [selectedProduct, provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleDisplayProduct = (product: Product) => {
    setSelectedProduct(product);
  };
  const handleDisplayFondo = (fondo: Fondo) => {
    setSelectedFondo(fondo);
  };
  const sanitizeTitle = (title: string) =>
    title
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  return (
    <section className="py-24 px-6 lg:px-16 container mx-auto">
      <div className="flex mb-10 flex-wrap gap-[10px] justify-start">
        {products.map((product) => (
          <div
            key={product.id}
            className={`cursor-pointer px-2 lg:px-3 py-1 rounded-[6px] text-center transition duration-200 ${
              selectedProduct.id === product.id
                ? 'bg-[#00C3B3] text-[#3C3C3B] font-semibold'
                : 'bg-[#00C3B34D] text-[#929292]'
            }`}
            onClick={() => handleDisplayProduct(product)}
          >
            {product.title}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row">
        {displayFondos && (
          <div className="grid grid-cols-1 lg:w-1/3 lg:mr-8">
            <div
              className="cursor-pointer border-t border-[#CDCACA] p-2"
              onClick={() =>
                handleDisplayFondo({
                  id: 0,
                  name: '',
                  description: '',
                  factSheet: { caption: '', url: '' },
                })
              }
            >
              <div className="flex justify-between">
                <h4
                  className={`text-xl font-bold transition duration-200 w-[70%] ${
                    selectedFondo.id === 0 ? 'text-[#005A63]' : 'text-[#929292]'
                  }`}
                >
                  Fondos Comunes de Inversión
                </h4>
                <Image
                  src="/inversiones/Arrow.png"
                  alt="Ver más"
                  width={10}
                  height={10}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            {fondos.map((fondo, i) => (
              <div
                key={fondo.id}
                className={`cursor-pointer border-t ${
                  i === fondos.length - 1 && 'border-b'
                } border-[#CDCACA] p-2`}
                onClick={() => handleDisplayFondo(fondo)}
              >
                <div className="flex justify-between">
                  <h4
                    className={`text-xl font-bold transition duration-200 w-[70%] ${
                      selectedFondo.id === fondo.id
                        ? 'text-[#005A63]'
                        : 'text-[#929292]'
                    }`}
                  >
                    Fondo {sanitizeTitle(fondo.name)}
                  </h4>
                  <Image
                    src="/inversiones/Arrow.png"
                    alt="Ver más"
                    width={10}
                    height={10}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`rounded-xl py-10 px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 shadow-[0_0_15px_rgba(0,0,0,0.35)] font-encode-sans ${
            displayFondos ? 'lg:w-2/3' : ''
          }`}
          style={{ height: 'fit-content' }}
        >
          <div>
            <h3 className="mb-4 text-2xl xl:text-4xl font-bold text-[#005A63]">
              {displayFondos && selectedFondo.name
                ? sanitizeTitle(selectedFondo.name)
                : selectedProduct.title}
            </h3>
            <p className="text-primary">
              {displayFondos && selectedFondo.name
                ? selectedFondo.description
                : selectedProduct.shortDescription}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="mb-4 text-[#00C3B3] text-xl xl:text-2xl font-bold">
                Características
              </h4>
              <hr />
            </div>
            {displayFondos && selectedFondo.factSheet?.url && (
              <Link href={selectedFondo.factSheet.url} target="_blank">
                <Button variant="secondary" style={{ fontWeight: '600' }}>
                  Descargar {selectedFondo.factSheet.caption}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InversionesSection;
