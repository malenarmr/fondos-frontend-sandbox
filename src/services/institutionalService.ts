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
  area_team_fondos: any;
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
  try {
    const resp = await apiClient.get('/institutional-fondo');
    return resp.data.data as InstitucionalData;
  } catch (error: any) {
    throw error; // importante: re-lanzar
  }
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
