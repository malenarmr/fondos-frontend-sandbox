'use client';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** id del elemento destino (sin #) */
  targetId: string;
};

/** Ancla que hace scroll suave hasta el elemento con `targetId`. */
export default function ScrollToLink({ targetId, onClick, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${targetId}`);
  };

  return <a href={`#${targetId}`} onClick={handleClick} {...rest} />;
}
