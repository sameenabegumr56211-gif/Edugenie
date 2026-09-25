import { Loader2, Send } from 'lucide-react';
import { TASKS } from '@/lib/tasks';
import type { TaskType } from '@/types';
import { TaskIcon } from './TaskIcon';

interface InputPanelProps {
  task: TaskType;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function InputPanel({ task, value, onChange, onSubmit, loading }: InputPanelProps) {
  const config = TASKS[task];
  const isLongInput = task === 'quiz' || task === 'summarize';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLongInput) {
      e.preventDefault();
      if (!loading && value.trim()) onSubmit();
    }
  };

  return (
    <div className="card animate-slide-up p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100">
          <TaskIcon name={config.icon} className="h-5 w-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">{config.title}</h2>
          <p className="text-sm text-slate-500">{config.description}</p>
        </div>
      </div>

      {isLongInput ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config.placeholder}
          rows={5}
          className="input-field resize-none"
          disabled={loading}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={config.placeholder}
          className="input-field"
          disabled={loading}
        />
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="btn-primary"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Working on it...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {config.buttonText}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
