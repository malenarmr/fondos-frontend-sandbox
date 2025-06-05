import { AppProvider } from '@/context/AppContext';
import type { Metadata } from 'next';
import { Encode_Sans, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'Provincia bursátil',
  description: 'Provincia bursátil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${encodeSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
