import { TrendingUp } from 'lucide-react';
import type { LearningPathStep } from '@/types';

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 border-green-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-100 text-rose-700 border-rose-200',
};

export function PathResult({ path }: { path: LearningPathStep[] }) {
  if (!path || path.length === 0) return null;

  return (
    <div className="card animate-fade-in p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Your Learning Path
      </h3>
      <div className="space-y-3">
        {path.map((step, i) => {
          const levelColor = LEVEL_COLORS[step.level] ?? 'bg-slate-100 text-slate-700 border-slate-200';
          return (
            <div key={i} className="relative rounded-xl border border-slate-200 p-4">
              {i < path.length - 1 && (
                <div className="absolute left-7 top-full h-3 w-px bg-slate-300" />
              )}
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${levelColor}`}>
                      {step.level}
                    </span>
                    {step.duration && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <TrendingUp className="h-3 w-3" />
                        {step.duration}
                      </span>
                    )}
                  </div>
                  {step.topics && step.topics.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Topics</p>
                      <ul className="mt-1 list-disc pl-4 text-sm text-slate-700">
                        {step.topics.map((t, ti) => <li key={ti}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                  {step.resources && step.resources.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Resources</p>
                      <ul className="mt-1 list-disc pl-4 text-sm text-slate-700">
                        {step.resources.map((r, ri) => <li key={ri}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
