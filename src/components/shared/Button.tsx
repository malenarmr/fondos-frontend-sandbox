'use client';
import Link from 'next/link';
import React from 'react';

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'light' | 'sky';
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = AnchorProps | ButtonProps;

const Button: React.FC<Props> = (props) => {
  const { variant = 'primary', children } = props;

  const base = `
    flex items-center justify-center
    font-encode-sans font-medium
    px-[25px] py-[9px]
    rounded-tl-[6px] rounded-tr-[12px]
    rounded-br-[6px] rounded-bl-[12px]
    gap-x-[10px]
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const styles = {
    primary: `
      bg-primary border border-primary text-white
      hover:bg-secondary hover:border-secondary focus:ring-primary
    `,
    light: `
    bg-primary-light border border-primary-light text-white
    hover:bg-primary hover:border-primary focus:ring-primary
  `,
    sky: `
    bg-sky border border-sky text-secondary font-semibold
    hover:bg-primary hover:border-primary focus:ring-primary
  `,
    secondary: `
      bg-transparent border border-primary text-primary
      hover:bg-primary hover:text-white focus:ring-primary
      cursor-pointer
    `,
  } as const;

  const className = `${base} ${styles[variant]}`;

  // Rama <a> cuando viene href
  if ('href' in props) {
    const {
      href,
      target,
      rel,
      // extraemos solo los props válidos para un <a>
      // el resto los guardamos en rest (p.ej. aria-*, id, etc.)
      ...rest
    } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={className}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  // Rama <button>
  const { onClick, disabled, type = 'button', ...rest } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
