import type React from 'react';

interface TeamMember {
  name: string;
}

interface TeamListCardProps {
  title: string;
  names: string[] | TeamMember[];
  bgColor?: string;
}

const TeamListCard: React.FC<TeamListCardProps> = ({
  // title,
  names,
  // bgColor = '#005A63',
}) => {
  // Handle both string[] and TeamMember[] types
  const memberNames = names.map((member) =>
    typeof member === 'string' ? member : member.name
  );

  return (
    <div
      className="rounded-lg p-6 text-white w-full flex flex-col mx-auto h-full"
      style={{
        backgroundColor: '#005A63',
        maxWidth: '360px',
        minHeight: '80px',
        borderRadius: '8px',
      }}
    >
      <ul className="space-y-2 flex-grow overflow-auto">
        {memberNames.map((name, index) => (
          <li key={index} className="text-center">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamListCard;
