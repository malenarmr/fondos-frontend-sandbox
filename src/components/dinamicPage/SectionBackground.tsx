// components/shared/SectionBackground.tsx
import { ReactNode } from 'react';

type Variant = 'white' | 'pattern' | 'primary';

interface Props {
  variant: Variant;
  children: ReactNode;
  roundedBottom?: boolean;
}

export default function SectionBackground({
  variant,
  children,
  roundedBottom = false,
}: Props) {
  const baseClass = `w-full ${roundedBottom ? 'rounded-b-[40px]' : ''}`;

  if (variant === 'pattern') {
    return (
      <div
        className={baseClass}
        style={{
          backgroundImage: "url('/background-gris.png')",
          backgroundRepeat: 'repeat',
        }}
      >
        {children}
      </div>
    );
  }

  if (variant === 'primary') {
    return <div className={`${baseClass} bg-primary`}>{children}</div>;
  }

  return <div className={`${baseClass} bg-white`}>{children}</div>;
}
