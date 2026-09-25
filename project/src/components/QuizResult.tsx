import { CheckCircle2, XCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { QuizQuestion } from '@/types';

export function QuizResult({ quiz }: { quiz: QuizQuestion[] }) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  if (!quiz || quiz.length === 0) return null;

  return (
    <div className="card animate-fade-in p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Quiz — {quiz.length} Questions
      </h3>
      <div className="space-y-4">
        {quiz.map((q, qi) => {
          const chosen = selected[qi];
          const isRevealed = revealed[qi];
          const isCorrect = chosen === q.answerIndex;

          return (
            <div key={qi} className="rounded-xl border border-slate-200 p-4">
              <p className="mb-3 font-medium text-slate-800">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isAnswer = oi === q.answerIndex;
                  let style = 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50';
                  if (isRevealed && isAnswer) style = 'border-green-300 bg-green-50 text-green-800';
                  else if (isRevealed && isChosen && !isAnswer) style = 'border-red-300 bg-red-50 text-red-800';
                  else if (isChosen) style = 'border-brand-400 bg-brand-50 text-brand-800';

                  return (
                    <button
                      key={oi}
                      disabled={isRevealed}
                      onClick={() => setSelected({ ...selected, [qi]: oi })}
                      className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all ${style} ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-bold">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span>{opt}</span>
                      {isRevealed && isAnswer && <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />}
                      {isRevealed && isChosen && !isAnswer && <XCircle className="ml-auto h-4 w-4 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {isRevealed && q.explanation && (
                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">Explanation: </span>
                  {q.explanation}
                </div>
              )}

              <div className="mt-3 flex items-center gap-3">
                {!isRevealed ? (
                  <button
                    onClick={() => setRevealed({ ...revealed, [qi]: true })}
                    disabled={chosen === undefined}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                    Check Answer
                  </button>
                ) : (
                  <span className={`text-xs font-medium ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                    {isCorrect ? 'Correct!' : `Incorrect. The answer is ${String.fromCharCode(65 + q.answerIndex)}.`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
