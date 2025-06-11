interface InstitucionalCardProps {
  title: string;
  description: string;
}

export default function InstitucionalCard({
  title,
  description,
}: InstitucionalCardProps) {
  return (
    <div className="bg-white p-6 rounded-tl-[8px] rounded-br-[8px] rounded-tr-[22px] rounded-bl-[22px] shadow-md w-full  transition-transform transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-4xl font-bold text-secondary mb-8 text-center">
        {title}
      </h3>
      <p className="text-sm text-secondary leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
}
