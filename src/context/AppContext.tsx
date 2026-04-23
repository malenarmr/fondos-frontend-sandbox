'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import apiClient from '@/services/apiClient';
import {
  Authority,
  InstitucionalData,
  getAuthorityById,
  getInstitucionalData,
} from '@/services/institutionalService';
import { provinciaClient } from 'provincia-api-client';

type AppContextType = {
  provinciaApiClient: ReturnType<typeof provinciaClient>;
  institucionalData: InstitucionalData | null;
  institucionalLoading: boolean;
  institucionalError: string | null;
  getAuthorityById: (id: number) => Authority | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // tu env queda igual
  const env =
    (process.env.NEXT_PUBLIC_API_ENV as 'sandbox' | 'development' | 'prod') ||
    'sandbox';
  const provinciaApiClientInstance = provinciaClient({ env });

  const [institucionalData, setInstitucionalData] =
    useState<InstitucionalData | null>(null);
  const [institucionalLoading, setInstitucionalLoading] = useState(true);
  const [institucionalError, setInstitucionalError] = useState<string | null>(
    null
  );

  useEffect(() => {
    getInstitucionalData(apiClient)
      .then((data) => {
        setInstitucionalData(data);
        setInstitucionalError(null);
      })
      .catch((err) => {
        console.error('Error real:', err);

        if (err.response) {
          console.error('Status:', err.response.status);
          console.error('Data:', err.response.data);
        }

        setInstitucionalError('Error al cargar datos institucionales');
      })
      .finally(() => {
        setInstitucionalLoading(false);
      });
  }, []);

  const getAuthorityByIdFn = (id: number): Authority | null =>
    getAuthorityById(institucionalData, id);

  return (
    <AppContext.Provider
      value={{
        provinciaApiClient: provinciaApiClientInstance,
        institucionalData,
        institucionalLoading,
        institucionalError,
        getAuthorityById: getAuthorityByIdFn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error('useAppContext debe usarse dentro de <AppProvider>');
  return ctx;
};
