export type TaskType = 'explain' | 'qa' | 'quiz' | 'summarize' | 'path';

export interface TaskConfig {
  id: TaskType;
  label: string;
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  icon: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface LearningPathStep {
  level: string;
  topics: string[];
  duration: string;
  resources: string[];
}

export interface GeminiResponse {
  result: string;
  quiz?: QuizQuestion[];
  path?: LearningPathStep[];
}

export interface ApiError {
  error: string;
}
