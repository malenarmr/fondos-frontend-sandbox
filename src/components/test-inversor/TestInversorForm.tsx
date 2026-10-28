'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { getTestInversorFondo } from '@/services/testInversorService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import ProgressIndicator from './ProgressIndicator';
import QuestionCard from './QuestionCard';
import ResultadoContentBase from './ResultadoContentBase';
import type { Question as ApiQuestion } from '@/types/DinamicLanding';

interface Option {
  id: string;
  label: string;
  point: number;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

// Adapta las preguntas de Strapi (question/answer) al formato interno del form
function mapQuestions(data: ApiQuestion[]): Question[] {
  return data.map((q) => ({
    id: q.id,
    text: q.question,
    options: q.answer.map((a) => ({
      id: a.id.toString(),
      label: a.answer,
      point: a.point,
    })),
  }));
}

interface Props {
  /** Preguntas ya cargadas (ej. desde la dinamic-landing). Si no se pasan, se piden a /test-inversor-fondo */
  questions?: ApiQuestion[];
  /** Muestra el resultado como un paso más del test en vez de redireccionar o abrir el modal */
  showResultInline?: boolean;
}

export default function TestInversorForm({
  questions: initialQuestions,
  showResultInline = false,
}: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [questions, setQuestions] = useState<Question[]>(() =>
    initialQuestions ? mapQuestions(initialQuestions) : []
  );
  const [loading, setLoading] = useState(!initialQuestions);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answersByQuestion, setAnswersByQuestion] = useState<
    Record<number, { id: string; point: number }>
  >({});
  const [showModal, setShowModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  useEffect(() => {
    if (initialQuestions) return;
    getTestInversorFondo()
      .then((data) => setQuestions(mapQuestions(data)))
      .catch(() => setError('No se pudieron cargar las preguntas'))
      .finally(() => setLoading(false));
  }, [initialQuestions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner />
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;
  if (questions.length === 0) return null;

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  // Con showResultInline el resultado ocupa un paso extra al final
  const isResultStep = showResultInline && currentStep === totalSteps;
  const selected =
    (currentQuestion && answersByQuestion[currentQuestion.id]?.id) || null;

  function handleSelect(opt: Option) {
    setAnswersByQuestion({
      ...answersByQuestion,
      [currentQuestion.id]: { id: opt.id, point: opt.point },
    });
  }

  async function handleNext() {
    const total = Object.values(answersByQuestion).reduce(
      (sum, a) => sum + a.point,
      0
    );

    if (!selected) return;

    if (!isLastStep) {
      setCurrentStep((s) => s + 1);
    } else if (showResultInline) {
      setTotalPoints(total);
      setCurrentStep((s) => s + 1);
    } else {
      if (isMobile) {
        setTotalPoints(total);
        setShowModal(true);
      } else {
        router.push(`/test-inversor/resultado?value=${total}`);
      }
    }
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  return (
    <div
      className="    mx-auto
    min-h-[689px]
    bg-white
    border
    border-[#2F755E]
    rounded-xl
    shadow-sm
    p-8
    lg:p-20
    flex flex-col
    justify-center
    items-center"
    >
      <ProgressIndicator
        totalSteps={showResultInline ? totalSteps + 1 : totalSteps}
        currentStep={currentStep + 1}
      />

      {isResultStep ? (
        // TODO: el resultado de este test va a venir de la dinamic-landing
        <div className="mt-8 w-full flex justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Próximamente</h2>
        </div>
      ) : (
        <div className="mt-8 w-full">
          <p className="text-gray-500 text-sm mb-2">
            Pregunta {currentStep + 1} de {totalSteps}
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.text}
          </h2>

          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-8 w-full p-4"
            style={{ minHeight: 160 }}
          >
            {currentQuestion.options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className={`
          transition-all duration-300
          cursor-pointer
          w-full
          h-auto
          ${isSelected ? 'ring-2 ring-[#009B67]' : ''}
        `}
                  style={{
                    borderRadius: '8px',
                    background: '#FFF',
                    boxShadow: isSelected
                      ? '0px 4px 17px rgba(146,146,146,0.7)'
                      : '0px 4px 17px rgba(146,146,146,0.37)',
                  }}
                >
                  <QuestionCard
                    label={opt.label}
                    isSelected={isSelected}
                    onClick={() => handleSelect(opt)}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-4">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="secondary">
                Atrás
              </Button>
            )}
            <Button onClick={handleNext} disabled={!selected}>
              {isLastStep ? 'Ver resultado' : 'Siguiente'}
            </Button>
          </div>
        </div>
      )}
      {/* Modal móvil */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 rounded-xl">
          <div className="relative w-full max-w-lg mx-auto overflow-hidden bg-white  rounded-xl">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <ResultadoContentBase
              value={totalPoints}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
