export interface QuizDetails {
  quizTitle: string;
  quizDescription: string;
  type: "multiple_choice" | "text_answer";
  no_of_question: number;
  visibility: boolean;
}
