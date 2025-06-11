// services/noticiasService.ts
import apiClient from './apiClient';

export interface Categoria {
  id: number;
  name: string;
  colors_fondo: { value: string };
}

export interface Topic {
  id: number;
  topic: string;
}

export interface NoticiaBackend {
  id: number;
  title: string;
  author: string | null;
  content: string;
  shortContent: string | null;
  createdAt: string;
  publishedAt: string;
  image: { url: string } | null;
  category_blog_fondos: Categoria;
  topic_blog_fondos: Topic[];
}

interface SingleApiResponse<T> {
  data: T;
  // si tu API devuelve meta o populate, podés ajustarlo aquí
}

/**
 * Trae todas las noticias (igual que antes)…
 */
export async function fetchNoticias(
  page: number = 0,
  pageSize: number = 100
): Promise<{ data: NoticiaBackend[]; meta: any }> {
  const response = await apiClient.get<{ data: NoticiaBackend[]; meta: any }>(
    '/blog-fondos',
    {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
      },
    }
  );
  return response.data;
}

/**
 * Trae UNA noticia por su ID
 */
export async function fetchNoticiaById(id: number): Promise<NoticiaBackend> {
  const response = await apiClient.get<SingleApiResponse<NoticiaBackend>>(
    `/blog-fondos/${id}`,
    {
      params: {
        populate: '*', // si querés que Strapi te incluya el campo image, topics, etc.
      },
    }
  );
  return response.data.data;
}
