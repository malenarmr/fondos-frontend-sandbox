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
    <div className="relative">
      {/* Línea de progreso */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

      {/* Indicadores de pasos */}
      <div className="relative flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className="flex flex-col items-center">
              {isActive ? (
                // Paso activo: círculo punteado grande + círculo interior
                <div className="flex items-center justify-center w-[62px] h-[62px] rounded-full border-2 border-dashed border-[#008996]">
                  <div className="w-[27px] h-[27px] bg-[#00C3B3] rounded-full" />
                </div>
              ) : (
                // Paso completado o no alcanzado
                <div
                  className={`w-[27px] h-[27px] rounded-full ${
                    isCompleted ? 'bg-[#00C3B3]' : 'bg-[#00C3B3]/40'
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
