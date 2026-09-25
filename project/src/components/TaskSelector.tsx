import { TASKS, TASK_ORDER } from '@/lib/tasks';
import type { TaskType } from '@/types';
import { TaskIcon } from './TaskIcon';

interface TaskSelectorProps {
  activeTask: TaskType;
  onSelect: (task: TaskType) => void;
}

export function TaskSelector({ activeTask, onSelect }: TaskSelectorProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {TASK_ORDER.map((taskId) => {
        const task = TASKS[taskId];
        const isActive = activeTask === taskId;
        return (
          <button
            key={taskId}
            onClick={() => onSelect(taskId)}
            className={`group inline-flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            <TaskIcon
              name={task.icon}
              className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-600'}`}
            />
            {task.label}
          </button>
        );
      })}
    </nav>
  );
}
