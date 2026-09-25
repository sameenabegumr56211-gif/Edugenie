import { AlertCircle, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ResultPanelProps {
  loading: boolean;
  error: string | null;
  result: string | null;
}

export function ResultPanel({ loading, error, result }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="card flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-pulse-slow rounded-full border-4 border-brand-200 border-t-brand-600" />
          <p className="text-sm font-medium text-slate-500">EduGenie is thinking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card animate-fade-in border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
          <div>
            <p className="font-semibold text-red-800">Something went wrong</p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card flex flex-col items-center justify-center border-dashed bg-slate-50/50 p-12 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100">
          <Sparkles className="h-7 w-7 text-brand-500" />
        </div>
        <p className="text-sm font-medium text-slate-600">Your results will appear here</p>
        <p className="mt-1 text-sm text-slate-400">
          Enter a topic or question above and hit the button to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Result</h3>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-slate-700">
        {result}
      </div>
    </div>
  );
}
