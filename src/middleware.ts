// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ORIGIN =
  process.env.CORS_ALLOW_ORIGIN || 'https://www.provinciafondos.com.ar';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Preflight CORS SOLO para /api
  if (pathname.startsWith('/api') && req.method === 'OPTIONS') {
    const h = new Headers();
    h.set('Access-Control-Allow-Origin', ORIGIN);
    h.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    h.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    h.set('Access-Control-Allow-Credentials', 'true');
    h.set('Vary', 'Origin');
    return new NextResponse(null, { status: 204, headers: h });
  }

  // Respuesta normal
  const res = NextResponse.next();

  // 1) Limpia cualquier wildcard que venga de la plataforma
  res.headers.delete('Access-Control-Allow-Origin');

  // 2) CORS solo para /api (respuesta no-OPTIONS)
  if (pathname.startsWith('/api')) {
    res.headers.set('Access-Control-Allow-Origin', ORIGIN);
    res.headers.set('Vary', 'Origin');
  }

  return res;
}

// Evitar costo en assets estáticos
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
