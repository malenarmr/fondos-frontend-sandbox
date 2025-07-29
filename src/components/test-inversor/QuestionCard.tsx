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
        flex items-center justify-center
        p-4 rounded-xl shadow-sm cursor-pointer transition-all h-60 text-center
        border
        ${
          isSelected
            ? 'bg-[#F2FBF6] border-none'
            : 'bg-white border-none hover:border-[#009B67] hover:bg-[#F7FAF9]'
        }
      `}
      style={{ minHeight: 120 }}
    >
      <h3
        className={`text-md font-bold text-[#009B67] transition-colors duration-200`}
        style={{
          fontSize: 'clamp(15px,1vw,18px)',
        }}
      >
        {label}
      </h3>
    </div>
  );
}
