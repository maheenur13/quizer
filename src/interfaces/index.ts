export interface IQuestionType {
  key: string;
  title: string;
  type: "multiple_choice" | "text_answer";
  options: {
    title: string;
  }[];
}

export interface IQuizSubmissionDetails {
  key: number;
  studentId: number;
  quizId: number;
  rightAnswer: number;
  wrongAnswer: number;
  totalScore: number;
  numberOfAttempts: number;
}

export interface QuizDetails {
  key: number;
  quizTitle: string;
  quizDescription: string;
  type: "multiple_choice" | "text_answer";
  no_of_question: number;
  visibility: boolean;
  questions: IQuestionType[];
  totalSubmissions: number;
  totalAttempts: number;
  quizSubMissionDetails: IQuizSubmissionDetails[];
  createdAt: string;
  publishedAt: string | null;
  duration: number;
  quizCategory: string;
}
