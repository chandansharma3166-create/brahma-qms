export type Subject = "PHYSICS" | "CHEMISTRY" | "BIOLOGY";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type QuestionType = 
  | "MCQ" 
  | "ASSERTION_REASON" 
  | "STATEMENT_BASED" 
  | "MATCH_THE_FOLLOWING";

export interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  subject: Subject;
  chapter: string;
  topic: string;
  subtopic?: string;
  questionText: string;
  questionType: QuestionType;
  options: Option[];
  explanation: string;
  difficulty: Difficulty;
  source?: string;
  year?: number;
  tags: string[];
}