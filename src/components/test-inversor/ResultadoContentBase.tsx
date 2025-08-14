'use client';

import Button from '@/components/shared/Button';
import {
  InvestorProfile,
  getInvestorProfile,
} from '@/services/testInversorService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResultadoFondosSugeridos from './ResultadoFondosSugeridos';

interface Props {
  value: number;
  onClose?: () => void;
}

export default function ResultadoContentBase({ value, onClose }: Props) {
  const router = useRouter();
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">{profile.title}</h2>
      <p className="text-center mb-2">{profile.description}</p>
      <p className="text-center text-secondary mb-4">
        {profile.shortDescription}
      </p>

      <ResultadoFondosSugeridos fondos={profile.our_founds || []} />

      <div className="flex flex-col gap-4 mt-6 w-full">
        <Button
          variant="light"
          onClick={() => {
            if (onClose) onClose();
            router.push('/simulador');
          }}
        >
          Simulá tu inversión
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (onClose) onClose();
            router.push('/test-inversor');
          }}
        >
          Volver a hacer el test
        </Button>
      </div>
    </div>
  );
}
