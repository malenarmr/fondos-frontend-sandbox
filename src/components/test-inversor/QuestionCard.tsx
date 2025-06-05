'use client';

interface QuestionCardProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function QuestionCard({
  label,
  isSelected,
  onClick,
}: QuestionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center boder-none justify-center p-8 rounded-lg shadow-sm cursor-pointer transition-all h-60
        ${isSelected ? '  boder-none' : ' hover:border-gray-200 hover:bg-gray-50'}
      `}
    >
      <h3
        className={`text-md font-medium ${isSelected ? 'text-teal-700' : 'text-gray-700'}`}
      >
        {label}
      </h3>
    </div>
  );
}
