import apiClient from './apiClient';

export interface ApiAnswer {
  id: number;
  answer: string;
  point: number;
}

export interface FondoQuestion {
  answer: any;
  id: number;
  question: string;
}

export interface ApiQuestion {
  id: number;
  question: string;
  answer: ApiAnswer[];
}
export interface InvestorProfile {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  shortDescription: string | null;
  point: string;
}
export interface ApiTest {
  questions: ApiQuestion[];
}

export async function getTestInversor(): Promise<ApiTest> {
  const { data } = await apiClient.get<ApiTest>('/test-inversor');
  return data;
}

export async function getInvestorProfile(
  value: number
): Promise<InvestorProfile> {
  const { data } = await apiClient.get('/inversor-profile-fondos', {
    params: { value },
  });
  return data;
}

export async function getTestInversorFondo(): Promise<FondoQuestion[]> {
  const { data } = await apiClient.get('/test-inversor-fondo');
  return data.questions_fondos;
}
