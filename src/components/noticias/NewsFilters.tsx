'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import Button from '../shared/Button';

interface NewsFiltersProps {
  categories: string[];
  years: string[];
  themes: string[];
  onFilter: (filters: {
    search: string;
    category: string;
    year: string;
    theme: string;
  }) => void;
}

export default function NewsFilters({
  categories,
  years,
  themes,
  onFilter,
}: NewsFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [theme, setTheme] = useState('');

  const handleFilter = () => {
    onFilter({ search, category, year, theme });
  };

  // Función auxiliar para capitalizar la primera letra
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto sm:items-center">
        <div className="flex flex-col lg:flex-row items-end">
          {/* 1) Input búsqueda */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Busca por palabra"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-[9px] border border-gray-300 rounded-l-xl font-encode-sans focus:outline-none focus:ring-2 focus:ring-[#008996] focus:border-transparent"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          {/* 2) Select Categoría */}
          <div className="w-full lg:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-[9px] border border-gray-300 rounded-lg font-encode-sans focus:outline-none focus:ring-2 focus:ring-[#008996] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {capitalize(cat)}
                </option>
              ))}
            </select>
          </div>

          {/* 3) Select Año */}
          <div className="w-full lg:w-32">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-[9px] border border-gray-300 rounded-lg font-encode-sans focus:outline-none focus:ring-2 focus:ring-[#008996] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Año</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {capitalize(y)}
                </option>
              ))}
            </select>
          </div>

          {/* 4) Select Tema */}
          <div className="w-full lg:w-48 mr-5">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-[9px] border  rounded-r-xl border-gray-300 rounded-lg font-encode-sans focus:outline-none focus:ring-2 focus:ring-[#008996] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Tema</option>
              {themes.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {capitalize(t)}
                </option>
              ))}
            </select>
          </div>

          {/* 5) Botón Filtrar */}
          <Button onClick={handleFilter} variant="primary">
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}
