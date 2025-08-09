'use client';

import type React from 'react';

interface TeamMember {
  name: string;
  rol?: string;
}

interface TeamListCardProps {
  title?: string;
  names: string[] | TeamMember[]; // permite string[] o objetos
  subtitle?: string; // opcional (útil para 1 solo nombre)
  bgColor?: string; // color de fondo (default 009B67)
}

const TeamListCard: React.FC<TeamListCardProps> = ({
  title,
  names,
  subtitle,
  bgColor = '#009B67',
}) => {
  const memberNames = names.map((m) => (typeof m === 'string' ? m : m.name));
  const single = memberNames.length === 1;

  return (
    <div
      className="rounded-tl-[8px] rounded-br-[8px] rounded-tr-[22px] rounded-bl-[22px] p-5 text-white w-full flex flex-col mx-auto"
      style={{
        backgroundColor: bgColor,
        maxWidth: 360,
        minHeight: 96,
      }}
    >
      {title ? (
        <h4 className="text-center text-sm font-semibold mb-2">{title}</h4>
      ) : null}

      <ul className="space-y-1 flex-grow">
        {memberNames.map((name, i) => (
          <li key={i} className="text-center text-base leading-snug">
            {name}
          </li>
        ))}
      </ul>

      {/* Si es un único nombre y viene subtitle/rol, lo mostramos abajo */}
      {single && subtitle ? (
        <div className="text-center text-xs opacity-90 mt-1">{subtitle}</div>
      ) : null}
    </div>
  );
};

export default TeamListCard;
