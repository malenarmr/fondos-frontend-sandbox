'use client';

import Button from '@/components/shared/Button';
import {
  InvestorProfile,
  getInvestorProfile,
} from '@/services/testInversorService';
import { useEffect, useState } from 'react';
import ResultadoCartera from './ResultadoCartera';

interface Props {
  value: number;
  onClose?: () => void;
}

export default function ResultadoContentBase({ value, onClose }: Props) {
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getInvestorProfile(value)
      .then((data) => setProfile(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [value]);

  if (loading) return <p>Cargando resultado…</p>;
  if (error || !profile)
    return <p className="text-red-500">No se encontró el perfil</p>;

  const carteraTypeMap: Record<string, string> = {
    Conservador: 'Conservadora',
    Moderado: 'Moderada',
    Agresivo: 'Arriesgada',
  };
  const filterType = carteraTypeMap[profile.title] ?? profile.title;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">{profile.title}</h2>
      <ResultadoCartera filterType={filterType} />

      <div className="flex justify-center items-center gap-4 mt-6 w-full">
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        )}
      </div>
    </div>
  );
}
