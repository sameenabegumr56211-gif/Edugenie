import { useState } from 'react';
import { Header } from '@/components/Header';
import { TaskSelector } from '@/components/TaskSelector';
import { InputPanel } from '@/components/InputPanel';
import { ResultPanel } from '@/components/ResultPanel';
import { QuizResult } from '@/components/QuizResult';
import { PathResult } from '@/components/PathResult';
import { TASKS } from '@/lib/tasks';
import { callEduGenie } from '@/lib/api';
import type { TaskType, QuizQuestion, LearningPathStep } from '@/types';

function App() {
  const [activeTask, setActiveTask] = useState<TaskType>('explain');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [path, setPath] = useState<LearningPathStep[] | null>(null);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResultText(null);
    setQuiz(null);
    setPath(null);

    try {
      const data = await callEduGenie(activeTask, input.trim());
      if (data.quiz) setQuiz(data.quiz);
      if (data.path) setPath(data.path);
      setResultText(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskChange = (task: TaskType) => {
    setActiveTask(task);
    setInput('');
    setError(null);
    setResultText(null);
    setQuiz(null);
    setPath(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero */}
        <section className="mb-6 text-center sm:mb-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Your personal AI study companion
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            Ask questions, understand concepts, generate quizzes, summarize text, and build
            learning paths — all powered by Google Gemini.
          </p>
        </section>

        {/* Task selector */}
        <section className="mb-5">
          <TaskSelector activeTask={activeTask} onSelect={handleTaskChange} />
        </section>

        {/* Input + Results */}
        <div className="space-y-5">
          <InputPanel
            task={activeTask}
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {quiz && <QuizResult quiz={quiz} />}
          {path && <PathResult path={path} />}
          {!quiz && !path && (
            <ResultPanel loading={loading} error={error} result={resultText} />
          )}
        </div>

        {/* Feature cards */}
        {!resultText && !loading && !error && (
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(TASKS).map((t) => (
              <button
                key={t.id}
                onClick={() => handleTaskChange(t.id)}
                className="card group p-4 text-left transition-all hover:border-brand-300 hover:shadow-md"
              >
                <p className="font-semibold text-slate-800 group-hover:text-brand-700">{t.title}</p>
                <p className="mt-1 text-sm text-slate-500">{t.description}</p>
              </button>
            ))}
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 py-6 text-center">
        <p className="text-xs text-slate-400">
          EduGenie — Powered by Google Gemini. Always verify important academic information.
        </p>
      </footer>
    </div>
  );
}

export default App;
