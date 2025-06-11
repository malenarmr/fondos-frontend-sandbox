// src/services/institutionalService.ts
import type { AxiosInstance } from 'axios';

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Authority {
  order: number;
  id: number;
  name: string;
  role: string;
  description: string;
  image: {
    id: number;
    url: string;
    formats: {
      small: ImageFormat;
      medium: ImageFormat;
      thumbnail: ImageFormat;
    };
  };
}

export interface MemberTeamBursatil {
  id: number;
  documentId: string;
  name: string;
  isDelete: boolean | null;
}

export interface AreaTeamBursatil {
  id: number;
  documentId: string;
  name: string;
  isDelete: boolean | null;
  member_team_bursatil: MemberTeamBursatil[];
}

export interface InstitucionalData {
  id: number;
  documentId: string;
  mision: string;
  vision: string;
  values: string;
  isDelete: boolean;
  title: string;
  description: string;
  code_of_conduct: {
    id: number;
    name: string;
    url: string;
  }[];
  presidente: Authority;
  vicepresidente: Authority;
  area_team_bursatils: AreaTeamBursatil[];
}

/**
 * Obtiene los datos institucionales completos y convierte
 * todas las URLs relativas de imgs/PDFs a absolutas.
 */
export const getInstitucionalData = async (
  apiClient: AxiosInstance
): Promise<InstitucionalData> => {
  const resp = await apiClient.get('/institutional-fondo');
  const data = resp.data.data as InstitucionalData;

  // 1) Base completa de la API (p.ej. "https://.../api")
  const apiBase = apiClient.defaults.baseURL?.replace(/\/$/, '') || '';
  // 2) Base para assets (quitamos el "/api" final)
  const staticBase = apiBase.replace(/\/api$/, '');

  function fixAuth(auth: Authority) {
    auth.image.url = `${staticBase}${auth.image.url}`;
    Object.values(auth.image.formats).forEach((fmt) => {
      fmt.url = `${staticBase}${fmt.url}`;
    });
  }

  // Arreglamos URLs de las dos autoridades
  fixAuth(data.presidente);
  fixAuth(data.vicepresidente);

  // Arreglamos también el PDF de código de conducta
  data.code_of_conduct.forEach((file) => {
    file.url = `${staticBase}${file.url}`;
  });

  return data;
};

/**
 * Busca dentro de presidente / vicepresidente por su ID
 */
export const getAuthorityById = (
  data: InstitucionalData | null,
  id: number
): Authority | null => {
  if (!data) return null;
  if (data.presidente.id === id) return data.presidente;
  if (data.vicepresidente.id === id) return data.vicepresidente;
  return null;
};
