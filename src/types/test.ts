export interface TestQuestionState {
  questionId: string;
  selectedOptionId: string | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
}

export interface TestResultSummary {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number; // +4 for correct, -1 for incorrect
  accuracyPercentage: number;
}