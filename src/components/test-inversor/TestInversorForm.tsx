'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { getTestInversorFondo } from '@/services/testInversorService';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import ProgressIndicator from './ProgressIndicator';
import QuestionCard from './QuestionCard';
import ResultadoContentBase from './ResultadoContentBase';
import type { Question as ApiQuestion, Results } from '@/types/DinamicLanding';
import Link from 'next/link';

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
  result?: Results[];
  resultTitle?: string;
}

export default function TestInversorForm({
  questions: initialQuestions,
  showResultInline = false,
  result,
  resultTitle,
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

  const finalResult = useMemo(() => {
    if (!result?.length) return null;

    return (
      [...result]
        .sort((a, b) => b.point - a.point)
        .find((r) => totalPoints >= r.point) ?? null
    );
  }, [result, totalPoints]);

  // recién después:
  if (loading) return <Spinner />;

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

  function renderResultCard(res: Results) {
    return (
      <div
        className={`
          flex items-center justify-between flex-col !shadow-[5px_5px_44px_rgba(0,0,0,0.10)]
          p-14 rounded-xl shadow-sm text-center w-full
          border gap-5 ${res.link ? 'cursor-pointer' : ''}
        `}
      >
        <h2 className="font-bold">{res.recomendadoTitle}</h2>
        <h1 className="w-full text-center font-encode-sans font-extrabold xl:font-black text-4xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]">
          {res.title}
        </h1>
        <p>{res.description}</p>
      </div>
    );
  }

  function handleRestart() {
    setAnswersByQuestion({});
    setTotalPoints(0);
    setCurrentStep(0);
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
    relative
    items-center"
    >
      <div className="sticky top-10 w-full">
        <ProgressIndicator
          totalSteps={showResultInline ? totalSteps + 1 : totalSteps}
          currentStep={currentStep + 1}
        />
      </div>

      {isResultStep && finalResult ? (
        // TODO: el resultado de este test va a venir de la dinamic-landing
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-gray-500 text-sm text-end">Resultado</p>
            <p className="w-full text-right font-encode-sans font-bold text-2xl xl:text-[35px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]">
              {resultTitle}
            </p>
          </div>
          {/* La card solo es clickeable si el resultado trae link */}
          {finalResult.link ? (
            <Link href={finalResult.link}>{renderResultCard(finalResult)}</Link>
          ) : (
            renderResultCard(finalResult)
          )}
          <div className="w-full flex justify-end">
            <Button onClick={handleRestart}>Volver a hacer el test</Button>
          </div>
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
