// src/services/productsService.ts
import apiClient from './apiClient';

export interface Product {
  shortDescription: string;
  isFound: boolean;
  id: number;
  title: string;
  description: string;
  // …otros campos
}

/**
 * Trae primero los productos bursátiles y, luego,
 * en caso de existir, los fondos asociados.
 * Si la llamada a fondos falla, los ignora.
 */
export const getProducts = async (): Promise<Product[]> => {
  // 1) Productos bursátiles
  const bursatilRes = await apiClient.get<{ data: Product[] }>(
    '/product-bursatils',
    { params: { 'pagination[withCount]': false } }
  );
  const bursatil = bursatilRes.data.data;

  // 2) Intento de fondos para bursátil
  //   let funds: Product[] = [];
  //   try {
  //     const fundsRes = await apiClient.get<{ data: Product[] }>(
  //       '/founds-for-bursatil',
  //       { params: { 'pagination[withCount]': false } }
  //     );
  //     if (Array.isArray(fundsRes.data.data)) {
  //       funds = fundsRes.data.data;
  //     }
  //   } catch (err) {
  //     // no hacemos nada; solo un warning opcional
  //     console.warn('No se pudieron traer fondos para bursátil:', err);
  //   }

  //   return [...bursatil, ...funds];
  return [...bursatil];
};
