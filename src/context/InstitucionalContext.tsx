'use client';

import apiClient from '@/services/apiClient';
import {
  Authority,
  InstitucionalData,
  getInstitucionalData,
} from '@/services/institutionalService';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

interface InstitucionalContextType {
  institucionalData: InstitucionalData | null;
  loading: boolean;
  error: string;
  getAuthorityById: (id: number) => Authority | null;
}

const InstitucionalContext = createContext<InstitucionalContextType>({
  institucionalData: null,
  loading: true,
  error: '',
  getAuthorityById: () => null,
});

export const useInstitucional = () => useContext(InstitucionalContext);

export const InstitucionalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [institucionalData, setInstitucionalData] =
    useState<InstitucionalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstitucionalData(apiClient);
        setInstitucionalData(data);
      } catch (err) {
        setError('Error al cargar los datos institucionales');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAuthorityById = (id: number): Authority | null => {
    if (!institucionalData) return null;

    if (
      institucionalData.presidente &&
      institucionalData.presidente.id === id
    ) {
      return institucionalData.presidente;
    }

    if (
      institucionalData.vicepresidente &&
      institucionalData.vicepresidente.id === id
    ) {
      return institucionalData.vicepresidente;
    }

    return null;
  };

  return (
    <InstitucionalContext.Provider
      value={{ institucionalData, loading, error, getAuthorityById }}
    >
      {children}
    </InstitucionalContext.Provider>
  );
};
