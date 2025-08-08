import { useState } from 'react';

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      <h3
        className="font-bold mb-2 text-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </h3>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pt-1">{children}</div>
      </div>
    </div>
  );
}
