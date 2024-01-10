/* eslint-disable @typescript-eslint/no-explicit-any */
export type IOptionType = {
  optionName: string;
  isSelected: boolean;
};

export interface IQuestionType {
  key?: string;
  title: string;
  type?: "multiple_choice" | "text_answer";
  options: IOptionType[];
}
export type IQuestionAnswerType = {
  title: string;
  options: IOptionType[];
};

export interface IQuizSubmissionDetails {
  key: number;
  studentId: number;
  quizId: number;
  rightAnswer: number;
  wrongAnswer: number;
  totalScore: number;
  numberOfAttempts: number;
  answerList: [
    {
      question: string;
      answer: string;
    }
  ];
  previousAnswers: IQuizSubmissionDetails[];
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

export type IAnswerType = {
  studentId: number;
  answerAt: string | null;
  isSubmitted: boolean;
  answer: IQuestionAnswerType[];
  quizTitle: string;
  previousAnswers?: Omit<IAnswerType, "previousAnswers">[];
};
