// src/components/institucional/PersonCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

interface PersonCardProps {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  role,
  imageUrl,
}) => {
  return (
    <Link
      href={`/institucional/autoridad/${id}`}
      className="block mx-auto w-full max-w-[360px]"
    >
      <div className="relative overflow-hidden rounded-[23px] h-[377px] w-full">
        {/* Background image con gradiente */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.38%, #000 100%)',
            }}
          />
        </div>

        {/* Contenido en la parte inferior */}
        <div className="absolute bottom-0 left-6 right-0 p-6 flex flex-col text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="">{role}</p>
        </div>
      </div>
    </Link>
  );
};

export default PersonCard;
