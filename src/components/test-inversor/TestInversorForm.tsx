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

export default function TestInversorForm() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answersByQuestion, setAnswersByQuestion] = useState<
    Record<number, { id: string; point: number }>
  >({});
  const [showModal, setShowModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  useEffect(() => {
    getTestInversorFondo()
      .then((data) => {
        const mappedQuestions: Question[] = data.map((q) => ({
          id: q.id,
          text: q.question,
          options: q.answer.map(
            (a: { id: { toString: () => any }; answer: any; point: any }) => ({
              id: a.id.toString(), // asegurate que sea string si estás comparando con string
              label: a.answer,
              point: a.point,
            })
          ),
        }));
        setQuestions(mappedQuestions);
      })
      .catch(() => setError('No se pudieron cargar las preguntas'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner />
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const selected = answersByQuestion[currentQuestion.id]?.id || null;
  const isLastStep = currentStep === totalSteps - 1;

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
    max-w-[1144px]
    min-h-[689px]
    bg-white
    border
    border-[#2F755E]
    rounded-xl
    shadow-sm
    p-8
    flex flex-col
    justify-center
    items-center"
    >
      <ProgressIndicator
        totalSteps={totalSteps}
        currentStep={currentStep + 1}
      />

      <div className="mt-8">
        <p className="text-gray-500 text-sm mb-2">
          Pregunta {currentStep + 1} de {totalSteps}
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {currentQuestion.text}
        </h2>

        <div
          className="
    flex flex-wrap gap-6 mb-8 justify-center w-full max-w-full p-4
  "
          style={{ minHeight: 160 }}
        >
          {currentQuestion.options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className={`
          flex-shrink-0
          transition-all duration-300
          cursor-pointer
          w-full max-w-xs
          sm:w-[220px] md:w-[200px]
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
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="secondary"
          >
            Atrás
          </Button>
          <Button onClick={handleNext} disabled={!selected}>
            {isLastStep ? 'Ver resultado' : 'Siguiente'}
          </Button>
        </div>
      </div>
      {/* Modal móvil */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
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
