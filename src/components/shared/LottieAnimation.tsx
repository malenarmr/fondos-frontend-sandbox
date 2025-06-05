// components/shared/LottieAnimation.tsx
'use client';

import dynamic from 'next/dynamic';

// Importar solo el componente Player y desactivar SSR
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

interface LottieAnimationProps {
  src: string; // puede venir "/invierta/…json" o un http…
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const resolvedSrc =
    src.startsWith('http') || src.startsWith('/')
      ? src
      : `${process.env.NEXT_PUBLIC_API_URL}${src}`;

  return <Player autoplay={autoplay} loop={loop} src={resolvedSrc} />;
}
