import { Subject, Difficulty, QuestionType } from "./question";

export interface PersonalQuestion {
  id: string;
  subject: Subject;
  chapter: string;
  topic: string;
  questionText: string;
  questionType: QuestionType;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  difficulty: Difficulty;
  personalNotes?: string;
  imageUrl?: string;
  createdAt: string;
}