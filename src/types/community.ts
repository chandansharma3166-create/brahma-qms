export interface Comment {
  id: string;
  author: string;
  avatarText: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

export interface SharedQuestionSet {
  id: string;
  title: string;
  creator: string;
  subject: "BIOLOGY" | "PHYSICS" | "CHEMISTRY" | "MIXED";
  questionCount: number;
  likes: number;
  description: string;
  isCuratedByFaculty?: boolean;
}