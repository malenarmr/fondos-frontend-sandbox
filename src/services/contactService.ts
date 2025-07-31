// services/contactService.ts
import apiClient from './apiClient';

export interface ContactoAsistente {
  id: number;
  documentId: string;
  name: string;
  rol: string | null;
  phone: string;
  email: string;
}

export interface ContactSection {
  id: number;
  title: string;
  contacto: ContactoAsistente[];
}

export interface ContactoData {
  id: number;
  title: string;
  description: string;
  telefono: string;
  fax: string;
  consultas_denuncias: string;
  email: string;
  contactos_seccion: ContactSection;
}

export async function fetchContacto(): Promise<ContactoData> {
  const resp = await apiClient.get<{ data: ContactoData }>(
    '/nuestro-equipo-fondo'
  );
  return resp.data.data;
}
