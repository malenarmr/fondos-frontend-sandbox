import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NewsCardProps {
  id: number;
  category: string;
  title: string;
  author: string;
  description: string;
  date: string;
  bgColor?: string;
  textColor?: string;
}

export default function NewsCard({
  id,
  category,
  title,
  author,
  description,
  date,
  bgColor = '#E8F5F5',
  textColor = '#3C3C3B',
}: NewsCardProps) {
  return (
    <div
      className="p-6 rounded-lg relative h-full flex flex-col"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Fecha en la esquina superior derecha */}
      <div className="absolute top-4 right-4 text-sm font-encode-sans">
        {date}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <span className="text-sm font-encode-sans font-medium uppercase">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold font-encode-sans mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm font-encode-sans mb-2 font-medium">{author}</p>

        <p className="text-sm font-encode-sans mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Botón Leer más */}
        <div className="mt-auto flex justify-end">
          <Link
            href={`/noticias/${id}`}
            className="flex items-center gap-2 text-sm font-encode-sans font-medium hover:underline"
            style={{ color: textColor }}
          >
            Leer más
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
