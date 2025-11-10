// app/rendimiento/route.ts
import { NextRequest } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://provincia-prod-api.teocoop.site';
const MANIFEST_PATH =
  '/api/informacion-inversor-files/oopyqkw5ujrmerpgpv7eet5v';

export async function GET(req: NextRequest) {
  try {
    // 1) Tomamos la URL actual del PDF
    const manifestRes = await fetch(`${API_BASE}${MANIFEST_PATH}`, {
      cache: 'no-store',
    });
    if (!manifestRes.ok) {
      return new Response(
        JSON.stringify({
          error: 'No se pudo obtener el archivo de rendimiento',
        }),
        {
          status: 502,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    const manifest = await manifestRes.json();
    const relativeOrAbsolute = manifest?.data?.file?.url;
    if (!relativeOrAbsolute) {
      return new Response(
        JSON.stringify({ error: 'No se encontró URL de archivo' }),
        {
          status: 404,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    const pdfUrl = new URL(relativeOrAbsolute, API_BASE).toString();

    // 2) Soporte de Range (para cargas parciales del PDF)
    const rangeHeader = req.headers.get('range') || undefined;
    const fileRes = await fetch(pdfUrl, {
      cache: 'no-store',
      headers: rangeHeader ? { range: rangeHeader } : undefined,
    });

    // Si el origen falla
    if (!fileRes.ok && fileRes.status !== 206) {
      return new Response(
        JSON.stringify({ error: 'No se pudo descargar el PDF' }),
        {
          status: 502,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    // 3) Reenviamos el stream del PDF y headers clave
    const headers = new Headers();

    headers.set('content-type', 'application/pdf');
    headers.set('cache-control', 'no-store'); // siempre lo último
    headers.set(
      'content-disposition',
      'inline; filename="Rendimiento_Diario.pdf"'
    );

    // Pasamos headers útiles del origen si existen
    const pass = (name: string) => {
      const v = fileRes.headers.get(name);
      if (v) headers.set(name, v);
    };

    pass('content-length');
    pass('last-modified');
    pass('etag');
    pass('accept-ranges'); // típico: "bytes"
    pass('content-range'); // si vino un 206

    return new Response(fileRes.body, {
      status: fileRes.status, // 200 o 206 si hubo Range
      headers,
    });
  } catch (err) {
    console.error('GET /rendimiento error', err);
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
