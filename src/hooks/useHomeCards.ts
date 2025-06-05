import { HomeCard, fetchHomeCards } from '@/services/homeService';
import { useEffect, useState } from 'react';

export function useHomeCards() {
  const [cards, setCards] = useState<HomeCard[]>([]);

  useEffect(() => {
    fetchHomeCards().then(setCards).catch(console.error);
  }, []);

  return cards;
}
