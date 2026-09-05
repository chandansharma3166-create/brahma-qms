import { Subject, Difficulty, QuestionType } from "./question";

export interface TestConfig {
  title: string;
  subjects: Subject[];
  chapters: string[];
  questionCount: number;
  durationMinutes: number;
  difficultyDistribution: Record<Difficulty, number>; // percentage split
  negativeMarking: boolean;
  questionTypes: QuestionType[];
}