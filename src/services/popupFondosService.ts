import apiClient from './apiClient';

export interface AvisoFondosResponse {
  data: {
    id: number;
    title: string;
    description: string;
    buttonText: string | null;
    from: string;
    to: string;
  };
}

export async function fetchAvisoFondos(): Promise<
  AvisoFondosResponse['data'] | null
> {
  try {
    const res = await apiClient.get<AvisoFondosResponse>(
      '/destacado-fondo?public=true'
    );
    // Podrías validar que esté dentro de la vigencia si el back no lo hace
    return res.data?.data || null;
  } catch {
    return null;
  }
}
