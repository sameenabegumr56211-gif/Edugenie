import type { TaskConfig, TaskType } from '@/types';

export const TASKS: Record<TaskType, TaskConfig> = {
  explain: {
    id: 'explain',
    label: 'Explain',
    title: 'Explain a Concept',
    description: 'Get a simple, beginner-friendly explanation of any topic.',
    placeholder: 'e.g. photosynthesis, blockchain, recursion...',
    buttonText: 'Explain',
    icon: 'lightbulb',
  },
  qa: {
    id: 'qa',
    label: 'Ask',
    title: 'Ask a Question',
    description: 'Ask any academic or general-knowledge question.',
    placeholder: 'e.g. What is the largest ocean? Why is the sky blue?',
    buttonText: 'Get Answer',
    icon: 'message-circle',
  },
  quiz: {
    id: 'quiz',
    label: 'Quiz',
    title: 'Generate a Quiz',
    description: 'Create multiple-choice questions from a topic or passage.',
    placeholder: 'Enter a topic or paste a passage to generate quiz questions...',
    buttonText: 'Generate Quiz',
    icon: 'list-checks',
  },
  summarize: {
    id: 'summarize',
    label: 'Summarize',
    title: 'Summarize Text',
    description: 'Condense long text into key revision-ready points.',
    placeholder: 'Paste a long passage or article to summarize...',
    buttonText: 'Summarize',
    icon: 'file-text',
  },
  path: {
    id: 'path',
    label: 'Learning Path',
    title: 'Build a Learning Path',
    description: 'Get a structured plan from beginner to advanced.',
    placeholder: 'e.g. SQL, machine learning, guitar, Spanish...',
    buttonText: 'Create Path',
    icon: 'route',
  },
};

export const TASK_ORDER: TaskType[] = ['explain', 'qa', 'quiz', 'summarize', 'path'];
