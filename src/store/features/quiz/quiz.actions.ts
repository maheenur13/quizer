import { IQuizSubmissionDetails, QuizDetails } from "@/interfaces";
import store from "@/store/store";
import {
  addQuizToList,
  addToAnswerList,
  closeQuizModal,
  handleQuestionModal,
  openQuizModal,
  quizVisibility,
  removeQuizFromList,
  setQuestionFormMode,
  setQuizFormMode,
  syncQuizFromDB,
  updateQuiz,
} from "./quiz.slice";

export const addQuizMToQuizList = (quiz: QuizDetails) => {
  store.dispatch(addQuizToList(quiz));
};
export const setUpdateQuiz = (quiz: QuizDetails) => {
  store.dispatch(updateQuiz(quiz));
};
export const removeMQuizFromQuizList = (key: QuizDetails["key"]) => {
  store.dispatch(removeQuizFromList(key));
};
export const openMQuizModal = () => {
  store.dispatch(openQuizModal());
};
export const closeMQuizModal = () => {
  store.dispatch(closeQuizModal());
};
export const setQuestionModal = (value: boolean) => {
  store.dispatch(handleQuestionModal(value));
};
export const changeQuizVisibility = (key: number, value: boolean) => {
  store.dispatch(quizVisibility({ key, value }));
};
export const changeQuizFormMode = (type: "create" | "edit") => {
  store.dispatch(setQuizFormMode(type));
};
export const changeQuestionFormMode = (type: "create" | "edit") => {
  store.dispatch(setQuestionFormMode(type));
};
export const syncAllQuizFromDB = () => {
  store.dispatch(syncQuizFromDB());
};
export const handleAddToAnswerList = (values: IQuizSubmissionDetails) => {
  store.dispatch(addToAnswerList(values));
};
