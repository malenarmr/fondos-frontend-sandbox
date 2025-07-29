'use client';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function ProgressIndicator({
  totalSteps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <div className="relative w-full mb-6">
      {/* Línea de progreso */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#A3DBC9] -translate-y-1/2 z-0" />

      {/* Indicadores de pasos */}
      <div className="relative flex justify-between items-center z-10">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className="flex flex-col items-center">
              {isActive ? (
                <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full border-2 border-dashed border-[#009B67] bg-white">
                  <div className="w-[24px] h-[24px] bg-[#009B67] rounded-full" />
                </div>
              ) : (
                <div
                  className={`w-[24px] h-[24px] rounded-full border-2 ${
                    isCompleted
                      ? 'bg-[#009B67] border-[#009B67]'
                      : 'bg-[#A3DBC9] border-[#A3DBC9]'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
