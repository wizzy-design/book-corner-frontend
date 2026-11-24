import type { Book } from "./book";

export interface QuizOption {
  id: number;
  question_id: number;
  label: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  position: number;
  options: QuizOption[];
}

export interface QuizQuestionsApiResponse {
  data: QuizQuestion[];
}

export interface QuizAnswer {
  question_id: number;
  option_id: number;
}

export interface QuizRecommendPayload {
  answers: QuizAnswer[];
}

export interface QuizRecommendApiResponse {
  data: Book[];
}
