import { AppProvider } from '@/context/AppContext';
import type { Metadata } from 'next';
import { Encode_Sans, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';

const encodeSans = Encode_Sans({
  variable: '--font-encode-sans',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Provincia fondos',
  description: 'Provincia fondos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M22HTCBD');
          `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${encodeSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M22HTCBD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AppProvider>{children}</AppProvider>
        <Link
          target="_blank"
          href="https://wa.me/5491148895265?text=%C2%A1Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20inversiones%20en%20Fondos%20Comunes%20de%20Inversi%C3%B3n%20del%20Banco%20Provincia"
          className="fixed bottom-5 right-4 z-[9999]"
        >
          <Image
            width={60}
            height={60}
            src="/wpp-logo.png"
            alt="WhatsApp Banco Provincia"
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </body>
    </html>
  );
}
