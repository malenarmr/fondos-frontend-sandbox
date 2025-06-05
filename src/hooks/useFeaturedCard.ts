// src/hooks/useFeaturedCard.ts
import { Destacado, fetchDestacados } from '@/services/homeService';
import { useEffect, useState } from 'react';

export function useFeaturedCards() {
  const [featured, setFeatured] = useState<Destacado[]>([]);

  useEffect(() => {
    fetchDestacados().then((list) => {
      setFeatured(list);
    });
  }, []);

  return featured;
}
