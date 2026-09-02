/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { provinciaClient } from 'provincia-api-client';
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  const { name, email, message, motivoConsultaFondo } = await request.json();

  if (!name || !email || !message || !motivoConsultaFondo) {
    return NextResponse.json(
      { error: 'Faltan campos requeridos' },
      { status: 400 }
    );
  }

  const jwtToken = process.env.CONTACT_TOKEN_FONDOS;
  const env =
    (process.env.NEXT_PUBLIC_API_ENV as 'sandbox' | 'development' | 'prod') ||
    'sandbox';

  try {
    const provinciaApiClient = provinciaClient({ env });
    const payload = {
      name,
      email,
      message,
      motivo_consulta_fondo: motivoConsultaFondo,
    };
    const response = await provinciaApiClient.fondos.form.createForm({
      jwtToken,
      data: payload,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(
      { error: 'Error al enviar la consulta' },
      { status: 500 }
    );
  }
}
