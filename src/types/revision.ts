import { Question } from "./question";

export interface QuestionAttempt {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: string;
}

export interface ScheduledQuestion {
  question: Question;
  dueDate: string;
  repetitionLevel: number; // 1 = immediate, 2 = 3 days, 3 = 7 days
  lapseCount: number;
  reason: string;
}