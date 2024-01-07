/* eslint-disable @typescript-eslint/no-explicit-any */
type OptionType = {
  title: string;
};

export interface IQuestionType {
  key: string;
  title: string;
  type: "multiple_choice" | "text_answer";
  options: OptionType[] | any;
}

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
