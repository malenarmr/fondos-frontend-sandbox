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
export interface AreaTeamFondos {
  id: number;
  documentId: string;
  name: string;
  isDelete: boolean | null;
  member_team_fondos: MemberTeamBursatil[];
}

export interface InstitucionalData {
  area_team_fondos: AreaTeamFondos[];
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

  const STATIC_BASE =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') ||
    'https://provincia-prod-api.teocoop.site';

  function fixAuth(auth: Authority) {
    if (!auth.image.url.startsWith('http')) {
      auth.image.url = `${STATIC_BASE}${auth.image.url}`;
    }

    Object.values(auth.image.formats).forEach((fmt) => {
      if (!fmt.url.startsWith('http')) {
        fmt.url = `${STATIC_BASE}${fmt.url}`;
      }
    });
  }

  fixAuth(data.presidente);
  fixAuth(data.vicepresidente);

  data.code_of_conduct.forEach((file) => {
    if (!file.url.startsWith('http')) {
      file.url = `${STATIC_BASE}${file.url}`;
    }
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
