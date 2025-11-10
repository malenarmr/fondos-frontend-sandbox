import { NextResponse } from 'next/server';

const API =
  process.env.NEXT_PUBLIC_API_URL || 'https://provincia-prod-api.teocoop.site';

export async function GET() {
  try {
    // Endpoint que siempre devuelve el último archivo
    const res = await fetch(
      `${API}/api/informacion-inversor-files/oopyqkw5ujrmerpgpv7eet5v`,
      {
        cache: 'no-store', // evita cache para traer siempre la versión más reciente
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'No se pudo obtener el archivo de rendimiento' },
        { status: 502 }
      );
    }

    const data = await res.json();
    const url = data?.data?.file?.url;

    if (!url) {
      return NextResponse.json(
        { error: 'No se encontró URL de archivo' },
        { status: 404 }
      );
    }

    // Arma URL absoluta (por si viene relativa)
    const pdfUrl = new URL(url, API).toString();

    // Redirección al PDF más reciente
    return NextResponse.redirect(pdfUrl, { status: 302 });
  } catch (error) {
    console.error('Error en /rendimiento', error);
    return NextResponse.json(
      { error: 'Error interno al obtener PDF' },
      { status: 500 }
    );
  }
}
