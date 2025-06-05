// services/aliadosService.ts
import apiClient from './apiClient';

interface AliadoBackend {
  id: number;
  name: string;
  image: {
    url: string;
    alternativeText: string | null;
    width: number; // <— ancho original en px
    height: number; // <— alto original en px
  };
}

export interface Aliado {
  id: number;
  name: string;
  image: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

const CLIENT_BASE = apiClient.defaults.baseURL!;
const PUBLIC_BASE = CLIENT_BASE.replace(/\/api$/, '');

export const getAliados = async (): Promise<Aliado[]> => {
  const res = await apiClient.get<{ data: AliadoBackend[] }>('/aliados', {
    params: { 'pagination[withCount]': false },
  });
  return res.data.data.map((a) => ({
    id: a.id,
    name: a.name,
    image: {
      url: a.image.url.startsWith('http')
        ? a.image.url
        : `${PUBLIC_BASE}${a.image.url}`,
      alternativeText: a.image.alternativeText ?? undefined,
      width: a.image.width,
      height: a.image.height,
    },
  }));
};
