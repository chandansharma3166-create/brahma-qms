export type Subject = "BIOLOGY" | "PHYSICS" | "CHEMISTRY";
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
  topic?: string;
  difficulty: Difficulty;
  questionText: string;
  options: Option[];
  explanation: string;
  exam?: string;
  isPyq?: boolean;
  pyqYear?: string;
  diagram?: string;         // <-- Add this
  personalNotes?: string;   // <-- Add this
}