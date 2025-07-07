'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';

interface Category {
  categoryName: string;
  createdAt: string;
  documentId: string;
  id: number;
  isDelete: boolean;
  publishedAt: string;
  updatedAt: string;
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response =
          await provinciaApiClient.bursatil.categoriesVideos.getAll();
        setCategories(response.data.data as Category[]);
      } catch {
        setError('Error al cargar categorias de videos');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <div className="flex gap-4">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="text-primary-light py-2 px-4 border-2 rounded-full border-primary-light"
            >
              <span># {category.categoryName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
