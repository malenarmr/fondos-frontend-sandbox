'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface Props {
  content: string;
  // Clases de tamaño/peso que tenía el <p> original de la card.
  className?: string;
}

// El editor de markdown del backoffice permite headings (H1-H3) y listas,
// pero dentro de las cards del landing ese contenido debe verse como texto
// plano: h1-h3 traen su propio font-size del navegador que no respeta las
// clases de Tailwind del diseño y rompe el tamaño de letra de la card, así
// que los "bajamos" a párrafos con el mismo className que el resto del texto.
export default function CardMarkdown({ content, className }: Props) {
  const asParagraph = ({ ...props }) => <p className={className} {...props} />;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        p: asParagraph,
        h1: asParagraph,
        h2: asParagraph,
        h3: asParagraph,
        li: ({ ...props }) => <li className={className} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
